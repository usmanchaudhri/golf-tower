import get from 'lodash/get'
import Head from 'next/head'
import React from 'react'

import { useOrganization } from '@open-condo/next/organization'
import { Typography } from '@open-condo/ui'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageContent, PageHeader, PageWrapper } from '@condo/domains/common/components/containers/BaseLayout'
import { MANAGING_COMPANY_TYPE } from '@condo/domains/organization/constants/common'


type DashboardPageLayoutProps = {
    title: string
    subtitle?: string
    children: React.ReactNode
}

export const DashboardPageLayout: React.FC<DashboardPageLayoutProps> = ({ title, subtitle, children }) => {
    const { organization } = useOrganization()
    const isManagingCompany = get(organization, 'type') === MANAGING_COMPANY_TYPE

    if (!isManagingCompany) {
        return <AccessDeniedPage />
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <PageWrapper>
                <PageHeader
                    title={<Typography.Title>{title}</Typography.Title>}
                    subTitle={subtitle}
                />
                <PageContent>
                    {children}
                </PageContent>
            </PageWrapper>
        </>
    )
}
