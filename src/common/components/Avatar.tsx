'use client'

import React from 'react'

const FIRST_INITIAL_INDEX = 0

interface IAvatarProps {
  firstname: string
  lastname: string
}

export const Avatar: React.FC<IAvatarProps> = (props) => {
  const { firstname, lastname } = props
  
  const initials = React.useMemo(() => {
    const getFirstLetter = (word: string) => word?.at(FIRST_INITIAL_INDEX) || ''
    
    return getFirstLetter(firstname).concat(getFirstLetter(lastname)).toUpperCase()
  }, [firstname, lastname])
  
  
  return (
    <div className="avatar">
      <span className="avatar-text">{initials}</span>
    </div>
  )
}
