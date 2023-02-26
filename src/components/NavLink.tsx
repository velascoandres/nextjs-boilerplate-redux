import React from 'react'
import Link from 'next/link'

interface INavLinkProps {
    title: string
    href: string
}

export const NavLink: React.FC<INavLinkProps> = ({ title, href }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className="nav-link">
        {title}
      </a>
    </Link>
  )
}
