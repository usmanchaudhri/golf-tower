import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'

import { useDeepCompareEffect } from '@open-condo/codegen/utils/useDeepCompareEffect'
import { ChevronDown, ChevronUp } from '@open-condo/icons'
import { useIntl } from '@open-condo/next/intl'
import { Dropdown } from '@open-condo/ui'

import { INoOrganizationToolTipWrapper } from '@condo/domains/onboarding/hooks/useNoOrganizationToolTip'

import styles from './MenuDropdown.module.css'
import { MenuItem } from './MenuItem'


export type MenuDropdownChild = {
    id: string
    path: string
    label: string
    labelRaw?: true
    excludePaths?: Array<RegExp>
}

type MenuDropdownProps = {
    id: string
    icon?: React.ElementType
    label: string
    labelRaw?: true
    isCollapsed?: boolean
    disabled?: boolean
    items: Array<MenuDropdownChild>
    toolTipDecorator?: (params: INoOrganizationToolTipWrapper) => JSX.Element
}

const isPathActive = (asPath: string, path: string, excludePaths: Array<RegExp> = []): boolean => {
    if (!path) return false
    const [asPathname] = asPath.split('?')
    const [pathname, query] = path.split('?')
    if (path === '/') return asPathname === '/'
    if (query) return asPath === path
    const matches = asPathname === pathname || asPathname.startsWith(`${pathname}/`)
    return matches && excludePaths.every((exPath) => !exPath.test(asPath))
}

export const MenuDropdown: React.FC<MenuDropdownProps> = (props) => {
    const {
        id,
        icon,
        label,
        labelRaw,
        isCollapsed,
        disabled,
        items,
        toolTipDecorator,
    } = props
    const intl = useIntl()
    const router = useRouter()
    const asPath = router.asPath

    const title = labelRaw
        ? label
        : intl.formatMessage({ id: label as FormatjsIntl.Message['ids'] })

    const hasActiveChild = useMemo(() => {
        return items.some((item) => isPathActive(asPath, item.path, item.excludePaths))
    }, [asPath, items])

    const [isOpen, setIsOpen] = useState(hasActiveChild)

    useDeepCompareEffect(() => {
        if (hasActiveChild) {
            setIsOpen(true)
        }
    }, [hasActiveChild])

    const toggleOpen = useCallback(() => {
        if (disabled) return
        setIsOpen((open) => !open)
    }, [disabled])

    const Chevron = isOpen ? ChevronUp : ChevronDown

    const childItems = useMemo(() => items.map((item) => (
        <MenuItem
            key={item.id}
            id={item.id}
            path={item.path}
            label={item.label}
            labelRaw={item.labelRaw}
            disabled={disabled}
            isCollapsed={false}
            excludePaths={item.excludePaths}
            toolTipDecorator={toolTipDecorator}
            onDark
            isSubmenu
            menuItemWrapperProps={{ className: styles.child }}
        />
    )), [disabled, items, toolTipDecorator])

    if (isCollapsed) {
        return (
            <Dropdown
                trigger={['click']}
                placement='bottomLeft'
                disabled={disabled}
                menu={{
                    items: items.map((item) => ({
                        key: item.id,
                        label: (
                            <MenuItem
                                id={item.id}
                                path={item.path}
                                label={item.label}
                                labelRaw={item.labelRaw}
                                disabled={disabled}
                                excludePaths={item.excludePaths}
                                toolTipDecorator={toolTipDecorator}
                                isSubmenu
                                menuItemWrapperProps={{ className: styles.child }}
                            />
                        ),
                    })),
                }}
            >
                <div className={styles.collapsedTrigger}>
                    <MenuItem
                        id={id}
                        icon={icon}
                        label={title}
                        labelRaw
                        disabled={disabled}
                        isCollapsed
                        onDark
                    />
                </div>
            </Dropdown>
        )
    }

    return (
        <div className={styles.dropdown}>
            <div>
                <MenuItem
                    id={id}
                    icon={icon}
                    label={title}
                    labelRaw
                    disabled={disabled}
                    isCollapsed={false}
                    onClick={toggleOpen}
                    extra={<Chevron size='medium' />}
                    onDark
                    toolTipDecorator={toolTipDecorator}
                />
            </div>
            {isOpen && !disabled && (
                <div className={styles.children}>
                    {childItems}
                </div>
            )}
        </div>
    )
}
