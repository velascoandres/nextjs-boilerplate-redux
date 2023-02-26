/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type IModalProps = { [key in string]: unknown }

interface IModalConfig {
    closeOnClickOutside: boolean
    closeOnEscapeKeydown: boolean
}

export interface IOpenModalArgs {
    component: React.FC<any>
    props?: IModalProps
    config?: IModalConfig
}

export interface IModalState {
    component?: React.FC<any>
    componentProps?: IModalProps
    isOpen: boolean
    modalConfig: IModalConfig
}

export interface IModalContext {
    state: IModalState

    openModal: (args: IOpenModalArgs) => void
    closeModal: () => void
}

interface IModalProviderProps {
    children: React.ReactNode
}

export const ModalContext = React.createContext<IModalContext | null>(null)

const INITIAL_MODAL_CONFIG: IModalConfig = {
  closeOnClickOutside: false,
  closeOnEscapeKeydown: false,
}

const INITIAL_MODAL_STATE: IModalState = {
  isOpen: false,
  modalConfig: INITIAL_MODAL_CONFIG
}


export const ModalProvider = (props: IModalProviderProps) => {

  const [modalState, setModalState] = React.useState(INITIAL_MODAL_STATE)


  const { children } = props

  const openModal = React.useCallback((args: IOpenModalArgs) => {
    setModalState(oldState => ({
      ...oldState,
      component: args.component,
      componentProps: args.props,
      modalConfig: args.config || INITIAL_MODAL_CONFIG,
      isOpen: true,
    }))
  }, [])

  const closeModal = React.useCallback(() => {
    setModalState(oldState => ({
      ...oldState,
      modalConfig: INITIAL_MODAL_CONFIG,
      isOpen: false,
    }))
  }, [])

  return (
    <ModalContext.Provider value={{
      state: modalState,
      openModal,
      closeModal  
    }}>
      {children}
    </ModalContext.Provider>
  )
}
