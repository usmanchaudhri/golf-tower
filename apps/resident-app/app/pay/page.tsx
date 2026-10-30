'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { formatDate, formatOmr } from '@/lib/format'
import { useSession } from '@/lib/session'

const PayPage = () => {
    const { resident, setAutoPay } = useSession()
    const due = resident.invoices.filter((row) => row.status === 'due')
    const [picked, setPicked] = useState<Array<string>>(due.map((row) => row.id))

    const total = useMemo(
        () => due.filter((row) => picked.includes(row.id)).reduce((sum, row) => sum + row.amount, 0),
        [due, picked],
    )

    const toggle = (id: string) => {
        setPicked((current) => (
            current.includes(id) ? current.filter((row) => row !== id) : [...current, id]
        ))
    }

    return (
        <AppShell title='Pay'>
            <div className='stack'>
                <section className='card card-pad hero-due'>
                    <div className='eyebrow' style={{ color: 'var(--gold)' }}>
                        {resident.dues > 0 ? 'To pay' : 'Settled'}
                    </div>
                    <h2>{formatOmr(resident.dues)}</h2>
                    <p>
                        {resident.dues > 0
                            ? 'Visa and Mastercard. Instant receipt. Auto-pay if you want the next cycle to take care of itself.'
                            : resident.autoPay
                                ? `Auto-pay is on with ${resident.brand === 'mastercard' ? 'Mastercard' : 'Visa'} ···· ${resident.last4}.`
                                : 'Nothing waiting. Keep a card on file for the next bill.'}
                    </p>
                </section>

                {due.length > 0 && (
                    <section className='card card-pad'>
                        <div className='eyebrow'>Open invoices</div>
                        <div className='list'>
                            {due.map((invoice) => (
                                <label key={invoice.id} className='check'>
                                    <input
                                        type='checkbox'
                                        checked={picked.includes(invoice.id)}
                                        onChange={() => toggle(invoice.id)}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <strong>{invoice.title} · {invoice.period}</strong>
                                        <small>Due {formatDate(invoice.dueDate)}</small>
                                    </div>
                                    <span className='amount warn'>{formatOmr(invoice.amount)}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                )}

                <section className='card card-pad'>
                    <div className='toggle'>
                        <div>
                            <strong>Auto-pay</strong>
                            <small className='meta'>
                                {resident.autoPay
                                    ? `On · ${resident.brand === 'mastercard' ? 'Mastercard' : 'Visa'} ···· ${resident.last4}`
                                    : 'Off · we will not charge a card until you turn this on'}
                            </small>
                        </div>
                        <button
                            className={`switch ${resident.autoPay ? 'on' : ''}`}
                            aria-label='Toggle auto-pay'
                            onClick={() => setAutoPay(!resident.autoPay)}
                        />
                    </div>
                </section>

                <section className='card card-pad'>
                    <div className='eyebrow'>Statement</div>
                    <div className='list'>
                        {resident.receipts.map((receipt) => (
                            <div key={receipt.id} className='row'>
                                <div>
                                    <strong>{formatOmr(receipt.amount)}</strong>
                                    <small>{formatDate(receipt.date)} · {receipt.method}{receipt.last4 ? ` ···· ${receipt.last4}` : ''}</small>
                                </div>
                                <span className='pill pill-ok'>Paid</span>
                            </div>
                        ))}
                    </div>
                </section>

                {resident.dues > 0 && total > 0 && (
                    <div className='pay-summary'>
                        <div className='line'>
                            <span>Selected</span>
                            <strong className='amount'>{formatOmr(total)}</strong>
                        </div>
                        <Link
                            href={`/pay/checkout?ids=${picked.join(',')}`}
                            className='btn btn-gold btn-block'
                        >
                            Continue to card
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    )
}

export default PayPage
