'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import classnames from 'classnames'

import { ISidebarItemProps, SidebarItem } from './SidebarItem'


export interface ISidebarContext {
    isHidden?: boolean
    selectedItemName: string
    selectItem: (name: string) => void 
    registerPathname: (name: string, pathname: string) => void
}

export interface ISidebarProps {
    isHidden?: boolean
    disableGap?: boolean
    className?: string
    children: React.ReactNode
}

interface ISidebarComposition {
    Item: React.FC<ISidebarItemProps>
}

export const SidebarContext = React.createContext<ISidebarContext | null>(null)


const Sidebar:React.FC<ISidebarProps> & ISidebarComposition = (props) => {
  const { isHidden, children, className = '', disableGap } = props
  const [selectedItemName, setSelectedItemName] = React.useState('')
  const [pathnames, setPathNames] = React.useState<Record<string, string>>({})

  const router = useRouter()
  const pathname = usePathname()

  const registerPathname = React.useCallback((name: string, pathname: string) => {
    setPathNames((currentPaths) => ({
      ...currentPaths,
      [name]: pathname,
    }))
  }, [])

  const onSelectItem = (pathname: string) => {
    if (selectedItemName !== pathname) {
      router.push(pathname)
    }
  }

  const classNames = classnames('sidebar', {
    'sidebar-visible': !isHidden,
    'sidebar-hidden': isHidden,
    [className]: true,
  })

  const navigationListClassNames = classnames('p-2', {
    'mt-20': !disableGap,
  })

  React.useEffect(() => {
    const currentPathname = pathnames[pathname || '']

    if (currentPathname) {
      setSelectedItemName(currentPathname)
    }

  }, [pathnames, pathname])
  
  return (
    <SidebarContext.Provider value={{ isHidden, selectedItemName, selectItem: onSelectItem, registerPathname }}>
      <aside className={classNames}>
        <ul className={navigationListClassNames}>
          {children}
        </ul>
      </aside>
    </SidebarContext.Provider>
  )
}

Sidebar.Item = SidebarItem

export { Sidebar }