'use client'

import Link from 'next/link'
import React from 'react'

import { AppShell } from '@/components/AppShell'
import { useSession } from '@/lib/session'

const UnitPage = () => {
    const { resident } = useSession()

    return (
        <AppShell title='My unit'>
            <div className='stack'>
                <section className='card card-pad'>
                    <div className='eyebrow'>Golf Tower · Muscat</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, margin: '8px 0' }}>{resident.unit}</h2>
                    <p className='meta'>Floor {resident.floor} · {resident.role === 'owner' ? 'Owner-occupier' : 'Tenant'}</p>
                    <div className='list' style={{ marginTop: 12 }}>
                        <div className='row'><span>You</span><strong>{resident.name}</strong></div>
                        {resident.landlord && <div className='row'><span>Owner</span><strong>{resident.landlord}</strong></div>}
                        <div className='row'><span>Phone</span><strong>{resident.phone}</strong></div>
                        <div className='row'><span>Parking</span><strong>{resident.parking}</strong></div>
                        {resident.vehicle && <div className='row'><span>Vehicle</span><strong>{resident.vehicle}</strong></div>}
                    </div>
                </section>
                <Link href='/help' className='card card-pad'>Helpdesk</Link>
                <Link href='/notices' className='card card-pad'>Notices</Link>
                <Link href='/amenities' className='card card-pad'>Amenities</Link>
                <Link href='/' className='btn btn-line btn-block'>Sign out</Link>
            </div>
        </AppShell>
    )
}

export default UnitPage
