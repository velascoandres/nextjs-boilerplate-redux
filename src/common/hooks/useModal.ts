'use client'

import React from 'react'
import { useDispatch } from 'react-redux'

import type { IOpenModalPayload } from '@/common/slices/modalSlice'
import { closeModal as closeModalAction, openModal as openModalAction } from '@/common/slices/modalSlice'

interface IUseModalResult {
    openModal: (args: IOpenModalPayload) => void
    closeModal: () => void
}

export const useModal = (): IUseModalResult => {
  const dispatch = useDispatch()

  const openModal = React.useCallback((args: IOpenModalPayload) => {
    dispatch(openModalAction(args))
  }, [dispatch])

  const closeModal = React.useCallback(() => {
    dispatch(closeModalAction({}))
  }, [dispatch])


  return {
    openModal,
    closeModal
  }
}