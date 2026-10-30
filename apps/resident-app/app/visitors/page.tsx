'use client'

import React, { useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { VISITORS } from '@/lib/data'

import type { Visitor } from '@/lib/types'


const VisitorsPage = () => {
    const [rows, setRows] = useState<Array<Visitor>>(VISITORS)
    const [name, setName] = useState('')
    const [when, setWhen] = useState('')
    const [vehicle, setVehicle] = useState('')

    const invite = () => {
        if (!name.trim() || !when.trim()) return
        setRows((current) => [{
            id: `v-${Date.now()}`,
            name: name.trim(),
            when: when.trim(),
            type: 'guest',
            status: 'expected',
            vehicle: vehicle.trim() || undefined,
        }, ...current])
        setName('')
        setWhen('')
        setVehicle('')
    }

    return (
        <AppShell title='Visitors'>
            <div className='stack'>
                <section className='card card-pad stack'>
                    <div className='eyebrow'>Let someone in</div>
                    <div className='field'>
                        <label>Name</label>
                        <input value={name} onChange={(event) => setName(event.target.value)} placeholder='Guest or company' />
                    </div>
                    <div className='field'>
                        <label>When</label>
                        <input value={when} onChange={(event) => setWhen(event.target.value)} placeholder='Today · 18:00' />
                    </div>
                    <div className='field'>
                        <label>Vehicle (optional)</label>
                        <input value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder='Plate' />
                    </div>
                    <button className='btn btn-gold' onClick={invite}>Approve at the gate</button>
                </section>
                <section className='card card-pad'>
                    <div className='eyebrow'>Log</div>
                    <div className='list'>
                        {rows.map((row) => (
                            <div key={row.id} className='row'>
                                <div>
                                    <strong>{row.name}</strong>
                                    <small>{row.when}{row.vehicle ? ` · ${row.vehicle}` : ''}</small>
                                </div>
                                <span className={`pill ${row.status === 'expected' ? 'pill-gold' : 'pill-ok'}`}>
                                    {row.status === 'expected' ? 'Expected' : row.status === 'in' ? 'Inside' : 'Left'}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    )
}

export default VisitorsPage
