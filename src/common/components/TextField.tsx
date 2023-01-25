'use client'

import React from 'react'
import classNames from 'classnames'

import { InputAdornment } from '@/common/components/InputAdornment'

export interface ITextFieldProps {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  errorText?: string;
  valid?: boolean;
  validText?: string;
  type?: 'text' | 'password' | 'number' | 'email'
  value?: string | number
  
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField = React.forwardRef<HTMLInputElement, ITextFieldProps>((props, ref) => {
  const { 
    label,
    startAdornment,
    endAdornment,
    placeholder,
    type = 'text',
    errorText,
    valid,
    validText,
    ...otherProps
  } = props

  const inputClassName = classNames('input', {
    'left-adornment': startAdornment,
    'right-adornment': endAdornment,
  })

  const inputWrapperClassName = classNames('input-wrapper', {
    'input-success': valid === true,
    'input-error': valid === false,
  })

  const renderHelperText = () => {
    if (!valid && errorText) {
      return (
        <div className="error-text">
          {errorText}
        </div>
      )
    }

    if (valid && validText) {
      return (
        <div className="success-text">
          {validText}
        </div>
      )
    }

    return null
  }


  return (
    <div className="text-field">
      {label && (
        <label
          htmlFor={otherProps.name}
          className="label-text"
        >
          {label}
        </label>
      )}
      <div className={inputWrapperClassName}>
        <InputAdornment position="start">{startAdornment}</InputAdornment>
        <input
          ref={ref}
          type={type}
          className={inputClassName}
          placeholder={placeholder}
          role="textbox"
          {...otherProps}
        />
        <InputAdornment position="end">{endAdornment}</InputAdornment>
      </div>
      {renderHelperText()}
    </div>
  )
})

TextField.displayName = 'TextField'