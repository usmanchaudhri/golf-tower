import { TicketStatusTypeType } from '@app/condo/schema'
import get from 'lodash/get'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'

import {
    Building,
    Contacts,
    Employee,
    Market,
    Meters,
    NewAppeal,
    Newspaper,
    OnOff,
    Wallet,
} from '@open-condo/icons'
import { useIntl } from '@open-condo/next/intl'
import { useOrganization } from '@open-condo/next/organization'
import { Alert, Banner, Card, Space, Typography } from '@open-condo/ui'
import { colors } from '@open-condo/ui/colors'

import { GOLF_TOWER_STATS } from '@condo/domains/analytics/constants/golfTowerStats'
import { Contact } from '@condo/domains/contact/utils/clientSchema'
import { Meter } from '@condo/domains/meter/utils/clientSchema'
import { NewsItem } from '@condo/domains/news/utils/clientSchema'
import { OrganizationEmployee } from '@condo/domains/organization/utils/clientSchema'
import { Property } from '@condo/domains/property/utils/clientSchema'
import { Incident, Ticket } from '@condo/domains/ticket/utils/clientSchema'

import styles from './HomeDashboard.module.css'


const OPEX_COLORS: Record<typeof GOLF_TOWER_STATS.opexItems[number]['id'], string> = {
    electricity: colors.orange[5],
    repairs: colors.red[5],
    fm: colors.teal[5],
    cleaning: colors.cyan[7],
    security: colors.blue[5],
    office: colors.gray[7],
}

const OPEX_LABEL_IDS = {
    electricity: 'pages.condo.dashboard.opex.electricity',
    repairs: 'pages.condo.dashboard.opex.repairs',
    fm: 'pages.condo.dashboard.opex.fm',
    cleaning: 'pages.condo.dashboard.opex.cleaning',
    security: 'pages.condo.dashboard.opex.security',
    office: 'pages.condo.dashboard.opex.office',
} as const

type BalanceRowId =
    | 'pages.condo.dashboard.balance.bankMuscat'
    | 'pages.condo.dashboard.balance.nboCurrent'
    | 'pages.condo.dashboard.balance.nboFd'
    | 'pages.condo.dashboard.balance.receivables'
    | 'pages.condo.dashboard.balance.otherRecv'
    | 'pages.condo.dashboard.balance.payables'
    | 'pages.condo.dashboard.balance.sinking'
    | 'pages.condo.dashboard.balance.retained'
    | 'pages.condo.dashboard.balance.surplus'

const BALANCE_ROWS: Array<{
    id: BalanceRowId
    year2024: number
    year2026: number
    emptyIn2024?: boolean
}> = [
    { id: 'pages.condo.dashboard.balance.bankMuscat', year2024: GOLF_TOWER_STATS.bankMuscat2024, year2026: GOLF_TOWER_STATS.bankMuscat },
    { id: 'pages.condo.dashboard.balance.nboCurrent', year2024: GOLF_TOWER_STATS.nboCurrent2024, year2026: GOLF_TOWER_STATS.nboCurrent },
    { id: 'pages.condo.dashboard.balance.nboFd', year2024: GOLF_TOWER_STATS.nboFd2024, year2026: GOLF_TOWER_STATS.nboFd },
    { id: 'pages.condo.dashboard.balance.receivables', year2024: GOLF_TOWER_STATS.receivables2024, year2026: GOLF_TOWER_STATS.receivables },
    { id: 'pages.condo.dashboard.balance.otherRecv', year2024: 0, year2026: GOLF_TOWER_STATS.otherRecv, emptyIn2024: true },
    { id: 'pages.condo.dashboard.balance.payables', year2024: GOLF_TOWER_STATS.payables2024, year2026: GOLF_TOWER_STATS.payables },
    { id: 'pages.condo.dashboard.balance.sinking', year2024: GOLF_TOWER_STATS.sinking2024, year2026: GOLF_TOWER_STATS.sinking },
    { id: 'pages.condo.dashboard.balance.retained', year2024: GOLF_TOWER_STATS.retained2024, year2026: GOLF_TOWER_STATS.retained },
    { id: 'pages.condo.dashboard.balance.surplus', year2024: 0, year2026: GOLF_TOWER_STATS.bsSurplus, emptyIn2024: true },
]

type KpiCardProps = {
    label: string
    value: string
    hint?: string
    warn?: boolean
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, hint, warn }) => (
    <Card bodyPadding={20} className={`${styles.kpi}${warn ? ` ${styles.kpiWarn}` : ''}`}>
        <Space direction='vertical' size={8}>
            <Typography.Title level={2}>
                {value}
            </Typography.Title>
            <Typography.Text type='secondary'>{label}</Typography.Text>
            {hint && (
                <Typography.Text type='secondary' size='small'>{hint}</Typography.Text>
            )}
        </Space>
    </Card>
)

type ModuleCardProps = {
    href: string
    icon: React.ReactNode
    title: string
    hint?: string
    children: React.ReactNode
}

const ModuleCard: React.FC<ModuleCardProps> = ({ href, icon, title, hint, children }) => (
    <Link href={href} className={styles.moduleLink}>
        <Card hoverable bodyPadding={20}>
            <Space direction='vertical' size={16}>
                <div className={styles.moduleHeader}>
                    <span className={styles.moduleIcon}>{icon}</span>
                    <Space direction='vertical' size={4}>
                        <Typography.Title level={4}>{title}</Typography.Title>
                        {hint && (
                            <Typography.Text type='secondary' size='small'>{hint}</Typography.Text>
                        )}
                    </Space>
                </div>
                {children}
            </Space>
        </Card>
    </Link>
)

const barHeight = (value: number, max: number): string => {
    if (value <= 0 || max <= 0) return '0%'
    return `${Math.max(3, (value / max) * 100)}%`
}

export const HomeDashboard: React.FC = () => {
    const intl = useIntl()
    const router = useRouter()
    const { organization } = useOrganization()
    const organizationId = get(organization, 'id', null)

    const skip = { skip: !organizationId }
    const orgWhere = { organization: { id: organizationId } }

    const { count: openTickets } = Ticket.useCount({
        where: { ...orgWhere, status: { type: TicketStatusTypeType.NewOrReopened } },
    }, skip)
    const { count: inProgressTickets } = Ticket.useCount({
        where: { ...orgWhere, status: { type: TicketStatusTypeType.Processing } },
    }, skip)
    const { count: completedTickets } = Ticket.useCount({
        where: { ...orgWhere, status: { type: TicketStatusTypeType.Completed } },
    }, skip)
    const { count: closedTickets } = Ticket.useCount({
        where: { ...orgWhere, status: { type: TicketStatusTypeType.Closed } },
    }, skip)
    const { count: contactsCount } = Contact.useCount({ where: orgWhere }, skip)
    const { count: propertiesCount } = Property.useCount({ where: orgWhere }, skip)
    const { count: employeesCount } = OrganizationEmployee.useCount({
        where: { ...orgWhere, isAccepted: true },
    }, skip)
    const { count: newsCount } = NewsItem.useCount({ where: orgWhere }, skip)
    const { count: metersCount } = Meter.useCount({ where: orgWhere }, skip)
    const { count: incidentsCount } = Incident.useCount({ where: orgWhere }, skip)

    const formatOmr = useCallback((value: number) => {
        const formatted = intl.formatNumber(Math.abs(value), { maximumFractionDigits: 0 })
        const signed = value < 0 ? `(${formatted})` : formatted
        return intl.formatMessage({ id: 'pages.condo.dashboard.omr' }, { value: signed })
    }, [intl])

    const formatCount = useCallback((value?: number) => {
        return intl.formatNumber(value || 0, { maximumFractionDigits: 0 })
    }, [intl])

    const maxMonthValue = useMemo(() => {
        return GOLF_TOWER_STATS.months.reduce((max, month) => {
            return Math.max(max, month.income, month.expenses)
        }, 0)
    }, [])

    const handleCollectionsClick = useCallback(() => {
        router.push('/contact')
    }, [router])

    return (
        <div className={styles.stack}>
            <Banner
                title={intl.formatMessage({ id: 'pages.condo.dashboard.collections.title' })}
                subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.collections.subtitle' }, {
                    count: formatCount(GOLF_TOWER_STATS.defaulters),
                    amount: formatOmr(GOLF_TOWER_STATS.netDue),
                    each: formatOmr(GOLF_TOWER_STATS.avgDue),
                })}
                actionText={intl.formatMessage({ id: 'pages.condo.dashboard.collections.action' })}
                backgroundColor={colors.teal[7]}
                invertText
                size='small'
                onClick={handleCollectionsClick}
            />

            <Typography.Text type='secondary'>
                {intl.formatMessage({ id: 'pages.condo.dashboard.subtitle' })}
            </Typography.Text>

            <div className={styles.kpiGrid}>
                <KpiCard
                    label={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.income' })}
                    value={formatOmr(GOLF_TOWER_STATS.income)}
                    hint={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.incomeHint' })}
                />
                <KpiCard
                    label={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.surplus' })}
                    value={formatOmr(GOLF_TOWER_STATS.surplus)}
                />
                <KpiCard
                    label={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.receivables' })}
                    value={formatOmr(GOLF_TOWER_STATS.receivables)}
                    warn
                />
                <KpiCard
                    label={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.arrears' })}
                    value={formatOmr(GOLF_TOWER_STATS.netDue)}
                    warn
                />
                <KpiCard
                    label={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.defaulters' })}
                    value={formatCount(GOLF_TOWER_STATS.defaulters)}
                    warn
                />
                <KpiCard
                    label={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.cash' })}
                    value={formatOmr(GOLF_TOWER_STATS.cashOutsideFd)}
                    hint={intl.formatMessage({ id: 'pages.condo.dashboard.kpi.cashHint' })}
                />
            </div>

            <div className={styles.split}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <div className={styles.sectionTitle}>
                            <Typography.Title level={2}>
                                {intl.formatMessage({ id: 'pages.condo.dashboard.monthly.title' })}
                            </Typography.Title>
                        </div>
                        <Typography.Text type='secondary' size='small'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.monthly.hint' })}
                        </Typography.Text>
                        <div className={styles.chart} aria-hidden>
                            {GOLF_TOWER_STATS.months.map((month) => (
                                <div key={month.label} className={styles.chartCol}>
                                    <div className={styles.bars}>
                                        <div
                                            className={`${styles.bar} ${styles.barIncome}`}
                                            style={{ height: barHeight(month.income, maxMonthValue) }}
                                        />
                                        <div
                                            className={`${styles.bar} ${styles.barExpense}`}
                                            style={{ height: barHeight(month.expenses, maxMonthValue) }}
                                        />
                                    </div>
                                    <span className={styles.chartLabel}>{month.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.legend}>
                            <span className={styles.legendItem}>
                                <span className={`${styles.swatch} ${styles.swatchIncome}`} />
                                <Typography.Text size='small'>
                                    {intl.formatMessage({ id: 'pages.condo.dashboard.monthly.income' })}
                                </Typography.Text>
                            </span>
                            <span className={styles.legendItem}>
                                <span className={`${styles.swatch} ${styles.swatchExpense}`} />
                                <Typography.Text size='small'>
                                    {intl.formatMessage({ id: 'pages.condo.dashboard.monthly.expenses' })}
                                </Typography.Text>
                            </span>
                        </div>
                    </Space>
                </Card>

                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <div className={styles.sectionTitle}>
                            <Typography.Title level={2}>
                                {intl.formatMessage({ id: 'pages.condo.dashboard.opex.title' })}
                            </Typography.Title>
                        </div>
                        <Typography.Title level={3}>
                            {formatOmr(GOLF_TOWER_STATS.opex)}
                        </Typography.Title>
                        <div className={styles.opexList}>
                            {GOLF_TOWER_STATS.opexItems.map((item) => (
                                <div key={item.id} className={styles.opexRow}>
                                    <Typography.Text size='small'>
                                        {intl.formatMessage({ id: OPEX_LABEL_IDS[item.id] })}
                                    </Typography.Text>
                                    <div className={styles.opexTrack}>
                                        <div
                                            className={styles.opexFill}
                                            style={{
                                                width: `${(item.amount / GOLF_TOWER_STATS.opex) * 100}%`,
                                                backgroundColor: OPEX_COLORS[item.id],
                                            }}
                                        />
                                    </div>
                                    <span className={styles.opexAmount}>
                                        <Typography.Text size='small'>
                                            {formatOmr(item.amount)}
                                        </Typography.Text>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Typography.Text type='secondary' size='small'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.opex.softwareNote' })}
                        </Typography.Text>
                    </Space>
                </Card>
            </div>

            <Space direction='vertical' size={16} width='100%'>
                <Typography.Title level={3}>
                    {intl.formatMessage({ id: 'pages.condo.dashboard.ops.title' })}
                </Typography.Title>
                <div className={styles.opsGrid}>
                    <ModuleCard
                        href='/ticket'
                        icon={<NewAppeal size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.helpdesk' })}
                        hint={intl.formatMessage({ id: 'pages.condo.dashboard.ops.helpdeskHint' })}
                    >
                        <div className={styles.statRow}>
                            <Space direction='vertical' size={4}>
                                <Typography.Title level={4}>{formatCount(openTickets)}</Typography.Title>
                                <Typography.Text type='secondary' size='small'>
                                    {intl.formatMessage({ id: 'pages.condo.dashboard.ops.open' })}
                                </Typography.Text>
                            </Space>
                            <Space direction='vertical' size={4}>
                                <Typography.Title level={4}>{formatCount(inProgressTickets)}</Typography.Title>
                                <Typography.Text type='secondary' size='small'>
                                    {intl.formatMessage({ id: 'pages.condo.dashboard.ops.inProgress' })}
                                </Typography.Text>
                            </Space>
                            <Space direction='vertical' size={4}>
                                <Typography.Title level={4}>{formatCount(completedTickets)}</Typography.Title>
                                <Typography.Text type='secondary' size='small'>
                                    {intl.formatMessage({ id: 'pages.condo.dashboard.ops.completed' })}
                                </Typography.Text>
                            </Space>
                            <Space direction='vertical' size={4}>
                                <Typography.Title level={4}>{formatCount(closedTickets)}</Typography.Title>
                                <Typography.Text type='secondary' size='small'>
                                    {intl.formatMessage({ id: 'pages.condo.dashboard.ops.closed' })}
                                </Typography.Text>
                            </Space>
                        </div>
                    </ModuleCard>
                    <ModuleCard
                        href='/news'
                        icon={<Newspaper size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.notices' })}
                    >
                        <Typography.Title level={3}>{formatCount(newsCount)}</Typography.Title>
                    </ModuleCard>
                    <ModuleCard
                        href='/contact'
                        icon={<Contacts size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.residents' })}
                    >
                        <Typography.Title level={3}>{formatCount(contactsCount)}</Typography.Title>
                    </ModuleCard>
                    <ModuleCard
                        href='/property'
                        icon={<Building size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.properties' })}
                    >
                        <Typography.Title level={3}>{formatCount(propertiesCount)}</Typography.Title>
                    </ModuleCard>
                    <ModuleCard
                        href='/employee'
                        icon={<Employee size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.staff' })}
                    >
                        <Typography.Title level={3}>{formatCount(employeesCount)}</Typography.Title>
                    </ModuleCard>
                    <ModuleCard
                        href='/meter'
                        icon={<Meters size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.meters' })}
                    >
                        <Typography.Title level={3}>{formatCount(metersCount)}</Typography.Title>
                    </ModuleCard>
                    <ModuleCard
                        href='/incident'
                        icon={<OnOff size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.incidents' })}
                    >
                        <Typography.Title level={3}>{formatCount(incidentsCount)}</Typography.Title>
                    </ModuleCard>
                    <ModuleCard
                        href='/billing'
                        icon={<Wallet size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.billing' })}
                    >
                        <Typography.Title level={4}>{formatOmr(GOLF_TOWER_STATS.netDue)}</Typography.Title>
                        <Typography.Text type='secondary' size='small'>
                            {intl.formatMessage({ id: 'pages.condo.dashboard.kpi.arrears' })}
                        </Typography.Text>
                    </ModuleCard>
                    <ModuleCard
                        href='/marketplace'
                        icon={<Market size='small' />}
                        title={intl.formatMessage({ id: 'pages.condo.dashboard.ops.marketplace' })}
                    >
                        <Typography.Text type='secondary' size='small'>
                            {intl.formatMessage({ id: 'global.section.marketplace' })}
                        </Typography.Text>
                    </ModuleCard>
                </div>
            </Space>

            <div className={styles.split}>
                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <div className={styles.sectionTitle}>
                            <Typography.Title level={2}>
                                {intl.formatMessage({ id: 'pages.condo.dashboard.balance.title' })}
                            </Typography.Title>
                        </div>
                        <table className={styles.balanceTable}>
                            <thead>
                                <tr>
                                    <th />
                                    <th>
                                        <Typography.Text type='secondary' size='small'>
                                            {intl.formatMessage({ id: 'pages.condo.dashboard.balance.col2024' })}
                                        </Typography.Text>
                                    </th>
                                    <th>
                                        <Typography.Text size='small'>
                                            {intl.formatMessage({ id: 'pages.condo.dashboard.balance.col2026' })}
                                        </Typography.Text>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {BALANCE_ROWS.map((row) => (
                                    <tr key={row.id}>
                                        <td>
                                            <Typography.Text>
                                                {intl.formatMessage({ id: row.id })}
                                            </Typography.Text>
                                        </td>
                                        <td>
                                            <Typography.Text type='secondary'>
                                                {row.emptyIn2024 ? '—' : formatOmr(row.year2024)}
                                            </Typography.Text>
                                        </td>
                                        <td>
                                            <Typography.Text>
                                                {formatOmr(row.year2026)}
                                            </Typography.Text>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Space>
                </Card>

                <Card bodyPadding={20}>
                    <Space direction='vertical' size={16} width='100%'>
                        <div className={styles.sectionTitle}>
                            <Typography.Title level={2}>
                                {intl.formatMessage({ id: 'pages.condo.dashboard.attention.title' })}
                            </Typography.Title>
                        </div>
                        <div className={styles.alerts}>
                            <Alert
                                type='warning'
                                showIcon
                                message={intl.formatMessage({ id: 'pages.condo.dashboard.attention.overdraft' }, {
                                    amount: formatOmr(Math.abs(GOLF_TOWER_STATS.nboCurrent)),
                                })}
                            />
                            <Alert
                                type='info'
                                showIcon
                                message={intl.formatMessage({ id: 'pages.condo.dashboard.attention.equity' }, {
                                    equity: formatOmr(GOLF_TOWER_STATS.equityLiabilities),
                                    assets: formatOmr(GOLF_TOWER_STATS.assetsTotal),
                                })}
                            />
                            <Alert
                                type='info'
                                showIcon
                                message={intl.formatMessage({ id: 'pages.condo.dashboard.attention.receivables' }, {
                                    delta: formatOmr(GOLF_TOWER_STATS.receivablesDelta),
                                    from: formatOmr(GOLF_TOWER_STATS.receivables2024),
                                    to: formatOmr(GOLF_TOWER_STATS.receivables),
                                })}
                            />
                            <Alert
                                type='warning'
                                showIcon
                                message={intl.formatMessage({ id: 'pages.condo.dashboard.attention.reversal' }, {
                                    income: formatOmr(GOLF_TOWER_STATS.decemberIncomeReversal),
                                    expenses: formatOmr(GOLF_TOWER_STATS.decemberExpenseReversal),
                                })}
                            />
                        </div>
                    </Space>
                </Card>
            </div>
        </div>
    )
}
