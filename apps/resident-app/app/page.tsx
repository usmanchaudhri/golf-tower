'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { RESIDENTS } from '@/lib/data'
import { formatOmr } from '@/lib/format'
import { useSession } from '@/lib/session'

const LoginPage = () => {
    const router = useRouter()
    const { switchResident } = useSession()

    const enter = (id: string) => {
        switchResident(id)
        router.push('/home')
    }

    return (
        <div className='auth-stage'>
            <section className='auth-hero'>
                <div>
                    <div className='auth-kicker'>Resident app</div>
                    <h1>Your building, in your pocket.</h1>
                    <p>Pay the service charge, let a guest in, and see what management posted — without a visit to the office.</p>
                </div>
                <div className='auth-hero-foot'>
                    <span>Golf Tower · Muscat</span>
                    <span>Visa & Mastercard</span>
                    <span>Auto-pay</span>
                </div>
            </section>
            <section className='auth-panel'>
                <div className='brand-lockup'>
                    <div className='mark'>G</div>
                    <div>
                        <strong>Golf Tower</strong>
                        <span>Intelligence of the Era</span>
                    </div>
                </div>
                <h2>Login to your community</h2>
                <p className='lede'>Demo accounts for the pitch. Pick a resident — no password.</p>
                <div className='account-list'>
                    {RESIDENTS.map((person) => (
                        <button key={person.id} className='account-card' onClick={() => enter(person.id)}>
                            <div className='avatar'>{person.firstName.slice(0, 1)}</div>
                            <div>
                                <strong>{person.name}</strong>
                                <small>Unit {person.unit} · {person.role === 'owner' ? 'Owner' : 'Tenant'}</small>
                            </div>
                            {person.dues > 0
                                ? <span className='pill pill-due'>{formatOmr(person.dues)} due</span>
                                : <span className='pill pill-ok'>Auto-pay on</span>}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default LoginPage
