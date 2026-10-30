import React from 'react'

import { useIntl } from '@open-condo/next/intl'
import { Alert, Card, Space, Typography } from '@open-condo/ui'
import { colors } from '@open-condo/ui/colors'

import tabStyles from '@condo/domains/analytics/components/DashboardTabs/DashboardTabs.module.css'
import { GOLF_TOWER_STATS } from '@condo/domains/analytics/constants/golfTowerStats'

import homeStyles from '../HomeDashboard/HomeDashboard.module.css'


const OPEX_LABEL_IDS = {
    electricity: 'pages.condo.dashboard.opex.electricity',
    repairs: 'pages.condo.dashboard.opex.repairs',
    fm: 'pages.condo.dashboard.opex.fm',
    cleaning: 'pages.condo.dashboard.opex.cleaning',
    security: 'pages.condo.dashboard.opex.security',
    office: 'pages.condo.dashboard.opex.office',
} as const

const formatOmr = (intl: ReturnType<typeof useIntl>, value: number) => {
    const formatted = intl.formatNumber(Math.abs(value), { maximumFractionDigits: 0 })
    const signed = value < 0 ? `(${formatted})` : formatted
    return intl.formatMessage({ id: 'pages.condo.dashboard.omr' }, { value: signed })
}

export const AccountsBoard: React.FC = () => {
    const intl = useIntl()
    const omr = (value: number) => formatOmr(intl, value)

    return (
        <Space direction='vertical' size={24} width='100%'>
            <Typography.Text type='secondary'>
                {intl.formatMessage({ id: 'pages.condo.dashboard.accounts.intro' })}
            </Typography.Text>

            <div className={homeStyles.kpiGrid}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.income)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.income' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.opex)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.opex.title' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.surplus)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.surplus' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20} className={homeStyles.kpiWarn}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{omr(GOLF_TOWER_STATS.netDue)}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.arrears' })}</Typography.Text>
                    </Space>
                </Card>
            </div>

            <Alert
                type='warning'
                showIcon
                message={intl.formatMessage({ id: 'pages.condo.dashboard.collections.subtitle' }, {
                    count: intl.formatNumber(GOLF_TOWER_STATS.defaulters),
                    amount: omr(GOLF_TOWER_STATS.netDue),
                    each: omr(GOLF_TOWER_STATS.avgDue),
                })}
            />

            <div className={homeStyles.split}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <Typography.Title level={2}>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.accounts.ledgerTitle' })}
                        </Typography.Title>
                        <div className={tabStyles.tableWrap}>
                            <table className={tabStyles.table}>
                                <thead>
                                    <tr>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.accounts.col.line' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.accounts.col.amount' })}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.income' })}</td>
                                        <td>{omr(GOLF_TOWER_STATS.income)}</td>
                                    </tr>
                                    {GOLF_TOWER_STATS.opexItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{intl.formatMessage({ id: OPEX_LABEL_IDS[item.id] })}</td>
                                            <td>{omr(item.amount)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.surplus' })}</td>
                                        <td>{omr(GOLF_TOWER_STATS.surplus)}</td>
                                    </tr>
                                    <tr>
                                        <td>{intl.formatMessage({ id: 'pages.condo.dashboard.accounts.software' })}</td>
                                        <td>{omr(GOLF_TOWER_STATS.software)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.opex.softwareNote' })}
                        </Typography.Text>
                    </Space>
                </Card>

                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <Typography.Title level={2}>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.accounts.receivablesTitle' })}
                        </Typography.Title>
                        <div className={tabStyles.detailList}>
                            <div className={tabStyles.detailRow}>
                                <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.receivables' })}</Typography.Text>
                                <Typography.Text>{omr(GOLF_TOWER_STATS.receivables)}</Typography.Text>
                            </div>
                            <div className={tabStyles.detailRow}>
                                <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.accounts.due' })}</Typography.Text>
                                <Typography.Text>{omr(GOLF_TOWER_STATS.due)}</Typography.Text>
                            </div>
                            <div className={tabStyles.detailRow}>
                                <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.accounts.excess' })}</Typography.Text>
                                <Typography.Text>{omr(GOLF_TOWER_STATS.excess)}</Typography.Text>
                            </div>
                            <div className={tabStyles.detailRow}>
                                <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.arrears' })}</Typography.Text>
                                <Typography.Text>{omr(GOLF_TOWER_STATS.netDue)}</Typography.Text>
                            </div>
                            <div className={tabStyles.detailRow}>
                                <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.kpi.defaulters' })}</Typography.Text>
                                <Typography.Text>{intl.formatNumber(GOLF_TOWER_STATS.defaulters)}</Typography.Text>
                            </div>
                        </div>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.attention.receivables' }, {
                                delta: omr(GOLF_TOWER_STATS.receivablesDelta),
                                from: omr(GOLF_TOWER_STATS.receivables2024),
                                to: omr(GOLF_TOWER_STATS.receivables),
                            })}
                        </Typography.Text>
                    </Space>
                </Card>
            </div>

            <Card bodyPadding={20}>
                <Space direction='vertical' size={16} width='100%'>
                    <Typography.Title level={2}>
                        {intl.formatMessage({ id: 'pages.condo.dashboard.opex.title' })}
                    </Typography.Title>
                    <div className={homeStyles.opexList}>
                        {GOLF_TOWER_STATS.opexItems.map((item) => (
                            <div key={item.id} className={homeStyles.opexRow}>
                                <Typography.Text>{intl.formatMessage({ id: OPEX_LABEL_IDS[item.id] })}</Typography.Text>
                                <div className={homeStyles.opexTrack}>
                                    <div
                                        className={homeStyles.opexFill}
                                        style={{
                                            width: `${(item.amount / GOLF_TOWER_STATS.opex) * 100}%`,
                                            backgroundColor: colors.teal[5],
                                        }}
                                    />
                                </div>
                                <span className={homeStyles.opexAmount}>
                                    <Typography.Text>{omr(item.amount)}</Typography.Text>
                                </span>
                            </div>
                        ))}
                    </div>
                </Space>
            </Card>
        </Space>
    )
}
