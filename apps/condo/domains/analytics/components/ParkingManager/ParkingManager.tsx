import React, { useMemo, useState } from 'react'

import { useIntl } from '@open-condo/next/intl'
import { Card, Input, Radio, RadioGroup, Space, Typography } from '@open-condo/ui'

import tabStyles from '@condo/domains/analytics/components/DashboardTabs/DashboardTabs.module.css'
import { GOLF_TOWER_PARKING_BAYS } from '@condo/domains/analytics/constants/golfTowerUnits'

import homeStyles from '../HomeDashboard/HomeDashboard.module.css'


const STATUS_PILL: Record<string, string> = {
    assigned: `${tabStyles.pill} ${tabStyles.pillAssigned}`,
    vacant: `${tabStyles.pill} ${tabStyles.pillVacant}`,
    visitor: `${tabStyles.pill} ${tabStyles.pillVisitor}`,
}

const STATUS_LABEL = {
    assigned: 'pages.condo.dashboard.parking.status.assigned',
    vacant: 'pages.condo.dashboard.parking.status.vacant',
    visitor: 'pages.condo.dashboard.parking.status.visitor',
} as const

export const ParkingManager: React.FC = () => {
    const intl = useIntl()
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState<'all' | 'assigned' | 'vacant' | 'visitor'>('all')

    const counts = useMemo(() => ({
        total: GOLF_TOWER_PARKING_BAYS.length,
        assigned: GOLF_TOWER_PARKING_BAYS.filter((bay) => bay.status === 'assigned').length,
        vacant: GOLF_TOWER_PARKING_BAYS.filter((bay) => bay.status === 'vacant').length,
        visitor: GOLF_TOWER_PARKING_BAYS.filter((bay) => bay.status === 'visitor').length,
    }), [])

    const rows = useMemo(() => {
        const needle = query.trim().toLowerCase()
        return GOLF_TOWER_PARKING_BAYS.filter((bay) => {
            if (status !== 'all' && bay.status !== status) return false
            if (!needle) return true
            return [bay.bay, bay.level, bay.unit, bay.vehicle].join(' ').toLowerCase().includes(needle)
        })
    }, [query, status])

    return (
        <Space direction='vertical' size={24} width='100%'>
            <Typography.Text type='secondary'>
                {intl.formatMessage({ id: 'pages.condo.dashboard.parking.intro' })}
            </Typography.Text>

            <div className={homeStyles.kpiGrid}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.total}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.kpi.total' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.assigned}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.kpi.assigned' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.vacant}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.kpi.vacant' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.visitor}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.kpi.visitor' })}</Typography.Text>
                    </Space>
                </Card>
            </div>

            <div className={tabStyles.toolbar}>
                <RadioGroup
                    optionType='button'
                    value={status}
                    onChange={(event) => setStatus(event.target.value as 'all' | 'assigned' | 'vacant' | 'visitor')}
                >
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.parking.filter.all' })} value='all' />
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.parking.filter.assigned' })} value='assigned' />
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.parking.filter.vacant' })} value='vacant' />
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.parking.filter.visitor' })} value='visitor' />
                </RadioGroup>
                <div className={tabStyles.search}>
                    <Input
                        allowClear
                        placeholder={intl.formatMessage({ id: 'pages.condo.dashboard.parking.search' })}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
            </div>

            <Card bodyPadding={20}>
                <Space direction='vertical' size={16} width='100%'>
                    <Typography.Title level={2}>
                        {intl.formatMessage({ id: 'pages.condo.dashboard.parking.tableTitle' })}
                    </Typography.Title>
                    <div className={tabStyles.tableWrap}>
                        <table className={tabStyles.table}>
                            <thead>
                                <tr>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.col.bay' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.col.level' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.col.unit' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.col.vehicle' })}</th>
                                    <th>{intl.formatMessage({ id: 'pages.condo.dashboard.parking.col.status' })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((bay) => (
                                    <tr key={bay.bay}>
                                        <td>{bay.bay}</td>
                                        <td>{bay.level}</td>
                                        <td>{bay.unit || '—'}</td>
                                        <td>{bay.vehicle || '—'}</td>
                                        <td>
                                            <span className={STATUS_PILL[bay.status]}>
                                                {intl.formatMessage({ id: STATUS_LABEL[bay.status] })}
                                            </span>
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
