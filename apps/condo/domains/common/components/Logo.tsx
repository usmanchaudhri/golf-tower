import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import styles from './Logo.module.css'


interface ILogoProps {
    onClick?: (e: React.SyntheticEvent) => void
    minified?: boolean
}

export const Logo: React.FC<ILogoProps> = (props) => {
    const { onClick, minified } = props
    const intl = useIntl()
    const brandTitle = intl.formatMessage({ id: 'CompanyName.dashboard' })
    const brandSubtitle = intl.formatMessage({ id: 'CompanyName.dashboard.subtitle' })

    return (
        <span onClick={onClick} className={`logo ${styles.logo}`}>
            <span className={styles.mark} aria-hidden>G</span>
            {minified ? null : (
                <span className={styles.brand}>
                    <span className={styles.brandTitle}>{brandTitle}</span>
                    <span className={styles.brandSubtitle}>{brandSubtitle}</span>
                </span>
            )}
        </span>
    )
}
