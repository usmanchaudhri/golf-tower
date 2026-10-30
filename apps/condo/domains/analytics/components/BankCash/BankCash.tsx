import React from 'react'

import { useIntl } from '@open-condo/next/intl'
import { Alert, Card, Space, Typography } from '@open-condo/ui'

import tabStyles from '@condo/domains/analytics/components/DashboardTabs/DashboardTabs.module.css'
import { GOLF_TOWER_STATS } from '@condo/domains/analytics/constants/golfTowerStats'

import homeStyles from '../HomeDashboard/HomeDashboard.module.css'


const formatOmr = (intl: ReturnType<typeof useIntl>, value: number) => {
    const formatted = intl.formatNumber(Math.abs(value), { maximumFractionDigits: 0 })
    const signed = value < 0 ? `(${formatted})` : formatted
    return intl.formatMessage({ id: 'pages.condo.dashboard.omr' }, { value: signed })
}

export const BankCash: React.FC = () => {
    const intl = useIntl()
    const omr = (value: number) => formatOmr(intl, value)

    const accounts = [
        {
            name: intl.formatMessage({ id: 'pages.condo.dashboard.balance.bankMuscat' }),
            year2024: GOLF_TOWER_STATS.bankMuscat2024,
            year2026: GOLF_TOWER_STATS.bankMuscat,
        },
        {
            name: intl.formatMessage({ id: 'pages.condo.dashboard.balance.nboCurrent' }),
            year2024: GOLF_TOWER_STATS.nboCurrent2024,
            year2026: GOLF_TOWER_STATS.nboCurrent,
            warn: true,
        },
        {
            name: intl.formatMessage({ id: 'pages.condo.dashboard.balance.nboFd' }),
            year2024: GOLF_TOWER_STATS.nboFd2024,
            year2026: GOLF_TOWER_STATS.nboFd,
        },
    ]

    return (
        <Space direction='vertical' size={24} width='100%'>
            <Typography.Text type='secondary'>
                {intl.formatMessage({ id: 'pages.condo.dashboard.bank.intro' })}
            </Typography.Text>

            <div className={homeStyles.kpiGrid}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.bankMuscat)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.balance.bankMuscat' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20} className={homeStyles.kpiWarn}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.nboCurrent)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.balance.nboCurrent' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.nboFd)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.balance.nboFd' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.cashOutsideFd)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.cash' })}</Typography.Text>
                    </Space>
                </Card>
            </div>

            <Alert
                type='warning'
                showIcon
                message={intl.formatMessage({ id: 'pages.condo.dashboard.attention.overdraft' }, {
                    amount: omr(Math.abs(GOLF_TOWER_STATS.nboCurrent)),
                })}
            />

            <Card bodyPadding={20}>
                <Space direction='vertical' size={16} width='100%'>
                    <Typography.Title level={2}>
                        {intl.formatMessage({ id: 'pages.condo.dashboard.bank.accountsTitle' })}
                    </Typography.Title>
                    <div className={tabStyles.tableWrap}>
                        <table className={tabStyles.table}>
                            <thead>
                                <tr>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.bank.col.account' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.balance.col2024' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.balance.col2026' })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr key={account.name}>
                                        <td>{account.name}</td>
                                        <td>{omr(account.year2024)}</td>
                                        <td className={account.warn ? tabStyles.warn : undefined}>{omr(account.year2026)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>{intl.formatMessage({ id: 'pages.condo.dashboard.bank.payables' })}</td>
                                    <td>{omr(GOLF_TOWER_STATS.payables2024)}</td>
                                    <td>{omr(GOLF_TOWER_STATS.payables)}</td>
                                </tr>
                                <tr>
                                    <td>{intl.formatMessage({ id: 'pages.condo.dashboard.balance.sinking' })}</td>
                                    <td>{omr(GOLF_TOWER_STATS.sinking2024)}</td>
                                    <td>{omr(GOLF_TOWER_STATS.sinking)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Typography.Text type='secondary'>
                        {intl.formatMessage({ id: 'pages.condo.dashboard.bank.note' })}
                    </Typography.Text>
                </Space>
            </Card>
        </Space>
    )
}
