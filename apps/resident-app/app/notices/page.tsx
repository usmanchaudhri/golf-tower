'use client'

import React from 'react'

import { AppShell } from '@/components/AppShell'
import { NOTICES } from '@/lib/data'
import { formatDate } from '@/lib/format'

const NoticesPage = () => {
    return (
        <AppShell title='Notices'>
            <div className='stack'>
                {NOTICES.map((notice) => (
                    <article key={notice.id} className='card feed-card'>
                        <div className='eyebrow'>{formatDate(notice.date)}</div>
                        <h3>{notice.title}</h3>
                        <p>{notice.body}</p>
                        <div className='feed-bar'>
                            <span className={`pill ${notice.tone === 'alert' ? 'pill-due' : notice.tone === 'event' ? 'pill-gold' : 'pill-teal'}`}>
                                {notice.tone === 'alert' ? 'Action' : notice.tone === 'event' ? 'Event' : 'Info'}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </AppShell>
    )
}

export default NoticesPage
