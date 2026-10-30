import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { AccountsBoard } from '@condo/domains/analytics/components/AccountsBoard/AccountsBoard'
import { DashboardPageLayout } from '@condo/domains/analytics/components/DashboardTabs/DashboardPageLayout'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const AccountsPage: PageComponentType = () => {
    const intl = useIntl()
    const title = intl.formatMessage({ id: 'pages.condo.dashboard.tabs.accounts' })

    return (
        <DashboardPageLayout
            title={title}
            subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.asAt' })}
        >
            <AccountsBoard />
        </DashboardPageLayout>
    )
}

AccountsPage.requiredAccess = OrganizationRequired

export default AccountsPage
