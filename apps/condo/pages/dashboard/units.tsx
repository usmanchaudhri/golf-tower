import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { DashboardPageLayout } from '@condo/domains/analytics/components/DashboardTabs/DashboardPageLayout'
import { UnitsUsers } from '@condo/domains/analytics/components/UnitsUsers/UnitsUsers'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const UnitsPage: PageComponentType = () => {
    const intl = useIntl()
    const title = intl.formatMessage({ id: 'pages.condo.dashboard.tabs.units' })

    return (
        <DashboardPageLayout
            title={title}
            subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.subtitle' })}
        >
            <UnitsUsers />
        </DashboardPageLayout>
    )
}

UnitsPage.requiredAccess = OrganizationRequired

export default UnitsPage
