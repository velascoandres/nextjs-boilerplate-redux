'use client'

import React from 'react'
import classNames from 'classnames'

interface IInputAdornmentProps {
  children?: React.ReactNode;
  position?: 'start' | 'end';
}

export const InputAdornment: React.FC<IInputAdornmentProps> = (props) => {
  const { children, position = 'start' } = props

  const className = classNames('input-adornment', {
    'adornment-start': position === 'start',
    'adornment-end': position === 'end',
  })

  if (!children) {
    return null
  }

  return (
    <div className={className} role="img">
      <span className="adornment-child">{children}</span>
    </div>
  )
}
