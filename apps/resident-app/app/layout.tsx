import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { SessionProvider } from '@/lib/session'

import './globals.css'

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
})

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap',
})

export const metadata = {
    title: 'Golf Tower · Resident',
    description: 'Pay, visit, and live at Golf Tower Muscat.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body className={`${jakarta.className} ${fraunces.variable} ${jakarta.variable}`}>
                <div className='app-root'>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </div>
            </body>
        </html>
    )
}

export default RootLayout
