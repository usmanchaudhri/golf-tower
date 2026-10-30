'use client'

import React, { useMemo, useState } from 'react'

import { AppShell } from '@/components/AppShell'
import { CONVERSATIONS } from '@/lib/data'
import { useSession } from '@/lib/session'

import type { Conversation } from '@/lib/types'


const CommunityPage = () => {
    const { resident } = useSession()
    const [channel, setChannel] = useState<'all' | 'neighbours' | 'management'>('all')
    const [draft, setDraft] = useState('')
    const [posts, setPosts] = useState<Array<Conversation>>(CONVERSATIONS)

    const visible = useMemo(
        () => posts.filter((row) => channel === 'all' || row.channel === channel),
        [channel, posts],
    )

    const publish = () => {
        const body = draft.trim()
        if (!body) return
        setPosts((current) => [{
            id: `local-${Date.now()}`,
            author: resident.name,
            unit: resident.unit,
            time: 'Just now',
            title: body.slice(0, 48),
            body,
            channel: 'neighbours',
            replies: 0,
            likes: 0,
        }, ...current])
        setDraft('')
    }

    return (
        <AppShell title='Community'>
            <div className='stack'>
                <div className='tabs'>
                    {(['all', 'neighbours', 'management'] as const).map((id) => (
                        <button key={id} className={channel === id ? 'active' : ''} onClick={() => setChannel(id)}>
                            {id === 'all' ? 'All' : id === 'neighbours' ? 'Neighbours' : 'Management'}
                        </button>
                    ))}
                </div>
                <div className='composer'>
                    <input
                        placeholder='Write to Golf Tower…'
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && publish()}
                    />
                    <button className='btn btn-teal' onClick={publish}>Post</button>
                </div>
                {visible.map((post) => (
                    <article key={post.id} className='card feed-card'>
                        <div className='eyebrow'>{post.author} · {post.unit} · {post.time}</div>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <div className='feed-bar'>
                            <span>{post.likes} likes</span>
                            <span>{post.replies} replies</span>
                            <span className='pill pill-teal'>{post.channel === 'management' ? 'Official' : 'Residents'}</span>
                        </div>
                    </article>
                ))}
            </div>
        </AppShell>
    )
}

export default CommunityPage
