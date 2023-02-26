'use client'


import React from 'react'

import { IModalContext, ModalContext } from '../providers/ModalProvider'


export const useModal = () => React.useContext(ModalContext) as IModalContext