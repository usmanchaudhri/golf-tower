import React, { useMemo, useState } from 'react'

import { useIntl } from '@open-condo/next/intl'
import { Alert, Card, Input, Radio, RadioGroup, Space, Typography } from '@open-condo/ui'

import tabStyles from '@condo/domains/analytics/components/DashboardTabs/DashboardTabs.module.css'
import {
    GOLF_TOWER_AUTO_PAY,
    GOLF_TOWER_CARD_PAYMENTS,
} from '@condo/domains/analytics/constants/golfTowerPayments'

import homeStyles from '../HomeDashboard/HomeDashboard.module.css'

import type { PaymentStatus } from '@condo/domains/analytics/constants/golfTowerPayments'


const STATUS_LABEL = {
    paid: 'pages.condo.dashboard.payments.status.paid',
    pending: 'pages.condo.dashboard.payments.status.pending',
    failed: 'pages.condo.dashboard.payments.status.failed',
} as const

const STATUS_PILL = {
    paid: `${tabStyles.pill} ${tabStyles.pillPaid}`,
    pending: `${tabStyles.pill} ${tabStyles.pillPending}`,
    failed: `${tabStyles.pill} ${tabStyles.pillFailed}`,
} as const

const BRAND_LABEL = {
    visa: 'pages.condo.dashboard.payments.brand.visa',
    mastercard: 'pages.condo.dashboard.payments.brand.mastercard',
} as const

const OCCUPANCY_LABEL = {
    owner: 'pages.condo.dashboard.units.occupancy.owner',
    tenant: 'pages.condo.dashboard.units.occupancy.tenant',
    vacant: 'pages.condo.dashboard.units.occupancy.vacant',
} as const

const formatOmr = (intl: ReturnType<typeof useIntl>, value: number) => {
    const formatted = intl.formatNumber(Math.abs(value), { maximumFractionDigits: 0 })
    return intl.formatMessage({ id: 'pages.condo.dashboard.omr' }, { value: formatted })
}

export const PaymentsBoard: React.FC = () => {
    const intl = useIntl()
    const [paymentStatus, setPaymentStatus] = useState<'all' | PaymentStatus>('all')
    const [paymentQuery, setPaymentQuery] = useState('')
    const [autoFilter, setAutoFilter] = useState<'all' | 'on' | 'off'>('all')
    const [autoQuery, setAutoQuery] = useState('')

    const paymentCounts = useMemo(() => {
        const paid = GOLF_TOWER_CARD_PAYMENTS.filter((row) => row.status === 'paid')
        const pending = GOLF_TOWER_CARD_PAYMENTS.filter((row) => row.status === 'pending')
        const failed = GOLF_TOWER_CARD_PAYMENTS.filter((row) => row.status === 'failed')
        const collected = paid.reduce((sum, row) => sum + row.amount, 0)
        return {
            collected,
            paid: paid.length,
            pending: pending.length,
            failed: failed.length,
        }
    }, [])

    const autoCounts = useMemo(() => {
        const on = GOLF_TOWER_AUTO_PAY.filter((row) => row.autoPay).length
        return {
            on,
            off: GOLF_TOWER_AUTO_PAY.length - on,
            total: GOLF_TOWER_AUTO_PAY.length,
        }
    }, [])

    const paymentRows = useMemo(() => {
        const needle = paymentQuery.trim().toLowerCase()
        return GOLF_TOWER_CARD_PAYMENTS.filter((row) => {
            if (paymentStatus !== 'all' && row.status !== paymentStatus) return false
            if (!needle) return true
            return [row.tenant, row.unit, row.last4, row.brand].join(' ').toLowerCase().includes(needle)
        })
    }, [paymentQuery, paymentStatus])

    const autoRows = useMemo(() => {
        const needle = autoQuery.trim().toLowerCase()
        return GOLF_TOWER_AUTO_PAY.filter((row) => {
            if (autoFilter === 'on' && !row.autoPay) return false
            if (autoFilter === 'off' && row.autoPay) return false
            if (!needle) return true
            return [row.tenant, row.unit, row.last4, row.occupancy].join(' ').toLowerCase().includes(needle)
        })
    }, [autoFilter, autoQuery])

    return (
        <Space direction='vertical' size={24} width='100%'>
            <Typography.Text type='secondary'>
                {intl.formatMessage({ id: 'pages.condo.dashboard.payments.intro' })}
            </Typography.Text>

            <div className={`${homeStyles.kpiGrid} ${homeStyles.kpiGridFour}`}>
                <Card bodyPadding={20} className={homeStyles.kpi}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{formatOmr(intl, paymentCounts.collected)}</Typography.Title>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.kpi.collected' })}
                        </Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{paymentCounts.pending}</Typography.Title>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.kpi.pending' })}
                        </Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20} className={homeStyles.kpiWarn}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{paymentCounts.failed}</Typography.Title>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.kpi.failed' })}
                        </Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20} className={homeStyles.kpi}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.kpi.autoPayValue' }, {
                                on: intl.formatNumber(autoCounts.on),
                                total: intl.formatNumber(autoCounts.total),
                            })}
                        </Typography.Title>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.kpi.autoPay' })}
                        </Typography.Text>
                    </Space>
                </Card>
            </div>

            {paymentCounts.failed > 0 && (
                <Alert
                    type='warning'
                    showIcon
                    message={intl.formatMessage({ id: 'pages.condo.dashboard.payments.alert' }, {
                        failed: intl.formatNumber(paymentCounts.failed),
                        off: intl.formatNumber(autoCounts.off),
                    })}
                />
            )}

            <Card bodyPadding={20}>
                <Space direction='vertical' size={16} width='100%'>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.cardTitle' })}
                        </Typography.Title>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.cardHint' })}
                        </Typography.Text>
                    </Space>
                    <div className={tabStyles.toolbar}>
                        <RadioGroup
                            optionType='button'
                            value={paymentStatus}
                            onChange={(event) => setPaymentStatus(event.target.value as 'all' | PaymentStatus)}
                        >
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.filter.all' })} value='all' />
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.status.paid' })} value='paid' />
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.status.pending' })} value='pending' />
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.status.failed' })} value='failed' />
                        </RadioGroup>
                        <div className={tabStyles.search}>
                            <Input
                                allowClear
                                placeholder={intl.formatMessage({ id: 'pages.condo.dashboard.payments.searchPayments' })}
                                value={paymentQuery}
                                onChange={(event) => setPaymentQuery(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={tabStyles.tableWrap}>
                        <table className={`${tabStyles.table} ${tabStyles.tableStatic}`}>
                            <thead>
                                <tr>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.date' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.tenant' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.unit' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.amount' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.card' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.status' })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentRows.map((row) => (
                                    <tr key={row.id}>
                                        <td>{intl.formatDate(row.date, { day: '2-digit', month: 'short' })}</td>
                                        <td>{row.tenant}</td>
                                        <td>{row.unit}</td>
                                        <td>{formatOmr(intl, row.amount)}</td>
                                        <td>
                                            {intl.formatMessage({ id: BRAND_LABEL[row.brand] })}
                                            {' '}
                                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.last4' }, { last4: row.last4 })}
                                        </td>
                                        <td>
                                            <span className={STATUS_PILL[row.status]}>
                                                {intl.formatMessage({ id: STATUS_LABEL[row.status] })}
                                            </span>
                                            {row.auto ? (
                                                <span className={`${tabStyles.pill} ${tabStyles.pillAuto}`}>
                                                    {intl.formatMessage({ id: 'pages.condo.dashboard.payments.viaAuto' })}
                                                </span>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Space>
            </Card>

            <Card bodyPadding={20}>
                <Space direction='vertical' size={16} width='100%'>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.autoTitle' })}
                        </Typography.Title>
                        <Typography.Text type='secondary'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.payments.autoHint' })}
                        </Typography.Text>
                    </Space>
                    <div className={tabStyles.toolbar}>
                        <RadioGroup
                            optionType='button'
                            value={autoFilter}
                            onChange={(event) => setAutoFilter(event.target.value as 'all' | 'on' | 'off')}
                        >
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.filter.allTenants' })} value='all' />
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.filter.autoOn' })} value='on' />
                            <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.payments.filter.autoOff' })} value='off' />
                        </RadioGroup>
                        <div className={tabStyles.search}>
                            <Input
                                allowClear
                                placeholder={intl.formatMessage({ id: 'pages.condo.dashboard.payments.searchTenants' })}
                                value={autoQuery}
                                onChange={(event) => setAutoQuery(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={tabStyles.tableWrap}>
                        <table className={`${tabStyles.table} ${tabStyles.tableStatic}`}>
                            <thead>
                                <tr>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.unit' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.tenant' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.occupancy' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.card' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.payments.col.autoPay' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.dues' })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {autoRows.map((row) => (
                                    <tr key={row.unit}>
                                        <td>{row.unit}</td>
                                        <td>{row.tenant}</td>
                                        <td>{intl.formatMessage({ id: OCCUPANCY_LABEL[row.occupancy] })}</td>
                                        <td>
                                            {row.brand && row.last4
                                                ? `${intl.formatMessage({ id: BRAND_LABEL[row.brand] })} ${intl.formatMessage({ id: 'pages.condo.dashboard.payments.last4' }, { last4: row.last4 })}`
                                                : intl.formatMessage({ id: 'pages.condo.dashboard.payments.noCard' })}
                                        </td>
                                        <td>
                                            <span className={`${tabStyles.pill} ${row.autoPay ? tabStyles.pillOn : tabStyles.pillOff}`}>
                                                {intl.formatMessage({
                                                    id: row.autoPay
                                                        ? 'pages.condo.dashboard.payments.auto.on'
                                                        : 'pages.condo.dashboard.payments.auto.off',
                                                })}
                                            </span>
                                        </td>
                                        <td className={row.dues > 0 ? tabStyles.warn : undefined}>
                                            {row.dues > 0
                                                ? formatOmr(intl, row.dues)
                                                : intl.formatMessage({ id: 'pages.condo.dashboard.units.paid' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Space>
            </Card>
        </Space>
    )
}
