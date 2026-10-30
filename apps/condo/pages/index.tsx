import get from 'lodash/get'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useOrganization } from '@open-condo/next/organization'

import { PageComponentType } from '@condo/domains/common/types'
import { OrganizationRequired } from '@condo/domains/organization/components/OrganizationRequired'
import { MANAGING_COMPANY_TYPE, SERVICE_PROVIDER_TYPE } from '@condo/domains/organization/constants/common'


const IndexPage: PageComponentType = () => {
    const router = useRouter()
    const organization = useOrganization()

    useEffect(() => {
        const role = get(organization, 'link.role')
        if (!role) return

        if (get(organization, ['organization', 'type'], MANAGING_COMPANY_TYPE) === SERVICE_PROVIDER_TYPE) {
            router.push('/billing')
            return
        }

        router.push('/dashboard')
    }, [organization, router])

    return <></>
}

IndexPage.requiredAccess = OrganizationRequired

export default IndexPage
