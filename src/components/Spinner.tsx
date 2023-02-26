'use client'

import React from 'react'

interface ISpinnerProps {
  text?: string
}

export const Spinner: React.FC<ISpinnerProps> = (props) => {
  const { text } = props
  
  return (
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden">{text}</span>
    </div>
  )
}
