'use client'

import Link from 'next/link'
import React from 'react'

import { AppShell } from '@/components/AppShell'
import { CardIcon, ChatIcon, GateIcon, PoolIcon, WrenchIcon } from '@/components/Icons'
import { CONVERSATIONS, NOTICES } from '@/lib/data'
import { formatOmr } from '@/lib/format'
import { useSession } from '@/lib/session'

const HomePage = () => {
    const { resident } = useSession()
    const notice = NOTICES[0]
    const talk = CONVERSATIONS[0]

    return (
        <AppShell title={`Good evening, ${resident.firstName}`}>
            <div className='stack'>
                <section className='card card-pad hero-due'>
                    {resident.dues > 0 ? (
                        <>
                            <div className='eyebrow' style={{ color: 'var(--gold)' }}>Open on your account</div>
                            <h2>{formatOmr(resident.dues)}</h2>
                            <p>Two invoices from the last cycles. Pay with Visa or Mastercard in about a minute.</p>
                            <div className='hero-actions'>
                                <Link href='/pay' className='btn btn-gold'>Pay now</Link>
                                <Link href='/pay' className='btn btn-ghost'>Set up auto-pay</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='eyebrow' style={{ color: 'var(--gold)' }}>Account is clear</div>
                            <h2>Nothing due</h2>
                            <p>
                                {resident.autoPay
                                    ? `Auto-pay is on. Visa ···· ${resident.last4} will take the next cycle.`
                                    : 'You are up to date. Turn on auto-pay so the next cycle is quiet.'}
                            </p>
                            <div className='hero-actions'>
                                <Link href='/pay' className='btn btn-gold'>See receipts</Link>
                            </div>
                        </>
                    )}
                </section>

                <div className='shortcuts'>
                    <Link href='/pay' className='shortcut'><span className='icon-wrap'><CardIcon size={18} /></span>Pay</Link>
                    <Link href='/visitors' className='shortcut'><span className='icon-wrap'><GateIcon size={18} /></span>Guest</Link>
                    <Link href='/help' className='shortcut'><span className='icon-wrap'><WrenchIcon size={18} /></span>Help</Link>
                    <Link href='/amenities' className='shortcut'><span className='icon-wrap'><PoolIcon size={18} /></span>Book</Link>
                </div>

                <section className='card card-pad'>
                    <div className='eyebrow'>From management</div>
                    <div className='row'>
                        <div>
                            <strong>{notice.title}</strong>
                            <small>{notice.body}</small>
                        </div>
                        <Link href='/notices'>Open</Link>
                    </div>
                </section>

                <section className='card feed-card'>
                    <div className='eyebrow'>Community</div>
                    <h3>{talk.title}</h3>
                    <p>{talk.body}</p>
                    <div className='feed-bar'>
                        <span>{talk.author} · {talk.unit}</span>
                        <Link href='/community'><ChatIcon size={16} /> Join</Link>
                    </div>
                </section>
            </div>
        </AppShell>
    )
}

export default HomePage
