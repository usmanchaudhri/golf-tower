import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { DashboardPageLayout } from '@condo/domains/analytics/components/DashboardTabs/DashboardPageLayout'
import { ParkingManager } from '@condo/domains/analytics/components/ParkingManager/ParkingManager'
import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'


const ParkingPage: PageComponentType = () => {
    const intl = useIntl()
    const title = intl.formatMessage({ id: 'pages.condo.dashboard.tabs.parking' })

    return (
        <DashboardPageLayout
            title={title}
            subtitle={intl.formatMessage({ id: 'pages.condo.dashboard.subtitle' })}
        >
            <ParkingManager />
        </DashboardPageLayout>
    )
}

ParkingPage.requiredAccess = OrganizationRequired

export default ParkingPage
