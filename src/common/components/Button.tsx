'use client'

import React from 'react'
import classnames from 'classnames'


interface IButtonProps {
  children?: React.ReactNode
  className?: string
  colorType?: 'primary' | 'secondary' | 'danger'
  variant?: 'default' | 'outline' | 'active'
  disabled?: boolean,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { children, onClick, colorType = 'primary', className = '', variant = 'active', disabled = false } = props

  const styles = classnames('button', {
    [`button-${variant}`]: !disabled,
    [`button-${colorType}`]: !disabled,
    'button-disabled': disabled,
  },
  className
  )
  
  return (
    <button 
      type="button" 
      onClick={onClick}
      className={styles}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
