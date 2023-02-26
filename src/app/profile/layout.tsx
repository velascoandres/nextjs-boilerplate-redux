'use client'

import { useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Sidebar } from '@/components/Sidebar'
import { ROUTES_MENU } from '@/constants/routes'

type ILayoutProps = {
    children: React.ReactNode
}

export default function Layout (props: ILayoutProps) {

  const router = useRouter()  

  const { children } = props
  
  return (
    <>
      <Sidebar disableGap className="w-60">
        <div className="flex flex-grow justify-center my-6">
          <Avatar firstname="J" lastname="D" size="lg" />
        </div>

        <Button 
          variant="default" 
          colorType="secondary" 
          className="w-full my-4"
          onClick={() => router.push(ROUTES_MENU.dashboard.pathname)}
        >
          <div className="flex flex-row items-center gap-2">
            <Icon icon="material-symbols:arrow-back" fontSize={30} className="w-6 h-6"/>
            Back to dashboard
          </div>
        </Button>
        <Sidebar.Item 
          label="Profile information" 
          pathname={ROUTES_MENU.profile.pathname} 
          icon="carbon:user-profile"
        />
        <Sidebar.Item 
          label="Change email" 
          pathname={ROUTES_MENU.changeEmail.pathname} 
          icon="icon-park-solid:email-block"
        />
        <Sidebar.Item 
          label="Change password" 
          pathname={ROUTES_MENU.changePassword.pathname} 
          icon="mdi:form-textbox-password"
        />
      </Sidebar>

      <div className="navigation-layout navigation-navbar expanded-navbar ml-60">
        <div className="flex flex-row mt-16">
          <section className="flex-1">{children}</section>
        </div>
      </div>
    </>
  )
}