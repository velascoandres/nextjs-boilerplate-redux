'use client'

import React from 'react'
import classnames from 'classnames'

const FIRST_INITIAL_INDEX = 0

interface IAvatarProps {
  firstname: string
  lastname: string
  size?: 'sm' | 'md' | 'lg'
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
  const { firstname, lastname, size } = props
  
  const initials = React.useMemo(() => {
    const getFirstLetter = (word: string) => word?.at(FIRST_INITIAL_INDEX) || ''
    
    return getFirstLetter(firstname).concat(getFirstLetter(lastname)).toUpperCase()
  }, [firstname, lastname])

  const classNames = classnames('avatar avatar-sm', {
    'avatar-md': size === 'md',
    'avatar-lg': size === 'lg',
  })
  
  
  return (
    <div className={classNames}>
      <span className="avatar-text">{initials}</span>
    </div>
  )
}
