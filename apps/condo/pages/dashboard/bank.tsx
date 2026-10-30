import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { BankCash } from '@condo/domains/analytics/components/BankCash/BankCash'
import { DashboardPageLayout } from '@condo/domains/analytics/components/DashboardTabs/DashboardPageLayout'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const BankPage: PageComponentType = () => {
    const intl = useIntl()
    const title = intl.formatMessage({ id: 'pages.condo.dashboard.tabs.bank' })

    return (
        <DashboardPageLayout
            title={title}
            subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.asAt' })}
        >
            <BankCash />
        </DashboardPageLayout>
    )
}

BankPage.requiredAccess = OrganizationRequired

export default BankPage
