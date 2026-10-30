'use client'

import React, { useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { TICKETS } from '@/lib/data'

import type { Ticket } from '@/lib/types'


const HelpPage = () => {
    const [tickets, setTickets] = useState<Array<Ticket>>(TICKETS)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Plumbing')

    const raise = () => {
        if (!title.trim()) return
        setTickets((current) => [{
            id: `t-${Date.now()}`,
            title: title.trim(),
            category,
            status: 'open',
            updated: 'Just now',
        }, ...current])
        setTitle('')
    }

    const statusClass = (status: Ticket['status']) => {
        if (status === 'resolved') return 'pill-ok'
        if (status === 'inProgress') return 'pill-gold'
        return 'pill-due'
    }

    const statusLabel = (status: Ticket['status']) => {
        if (status === 'resolved') return 'Resolved'
        if (status === 'inProgress') return 'In progress'
        return 'Open'
    }

    return (
        <AppShell title='Helpdesk'>
            <div className='stack'>
                <section className='card card-pad stack'>
                    <div className='eyebrow'>New request</div>
                    <div className='field'>
                        <label>What is wrong?</label>
                        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Drip, light, access…' />
                    </div>
                    <div className='field'>
                        <label>Category</label>
                        <select value={category} onChange={(event) => setCategory(event.target.value)}>
                            <option>Plumbing</option>
                            <option>Electrical</option>
                            <option>AC</option>
                            <option>Access</option>
                            <option>Cleaning</option>
                        </select>
                    </div>
                    <button className='btn btn-teal' onClick={raise}>Send to management</button>
                </section>
                <section className='card card-pad'>
                    <div className='eyebrow'>Your tickets</div>
                    <div className='list'>
                        {tickets.map((ticket) => (
                            <div key={ticket.id} className='row'>
                                <div>
                                    <strong>{ticket.title}</strong>
                                    <small>{ticket.category} · {ticket.updated}</small>
                                </div>
                                <span className={`pill ${statusClass(ticket.status)}`}>{statusLabel(ticket.status)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    )
}

export default HelpPage
