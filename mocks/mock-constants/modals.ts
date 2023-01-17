import { IRootState } from '@/store/store'

export const MOCK_STORE_WITH_OPEN_MODAL: IRootState = {
  modals: {
    componentProps: {},
    component: 'MODAL_TEST',
    isOpen: true,
  }
} as unknown as IRootState
  
export const MOCK_STORE_WITH_CLOSE_MODAL: IRootState = {
  modals: {
    componentProps: {},
    component: 'MODAL_TEST',
    isOpen: false,
  }
} as unknown as IRootState

export const MOCK_STORE_WITH_CONFIG: IRootState = {
  modals: {
    componentProps: {},
    component: 'MODAL_TEST',
    isOpen: true,
    modalConfig: {
      closeOnClickOutside: true,
      closeOnEscapeKeydown: true,
    }
  }
} as unknown as IRootState
  
  
export const MOCK_STORE_WITH_UNKNOWN_MODAL: IRootState = {
  modals: {
    componentProps: {},
    component: 'MODAL_UNKNOW',
    isOpen: true,
  }
} as unknown as IRootState
  
export const MOCK_STORE_WITH_EMPTY_MODAL: IRootState = {
  modals: {
    componentProps: {},
    isOpen: true,
  }
} as unknown as IRootState