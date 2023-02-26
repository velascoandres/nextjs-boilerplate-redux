'use client'

import React from 'react'

import { Icon } from '@iconify/react'

import { ITextFieldProps, TextField } from './TextField'

export type IPasswordFieldProps = Omit<ITextFieldProps, 'startAdornment' | 'endAdornment' | 'type'>

export const PasswordField: React.FC<IPasswordFieldProps> = React.forwardRef<HTMLInputElement, IPasswordFieldProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <TextField
        ref={ref} 
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <div             
            role="button"
            onClick={() => setShowPassword(old => !old)}
            className="pointer-events-auto cursor-pointer"
          >
            <Icon 
              icon={showPassword ? 'mdi:eye' : 'mdi:eye-off'} 
              fontSize={20}
            />
          </div>
        }
        {...props}
      />
    )
  })

PasswordField.displayName = 'PasswordField'