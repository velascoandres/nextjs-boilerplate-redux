'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'

import { Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

import { Avatar } from '@/components/Avatar'
import { ROUTES_MENU } from '@/constants/routes'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/slices/authSlice'
import { hideSidebar, showSidebar } from '@/store/slices/uiSlice'

export const Navbar = () => {
  const router = useRouter()
  const { user } = useAppSelector(state => state.auth)
  const { sidebarIsHidden } = useAppSelector(state => state.ui)

  const menuRef = React.useRef(null)
  const [showMenu, setShowMenu] = React.useState(false)
  const dispatch = useAppDispatch()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  useClickOutside(menuRef, () => {
    setShowMenu(false)
  })

  
  const handleLogout = () => {
    dispatch(logout({}))
  }
  const navigateToProfile = () => {
    void router.push(ROUTES_MENU.profile.pathname)
  }


  const handleToggleSidebar = () => {
    if (sidebarIsHidden) {
      dispatch(showSidebar({}))

      return 
    }

    dispatch(hideSidebar({}))
  }


  const toggleButonClassName = classNames('ease-out duration-300', {
    'rotate-180': sidebarIsHidden
  })


  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-toggle-body">
          <button
            type="button"
            className="nav-toggle-button"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={handleToggleSidebar}
          >
            <span className="sr-only">Open main menu</span>

            <Icon icon="material-symbols:arrow-back" fontSize={30} className={toggleButonClassName}/>

          </button>
        </div>
        <div className="nav-body">
          <div className="nav-menu-user">
            <div className="ml-3 relative">
              <div className="user-menu" id="user-menu" role="menu" ref={menuRef}>
                <button
                  type="button"
                  className="user-button"
                  id="user-menu-button"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <Avatar firstname={user.firstname} lastname={user.lastname} />
                </button>
                <Transition
                  show={showMenu}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                  className="profile-menu"
                >
                  <span
                    className="profile-action"
                    id="user-menu-item-0"
                    onClick={navigateToProfile}
                    role="menuitem"
                  >
                      Your Profile
                  </span>
                  <span
                    className="profile-action"
                    id="user-menu-item-1"
                    role="menuitem"
                    onClick={handleLogout}>
                      Sign out
                  </span>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>  
  )
}
