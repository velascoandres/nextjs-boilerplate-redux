'use client'

import React from 'react'
import classnames from 'classnames'

import { Icon } from '@iconify/react'

import { ISidebarContext, SidebarContext } from './Sidebar'

export interface ISidebarItemProps {
    icon?: string
    label: string
    pathname: string
}

const DEFAULT_ICON = 'tabler:point'

export const SidebarItem:React.FC<ISidebarItemProps> = (props) => {
  
  const { label, icon = DEFAULT_ICON, pathname } = props
  const { selectItem, isHidden, selectedItemName, registerPathname } = React.useContext(SidebarContext) as ISidebarContext


  const handleClick = () => {
    selectItem(pathname)
  }

  const containerClassNames = classnames('sidebar-item', {
    'visible-item': !isHidden,
    'hidden-item': isHidden,
    'selected-item': selectedItemName === pathname
  })

  const textClassNames = classnames('item-title', {
    'text-hidden': isHidden
  })

  React.useEffect(() => {
    registerPathname(pathname, pathname)
  }, [pathname, registerPathname])

  return (
    <li 
      className={containerClassNames} 
      onClick={handleClick}>
      <Icon icon={icon} fontSize={30} className="w-8 h-8"/>
      <div className={textClassNames}>
        {label}
      </div>
    </li>
  )
}
