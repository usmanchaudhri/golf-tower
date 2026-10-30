import React from 'react'

type IconProps = { size?: number }

const Svg: React.FC<IconProps & { children: React.ReactNode }> = ({ size = 20, children }) => (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
        {children}
    </svg>
)

export const HomeIcon = (props: IconProps) => (
    <Svg {...props}><path d='M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z' /></Svg>
)

export const ChatIcon = (props: IconProps) => (
    <Svg {...props}><path d='M5 6h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z' /></Svg>
)

export const CardIcon = (props: IconProps) => (
    <Svg {...props}><rect x='3' y='6' width='18' height='13' rx='2' /><path d='M3 10h18M7 15h4' /></Svg>
)

export const GateIcon = (props: IconProps) => (
    <Svg {...props}><path d='M4 20V7l8-3 8 3v13' /><path d='M10 20v-6h4v6M4 11h16' /></Svg>
)

export const MoreIcon = (props: IconProps) => (
    <Svg {...props}><circle cx='6' cy='12' r='1.2' fill='currentColor' stroke='none' /><circle cx='12' cy='12' r='1.2' fill='currentColor' stroke='none' /><circle cx='18' cy='12' r='1.2' fill='currentColor' stroke='none' /></Svg>
)

export const BellIcon = (props: IconProps) => (
    <Svg {...props}><path d='M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9' /><path d='M10 20a2 2 0 0 0 4 0' /></Svg>
)

export const WrenchIcon = (props: IconProps) => (
    <Svg {...props}><path d='M14 7a4 4 0 0 0 5 5l-8 8-5-5 8-8z' /><path d='M9 15l-4 4' /></Svg>
)

export const PoolIcon = (props: IconProps) => (
    <Svg {...props}><path d='M4 18c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0' /><path d='M6 10h12M8 6h8' /></Svg>
)

export const UserIcon = (props: IconProps) => (
    <Svg {...props}><circle cx='12' cy='8' r='3.2' /><path d='M5 19c1.4-3 4-4.5 7-4.5S17.6 16 19 19' /></Svg>
)

export const CheckIcon = (props: IconProps) => (
    <Svg {...props}><path d='M5 12.5 9.5 17 19 7.5' /></Svg>
)

export const ChevronIcon = (props: IconProps) => (
    <Svg {...props}><path d='M9 6l6 6-6 6' /></Svg>
)
