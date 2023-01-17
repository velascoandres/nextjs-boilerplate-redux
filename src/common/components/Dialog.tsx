'use client'

import React from 'react'
import classnames from 'classnames'

import { Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'

import { useClickOutside } from '@/common/hooks/useClickOutside'
import { useModal } from '@/common/hooks/useModal'
import { useAppSelector } from '@/store/hooks'

interface IDialogHeaderProps {
    title: string
    align?: 'start' | 'center' | 'end'
}

interface IDialogBodyProps {
    children: React.ReactNode
}


interface IDialogComposition {
    Header: React.FC<IDialogHeaderProps>
    Body: React.FC<IDialogBodyProps>
    Actions: React.FC<IDialogActionsProps>
}

interface IDialogContainerProps {
    showCloseIcon?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
    children: React.ReactNode
}

interface IDialogActionsProps {
    actionsAlignment?: 'start' | 'center' | 'end'
    children: React.ReactNode
}

export const Dialog: React.FC<IDialogContainerProps> & IDialogComposition = (props) => {

  const { children, showCloseIcon = true, size = 'sm' } = props as IDialogContainerProps
  const { closeModal } = useModal()
  const modalContentRef = React.useRef<HTMLDivElement>(null)

  const { modalConfig } = useAppSelector(state => state.modals)
  
  useClickOutside(modalContentRef, () => {
    if (!modalConfig?.closeOnClickOutside) {
      return 
    }
    closeModal()
  })

  const dialogContentClassNames = classnames('dialog-content', {
    'dialog-content-sm': size === 'sm',
    'dialog-content-md': size === 'md',
    'dialog-content-lg': size === 'lg',
    'dialog-content-xl': size === 'xl'
  })

  return (
    <div className="dialog">
      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        className="dialog-container"
      >
        <div className={dialogContentClassNames} ref={modalContentRef}>
          { 
            showCloseIcon && (
              <div className="close-icon" onClick={closeModal} role="close-button">
                <Icon className="w-6 h-6" icon="ion:close" />
              </div>
            )
          }
          <div className="dialog-inner-content">
            {children}
          </div>
        </div>
      </Transition.Child>
    </div>
  )
}

const DialogHeader: React.FC<IDialogHeaderProps> = (props) => {
  const { title, align = 'start' } = props

  const classNames = classnames('h-1/4 p-2 w-full', {
    'text-end': align === 'end',
    'text-start': align === 'start',
    'text-center': align === 'center',
  })

  return (
    <div className={classNames}>
      <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
        {title}
      </h3>
    </div>
  )
}
  

const DialogBody: React.FC<IDialogBodyProps> = (props) => {

  const { children } = props

  return (
    <div className="w-full px-1 pt-2 pb-2">
      {children}
    </div>
  )
}

const DialogActions: React.FC<IDialogActionsProps> = (props) => {
  
  const { children, actionsAlignment = 'end' } = props

  const classNames = classnames('max-h-1/4 w-full sm:flex flex-row pt-4', {
    'justify-end': actionsAlignment === 'end',
    'justify-start': actionsAlignment === 'start',
    'justify-center': actionsAlignment === 'center',
  })

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}
  
  

Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Actions = DialogActions