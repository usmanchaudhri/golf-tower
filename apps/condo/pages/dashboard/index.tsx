import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { DashboardPageLayout } from '@condo/domains/analytics/components/DashboardTabs/DashboardPageLayout'
import { HomeDashboard } from '@condo/domains/analytics/components/HomeDashboard'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const IndexPage: PageComponentType = () => {
    const intl = useIntl()
    const PageTitleMsg = intl.formatMessage({ id: 'pages.condo.dashboard.index.PageTitle' })

    return (
        <DashboardPageLayout
            title={PageTitleMsg}
            subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.asAt' })}
        >
            <HomeDashboard />
        </DashboardPageLayout>
    )
}

IndexPage.requiredAccess = OrganizationRequired

export default IndexPage
