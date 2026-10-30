'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useMemo, useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { CheckIcon } from '@/components/Icons'
import { formatOmr } from '@/lib/format'
import { useSession } from '@/lib/session'

import type { CardBrand, Receipt } from '@/lib/types'


const CheckoutInner = () => {
    const router = useRouter()
    const params = useSearchParams()
    const { resident, payInvoices } = useSession()
    const ids = (params.get('ids') || '').split(',').filter(Boolean)
    const selected = resident.invoices.filter((row) => ids.includes(row.id) && row.status === 'due')
    const total = selected.reduce((sum, row) => sum + row.amount, 0)

    const [method, setMethod] = useState<'saved' | 'visa' | 'mastercard' | 'apple'>('saved')
    const [auto, setAuto] = useState(resident.autoPay)
    const [pan, setPan] = useState('')
    const [name, setName] = useState(resident.name)
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [receipt, setReceipt] = useState<Receipt | null>(null)

    const brand: CardBrand = method === 'mastercard' || (method === 'saved' && resident.brand === 'mastercard')
        ? 'mastercard'
        : 'visa'

    const last4 = useMemo(() => {
        if (method === 'saved') return resident.last4 || '0000'
        const digits = pan.replace(/\D/g, '')
        return digits.slice(-4).padStart(4, '0')
    }, [method, pan, resident.last4])

    const canPay = total > 0 && (
        method === 'saved' ||
        method === 'apple' ||
        (pan.replace(/\D/g, '').length >= 16 && expiry.length >= 4 && cvc.length >= 3)
    )

    const confirm = () => {
        if (!canPay) return
        const paid = payInvoices(ids, brand, last4, auto)
        setReceipt(paid)
    }

    if (receipt) {
        return (
            <AppShell title='Receipt'>
                <section className='card card-pad success'>
                    <div className='seal'><CheckIcon size={32} /></div>
                    <div className='eyebrow'>Golf Tower · Muscat</div>
                    <h2>{formatOmr(receipt.amount)}</h2>
                    <p className='meta' style={{ margin: '8px 0 20px' }}>
                        Paid with {receipt.method} ···· {receipt.last4}. A copy is on your statement.
                    </p>
                    {auto && (
                        <p className='pill pill-gold' style={{ marginBottom: 20 }}>Auto-pay is on for the next cycle</p>
                    )}
                    <div className='stack'>
                        <Link href='/pay' className='btn btn-gold btn-block'>Back to Pay</Link>
                        <Link href='/home' className='btn btn-line btn-block'>Home</Link>
                    </div>
                </section>
            </AppShell>
        )
    }

    if (selected.length === 0) {
        return (
            <AppShell title='Pay'>
                <section className='card card-pad empty'>
                    <p>Nothing selected. Pick invoices first.</p>
                    <Link href='/pay' className='btn btn-teal' style={{ marginTop: 16 }}>Go to Pay</Link>
                </section>
            </AppShell>
        )
    }

    return (
        <AppShell title='Card'>
            <div className='stack'>
                <button className='btn btn-line' onClick={() => router.back()} style={{ alignSelf: 'start' }}>Back</button>

                <div className={`card-visual ${brand}`}>
                    <div className='brand'>{brand === 'mastercard' ? 'MASTERCARD' : 'VISA'}</div>
                    <div className='pan'>···· ···· ···· {last4}</div>
                    <div className='holder'>
                        <span>{name}</span>
                        <span>{auto ? 'Auto-pay' : 'One-off'}</span>
                    </div>
                </div>

                <section className='card card-pad'>
                    <div className='eyebrow'>How to pay {formatOmr(total)}</div>
                    <div className='methods' style={{ marginTop: 12 }}>
                        {resident.last4 && (
                            <button className={`method ${method === 'saved' ? 'active' : ''}`} onClick={() => setMethod('saved')}>
                                <strong>{resident.brand === 'mastercard' ? 'Mastercard' : 'Visa'} ···· {resident.last4}</strong>
                            </button>
                        )}
                        <button className={`method ${method === 'apple' ? 'active' : ''}`} onClick={() => setMethod('apple')}>
                            <strong>Apple Pay</strong>
                        </button>
                        <button className={`method ${method === 'visa' ? 'active' : ''}`} onClick={() => setMethod('visa')}>
                            <strong>New Visa</strong>
                        </button>
                        <button className={`method ${method === 'mastercard' ? 'active' : ''}`} onClick={() => setMethod('mastercard')}>
                            <strong>New Mastercard</strong>
                        </button>
                    </div>
                </section>

                {(method === 'visa' || method === 'mastercard') && (
                    <section className='card card-pad stack'>
                        <div className='field'>
                            <label>Name on card</label>
                            <input value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className='field'>
                            <label>Card number</label>
                            <input
                                inputMode='numeric'
                                placeholder='ACCT-000003'
                                value={pan}
                                onChange={(event) => setPan(event.target.value)}
                            />
                        </div>
                        <div className='grid-2' style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className='field'>
                                <label>Expiry</label>
                                <input placeholder='MM / YY' value={expiry} onChange={(event) => setExpiry(event.target.value)} />
                            </div>
                            <div className='field'>
                                <label>CVC</label>
                                <input inputMode='numeric' placeholder='123' value={cvc} onChange={(event) => setCvc(event.target.value)} />
                            </div>
                        </div>
                    </section>
                )}

                <section className='card card-pad'>
                    <div className='toggle'>
                        <div>
                            <strong>Charge this card every cycle</strong>
                            <small className='meta'>About OMR 387, twice a year after this bill. You can stop it any time.</small>
                        </div>
                        <button className={`switch ${auto ? 'on' : ''}`} aria-label='Auto-pay' onClick={() => setAuto(!auto)} />
                    </div>
                </section>

                <div className='pay-summary'>
                    <div className='line'>
                        <span>{selected.length} invoice{selected.length === 1 ? '' : 's'}</span>
                        <strong className='amount'>{formatOmr(total)}</strong>
                    </div>
                    <button className='btn btn-gold btn-block' disabled={!canPay} onClick={confirm}>
                        Pay {formatOmr(total)}
                    </button>
                </div>
            </div>
        </AppShell>
    )
}

const CheckoutPage = () => (
    <Suspense fallback={null}>
        <CheckoutInner />
    </Suspense>
)

export default CheckoutPage
