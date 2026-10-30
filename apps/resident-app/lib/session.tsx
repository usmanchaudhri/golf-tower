'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { RESIDENTS } from './data'

import type { CardBrand, Invoice, Receipt, ResidentProfile } from './types'


const STORAGE_KEY = 'era-resident-session'

type SessionValue = {
    resident: ResidentProfile
    ready: boolean
    switchResident: (id: string) => void
    payInvoices: (invoiceIds: Array<string>, brand: CardBrand, last4: string, auto: boolean) => Receipt
    setAutoPay: (enabled: boolean) => void
    saveCard: (brand: CardBrand, last4: string) => void
}

const SessionContext = createContext<SessionValue | null>(null)

const cloneResident = (id: string): ResidentProfile => {
    const found = RESIDENTS.find((row) => row.id === id) || RESIDENTS[0]
    return {
        ...found,
        invoices: found.invoices.map((row) => ({ ...row })),
        receipts: found.receipts.map((row) => ({ ...row })),
    }
}

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resident, setResident] = useState<ResidentProfile>(() => cloneResident('priya'))
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored && RESIDENTS.some((row) => row.id === stored)) {
            setResident(cloneResident(stored))
        }
        setReady(true)
    }, [])

    const switchResident = (id: string) => {
        window.localStorage.setItem(STORAGE_KEY, id)
        setResident(cloneResident(id))
    }

    const payInvoices = (invoiceIds: Array<string>, brand: CardBrand, last4: string, auto: boolean) => {
        const selected = resident.invoices.filter((row) => invoiceIds.includes(row.id) && row.status === 'due')
        const amount = selected.reduce((sum, row) => sum + row.amount, 0)
        const receipt: Receipt = {
            id: `r-${Date.now()}`,
            date: new Date().toISOString().slice(0, 10),
            amount,
            method: auto ? `${brand === 'visa' ? 'Visa' : 'Mastercard'} · Auto` : (brand === 'visa' ? 'Visa' : 'Mastercard'),
            brand,
            last4,
            auto,
        }
        setResident((current) => {
            const invoices: Array<Invoice> = current.invoices.map((row) => (
                invoiceIds.includes(row.id) ? { ...row, status: 'paid' } : row
            ))
            const remaining = invoices.filter((row) => row.status === 'due').reduce((sum, row) => sum + row.amount, 0)
            return {
                ...current,
                invoices,
                receipts: [receipt, ...current.receipts],
                dues: remaining,
                autoPay: auto || current.autoPay,
                brand,
                last4,
            }
        })
        return receipt
    }

    const setAutoPay = (enabled: boolean) => {
        setResident((current) => ({ ...current, autoPay: enabled }))
    }

    const saveCard = (brand: CardBrand, last4: string) => {
        setResident((current) => ({ ...current, brand, last4 }))
    }

    const value = useMemo(() => ({
        resident,
        ready,
        switchResident,
        payInvoices,
        setAutoPay,
        saveCard,
    }), [ready, resident])

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    const value = useContext(SessionContext)
    if (!value) throw new Error('useSession must be used within SessionProvider')
    return value
}
