import React, { Fragment } from 'react'

import { Transition } from '@headlessui/react'

import { useModal } from '@/common/hooks/useModal'
import { MODALS } from '@/constants/modals'
import { useAppSelector } from '@/store/hooks'

export const ModalRecipient = () => {

  const { isOpen, component, componentProps, modalConfig } = useAppSelector(state => state.modals)

  const { closeModal } = useModal()

  const renderModal = () => {
    if (!component) {
      return null
    }

    const ModalComponent = MODALS[component] as React.FC

    if (!ModalComponent) {
      return null
    }


    return <ModalComponent {...componentProps } />
  }

  React.useEffect(() => {
    const handleEscapeKeydown = () => {
      if (!modalConfig?.closeOnEscapeKeydown) {
        return
      }

      closeModal()
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleEscapeKeydown()
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleEscapeKeydown)
    }

  }, [closeModal, modalConfig])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="modal-recipient" role="modal-container">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div role="dialog-backdrop" className="modal-backdrop" />
        </Transition.Child>
        {renderModal()}
      </div>
    </Transition.Root>
  )
}
