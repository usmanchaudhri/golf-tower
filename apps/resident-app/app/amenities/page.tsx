'use client'

import React, { useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { AMENITIES } from '@/lib/data'

const AmenitiesPage = () => {
    const [booked, setBooked] = useState<string | null>(null)

    return (
        <AppShell title='Amenities'>
            <div className='stack'>
                {AMENITIES.map((place) => (
                    <section key={place.id} className='card card-pad'>
                        <div className='row' style={{ padding: 0, border: 0 }}>
                            <div>
                                <strong>{place.name}</strong>
                                <small>{place.hours} · {place.nextSlot}</small>
                            </div>
                            <button className='btn btn-line' onClick={() => setBooked(place.name)}>Book</button>
                        </div>
                    </section>
                ))}
                {booked && (
                    <p className='pill pill-ok' style={{ justifyContent: 'center' }}>Held {booked} for you. Desk will confirm.</p>
                )}
            </div>
        </AppShell>
    )
}

export default AmenitiesPage
