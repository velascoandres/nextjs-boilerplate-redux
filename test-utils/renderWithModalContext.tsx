import React from 'react'

import { render } from '@testing-library/react'

import { IModalContext, ModalContext } from '@/providers/ModalProvider'

export const renderWithModalContext = (ui: React.ReactNode, contextValue: Partial<IModalContext> = {}) => {
  const value: IModalContext = {
    state: {
      isOpen: false,
      modalConfig: {
        closeOnClickOutside: false,
        closeOnEscapeKeydown: false,
        ...contextValue.state?.modalConfig
      }
    },
    closeModal: jest.fn(),
    openModal: jest.fn(),
    ...contextValue
  }


  return render(
    <ModalContext.Provider value={value}>{ui}</ModalContext.Provider>,
  )
}
