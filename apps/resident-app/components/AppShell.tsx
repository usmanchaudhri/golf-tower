'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { BellIcon, CardIcon, ChatIcon, GateIcon, HomeIcon, MoreIcon, UserIcon } from './Icons'
import { useSession } from '@/lib/session'

const LINKS = [
    { href: '/home', label: 'Home', icon: HomeIcon },
    { href: '/community', label: 'Community', icon: ChatIcon },
    { href: '/pay', label: 'Pay', icon: CardIcon, pay: true },
    { href: '/visitors', label: 'Visitors', icon: GateIcon },
    { href: '/unit', label: 'My unit', icon: UserIcon },
]

export const AppShell: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const pathname = usePathname()
    const { resident } = useSession()
    const moreActive = ['/help', '/notices', '/amenities', '/unit'].some((path) => pathname.startsWith(path))

    return (
        <div className='shell'>
            <aside className='side-nav'>
                <div className='brand-lockup' style={{ color: '#f6efe4', marginBottom: 18 }}>
                    <div className='mark'>G</div>
                    <div>
                        <strong>Golf Tower</strong>
                        <span style={{ color: 'rgb(246 239 228 / 65%)' }}>Muscat · {resident.unit}</span>
                    </div>
                </div>
                {LINKS.map((link) => {
                    const Icon = link.icon
                    const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                        <Link key={link.href} href={link.href} className={`${active ? 'active' : ''} ${link.pay ? 'pay-link' : ''}`}>
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    )
                })}
                <Link href='/notices' className={pathname.startsWith('/notices') ? 'active' : ''}>Notices</Link>
                <Link href='/help' className={pathname.startsWith('/help') ? 'active' : ''}>Helpdesk</Link>
                <Link href='/amenities' className={pathname.startsWith('/amenities') ? 'active' : ''}>Amenities</Link>
                <div className='side-spacer' />
                <Link href='/'>{resident.name.split(' ')[0]} · Sign out</Link>
            </aside>
            <div className='main'>
                <header className='topbar'>
                    <div>
                        <div className='eyebrow'>{resident.building} · Unit {resident.unit}</div>
                        <h1>{title}</h1>
                    </div>
                    <Link href='/notices' aria-label='Notices' className='icon-wrap'>
                        <BellIcon />
                    </Link>
                </header>
                {children}
            </div>
            <nav className='bottom-nav'>
                {LINKS.slice(0, 4).map((link) => {
                    const Icon = link.icon
                    const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                    return (
                        <Link key={link.href} href={link.href} className={`${active ? 'active' : ''} ${link.pay ? 'pay-link' : ''}`}>
                            <Icon size={20} />
                            {link.label}
                        </Link>
                    )
                })}
                <Link href='/unit' className={moreActive ? 'active' : ''}>
                    <MoreIcon size={20} />
                    More
                </Link>
            </nav>
        </div>
    )
}
