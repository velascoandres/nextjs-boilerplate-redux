'use client'

import classnames from 'classnames'

import { Navbar } from '@/common/components/Navbar'
import { Sidebar } from '@/common/components/Sidebar'
import { ROUTES_MENU } from '@/constants/routes'
import { useAppSelector } from '@/store/hooks'

type ILayoutProps = {
    children: React.ReactNode
}

export default function Layout (props: ILayoutProps) {

  const { children } = props
  const { sidebarIsHidden } = useAppSelector(state => state.ui)
  
  const navbarContainerClassNames = classnames('navigation-layout navigation-navbar', {
    'expanded-navbar': !sidebarIsHidden,
    'collapsed-navbar': sidebarIsHidden,
  })
  

  return (
    <>
      <Sidebar isHidden={sidebarIsHidden}>
        <Sidebar.Item 
          label="Dashboard" 
          pathname={ROUTES_MENU.dashboard.pathname} 
          icon="material-symbols:home-rounded"
        />
        <Sidebar.Item 
          label="Tasks" 
          pathname={ROUTES_MENU.tasks.pathname} 
          icon="mdi:money"
        />
        <Sidebar.Item 
          label="About" 
          pathname={ROUTES_MENU.about.pathname} 
          icon="mdi:user"
        />
      </Sidebar>

      <div className={navbarContainerClassNames}>
        <Navbar />
        <div className="flex flex-row mt-16">
          <section className="flex-1">{children}</section>
        </div>
      </div>
    </>
  )
}