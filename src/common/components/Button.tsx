'use client'

import React, { ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'


interface IButtonProps {
  children?: React.ReactNode
  className?: string
  colorType?: 'primary' | 'secondary' | 'danger'
  variant?: 'default' | 'outline' | 'active'
  disabled?: boolean,
  type?: 'submit' | 'reset' | 'button',
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { 
    children, 
    onClick, 
    colorType = 'primary', 
    className = '', 
    variant = 'active', 
    disabled = false,
    type = 'button'
  } = props

  const styles = classnames('button', {
    [`button-${variant}`]: !disabled,
    [`button-${colorType}`]: !disabled,
    'button-disabled': disabled,
  },
  className
  )
  
  return (
    <button 
      type={type} 
      onClick={onClick}
      className={styles}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
