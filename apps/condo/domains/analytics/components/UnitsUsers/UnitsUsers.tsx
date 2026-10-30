import React, { useMemo, useState } from 'react'

import { useIntl } from '@open-condo/next/intl'
import { Card, Input, Radio, RadioGroup, Space, Typography } from '@open-condo/ui'

import tabStyles from '@condo/domains/analytics/components/DashboardTabs/DashboardTabs.module.css'
import { GOLF_TOWER_STATS } from '@condo/domains/analytics/constants/golfTowerStats'
import { GOLF_TOWER_UNITS } from '@condo/domains/analytics/constants/golfTowerUnits'

import homeStyles from '../HomeDashboard/HomeDashboard.module.css'

import type { GolfTowerOccupancy, GolfTowerUnit } from '@condo/domains/analytics/constants/golfTowerUnits'


const ROLE_LABEL = {
    owner: 'pages.condo.dashboard.units.role.owner',
    ownerFamily: 'pages.condo.dashboard.units.role.ownerFamily',
    tenant: 'pages.condo.dashboard.units.role.tenant',
    tenantFamily: 'pages.condo.dashboard.units.role.tenantFamily',
} as const

const OCCUPANCY_PILL: Record<GolfTowerOccupancy, string> = {
    owner: tabStyles.pillOwner,
    tenant: tabStyles.pillTenant,
    vacant: tabStyles.pillVacant,
}

const OCCUPANCY_LABEL = {
    owner: 'pages.condo.dashboard.units.occupancy.owner',
    tenant: 'pages.condo.dashboard.units.occupancy.tenant',
    vacant: 'pages.condo.dashboard.units.occupancy.vacant',
} as const

const formatOmr = (intl: ReturnType<typeof useIntl>, value: number) => {
    const formatted = intl.formatNumber(Math.abs(value), { maximumFractionDigits: 0 })
    return intl.formatMessage({ id: 'pages.condo.dashboard.omr' }, { value: formatted })
}

export const UnitsUsers: React.FC = () => {
    const intl = useIntl()
    const [query, setQuery] = useState('')
    const [occupancy, setOccupancy] = useState<'all' | GolfTowerOccupancy>('all')
    const [selectedId, setSelectedId] = useState(GOLF_TOWER_UNITS[0].id)

    const counts = useMemo(() => ({
        units: GOLF_TOWER_UNITS.length,
        owners: GOLF_TOWER_UNITS.filter((unit) => unit.occupancy === 'owner').length,
        tenants: GOLF_TOWER_UNITS.filter((unit) => unit.occupancy === 'tenant').length,
        vacant: GOLF_TOWER_UNITS.filter((unit) => unit.occupancy === 'vacant').length,
        users: GOLF_TOWER_UNITS.reduce((sum, unit) => sum + unit.users.length, 0),
        withDues: GOLF_TOWER_UNITS.filter((unit) => unit.dues > 0).length,
    }), [])

    const rows = useMemo(() => {
        const needle = query.trim().toLowerCase()
        return GOLF_TOWER_UNITS.filter((unit) => {
            if (occupancy !== 'all' && unit.occupancy !== occupancy) return false
            if (!needle) return true
            const haystack = [
                unit.unit,
                unit.billTo,
                unit.vehicle,
                ...unit.parking,
                ...unit.users.flatMap((user) => [user.name, user.phone, user.email]),
            ].join(' ').toLowerCase()
            return haystack.includes(needle)
        })
    }, [occupancy, query])

    const selected = rows.find((unit) => unit.id === selectedId) || rows[0] || GOLF_TOWER_UNITS[0]

    const occupancyLabel = (unit: GolfTowerUnit) => intl.formatMessage({
        id: OCCUPANCY_LABEL[unit.occupancy],
    })

    return (
        <Space direction='vertical' size={24} width='100%'>
            <Typography.Text type='secondary'>
                {intl.formatMessage({ id: 'pages.condo.dashboard.units.intro' }, {
                    count: intl.formatNumber(GOLF_TOWER_STATS.defaulters),
                })}
            </Typography.Text>

            <div className={homeStyles.kpiGrid}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.units}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.kpi.units' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.users}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.kpi.users' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.owners}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.kpi.ownerOccupied' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.tenants}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.kpi.tenantOccupied' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.vacant}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.kpi.vacant' })}</Typography.Text>
                    </Space>
                </Card>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={2}>{counts.withDues}</Typography.Title>
                        <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.kpi.withDues' })}</Typography.Text>
                    </Space>
                </Card>
            </div>

            <div className={tabStyles.toolbar}>
                <RadioGroup
                    optionType='button'
                    value={occupancy}
                    onChange={(event) => setOccupancy(event.target.value as 'all' | GolfTowerOccupancy)}
                >
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.units.filter.all' })} value='all' />
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.units.filter.owner' })} value='owner' />
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.units.filter.tenant' })} value='tenant' />
                    <Radio label={intl.formatMessage({ id: 'pages.condo.dashboard.units.filter.vacant' })} value='vacant' />
                </RadioGroup>
                <div className={tabStyles.search}>
                    <Input
                        allowClear
                        placeholder={intl.formatMessage({ id: 'pages.condo.dashboard.units.search' })}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
            </div>

            <div className={homeStyles.split}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <Typography.Title level={2}>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.units.tableTitle' })}
                        </Typography.Title>
                        <div className={tabStyles.tableWrap}>
                            <table className={tabStyles.table}>
                                <thead>
                                    <tr>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.unit' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.occupancy' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.billTo' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.livesHere' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.phone' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.parking' })}</th>
                                        <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.dues' })}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((unit) => {
                                        const resident = unit.users.find((user) => user.livesHere) || unit.users[0]
                                        return (
                                            <tr
                                                key={unit.id}
                                                className={selected?.id === unit.id ? tabStyles.active : undefined}
                                                onClick={() => setSelectedId(unit.id)}
                                            >
                                                <td>{unit.unit}</td>
                                                <td>
                                                    <span className={`${tabStyles.pill} ${OCCUPANCY_PILL[unit.occupancy]}`}>
                                                        {occupancyLabel(unit)}
                                                    </span>
                                                </td>
                                                <td>{unit.billTo}</td>
                                                <td>{resident?.livesHere ? resident.name : '—'}</td>
                                                <td>{resident?.phone || '—'}</td>
                                                <td>{unit.parking.length ? unit.parking.join(', ') : '—'}</td>
                                                <td className={unit.dues > 0 ? tabStyles.warn : undefined}>
                                                    {unit.dues > 0 ? formatOmr(intl, unit.dues) : '—'}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Space>
                </Card>

                {selected && (
                    <Card bodyPadding={20}>
                        <Space direction='vertical' size={16} width='100%'>
                            <Typography.Title level={2}>
                                {intl.formatMessage({ id: 'pages.condo.dashboard.units.detailTitle' }, { unit: selected.unit })}
                            </Typography.Title>
                            <div className={tabStyles.detailList}>
                                <div className={tabStyles.detailRow}>
                                    <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.occupancy' })}</Typography.Text>
                                    <span className={`${tabStyles.pill} ${OCCUPANCY_PILL[selected.occupancy]}`}>
                                        {occupancyLabel(selected)}
                                    </span>
                                </div>
                                <div className={tabStyles.detailRow}>
                                    <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.billTo' })}</Typography.Text>
                                    <Typography.Text>{selected.billTo}</Typography.Text>
                                </div>
                                <div className={tabStyles.detailRow}>
                                    <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.parking' })}</Typography.Text>
                                    <Typography.Text>{selected.parking.length ? selected.parking.join(', ') : '—'}</Typography.Text>
                                </div>
                                <div className={tabStyles.detailRow}>
                                    <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.vehicle' })}</Typography.Text>
                                    <Typography.Text>{selected.vehicle || '—'}</Typography.Text>
                                </div>
                                <div className={tabStyles.detailRow}>
                                    <Typography.Text type='secondary'>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.dues' })}</Typography.Text>
                                    <Typography.Text>{selected.dues > 0 ? formatOmr(intl, selected.dues) : intl.formatMessage({ id: 'pages.condo.dashboard.units.paid' })}</Typography.Text>
                                </div>
                            </div>
                            <Typography.Title level={4}>
                                {intl.formatMessage({ id: 'pages.condo.dashboard.units.members' })}
                            </Typography.Title>
                            <div className={tabStyles.tableWrap}>
                                <table className={tabStyles.table}>
                                    <thead>
                                        <tr>
                                            <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.name' })}</th>
                                            <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.role' })}</th>
                                            <th>{intl.formatMessage({ id: 'pages.condo.dashboard.units.col.livesHere' })}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selected.users.map((user) => (
                                            <tr key={`${selected.id}-${user.name}`}>
                                                <td>
                                                    <Space direction='vertical' size={4}>
                                                        <Typography.Text>{user.name}</Typography.Text>
                                                        <Typography.Text type='secondary' size='small'>{user.phone}</Typography.Text>
                                                    </Space>
                                                </td>
                                                <td>{intl.formatMessage({ id: ROLE_LABEL[user.role] })}</td>
                                                <td>{user.livesHere ? intl.formatMessage({ id: 'Yes' }) : intl.formatMessage({ id: 'No' })}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Space>
                    </Card>
                )}
            </div>
        </Space>
    )
}
