import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { DashboardPageLayout } from '@condo/domains/analytics/components/DashboardTabs/DashboardPageLayout'
import { PaymentsBoard } from '@condo/domains/analytics/components/PaymentsBoard/PaymentsBoard'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const PaymentsPage: PageComponentType = () => {
    const intl = useIntl()
    const title = intl.formatMessage({ id: 'pages.condo.dashboard.tabs.payments' })

    return (
        <DashboardPageLayout
            title={title}
            subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.subtitle' })}
        >
            <PaymentsBoard />
        </DashboardPageLayout>
    )
}

PaymentsPage.requiredAccess = OrganizationRequired

export default PaymentsPage
