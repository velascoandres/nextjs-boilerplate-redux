import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

import { MODALS } from '@/constants/modals'

interface IModalConfig {
  closeOnClickOutside: boolean
  closeOnEscapeKeydown: boolean
}

export interface IModalState {
  component?: keyof typeof MODALS
  componentProps: { [key in string]: unknown }
  isOpen: boolean
  modalConfig: IModalConfig
}

export interface IOpenModalPayload {
    component?: keyof typeof MODALS
    props: { [key in string]: unknown }
    config?: IModalConfig
}

const INITIAL_MODAL_CONFIG: IModalConfig = {
  closeOnClickOutside: false,
  closeOnEscapeKeydown: false,
}

const INITIAL_STATE: IModalState = {
  componentProps: {},
  isOpen: false,
  modalConfig: INITIAL_MODAL_CONFIG
}

export const modalSlice = createSlice<
IModalState,
  SliceCaseReducers<IModalState>
>({
  name: 'loader',
  initialState: INITIAL_STATE,
  reducers: {
    openModal: (state, { payload }: PayloadAction<IOpenModalPayload>) => {
      state.isOpen = true
      state.component = payload.component
      state.componentProps = payload.props

      if (payload.config) {
        state.modalConfig = payload.config
      } else {
        state.modalConfig = INITIAL_MODAL_CONFIG
      }

    },
    closeModal: (state) => {
      state.modalConfig = INITIAL_MODAL_CONFIG
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer