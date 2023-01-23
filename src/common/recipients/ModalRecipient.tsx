import React, { Fragment } from 'react'

import { Transition } from '@headlessui/react'

import { IModalContext, ModalContext } from '@/common/providers/ModalProvider'

export const ModalRecipient = () => {

  const { 
    state,
    closeModal 
  } = React.useContext(ModalContext) as IModalContext


  const renderModal = () => {
    const { component, componentProps } = state

    if (!component) {
      return null
    }

    const ModalComponent = component

    return <ModalComponent {...componentProps } />
  }

  React.useEffect(() => {
    const hasCloseOnEscapeKeydown = state.modalConfig?.closeOnEscapeKeydown

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return 
      }
      
      if (!hasCloseOnEscapeKeydown) {
        return
      }

      closeModal()
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }

  }, [closeModal, state])

  return (
    <Transition.Root show={state.isOpen} as={Fragment}>
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
