import React from 'react'

import { Button } from '@/common/components/Button'
import { Dialog } from '@/common/components/Dialog'
import { useModal } from '@/common/hooks/useModal'

interface IAlertModalProps {
    onSubmit: (confirm: boolean) => void
}

export const AlertModal: React.FC<IAlertModalProps> = (props) => {
  const { onSubmit } = props

  const { closeModal } = useModal()

  const getConfirmHandler = (confirm: boolean) => () => {
    onSubmit(confirm)
    closeModal()
  }

  return (
    <Dialog>
      <Dialog.Header title="Confirm action" />
      <Dialog.Body>
        <p className="p-2 text-center">
                    Do you want to confirm the action?
        </p>
      </Dialog.Body>
      <Dialog.Actions actionsAlignment="end">
        <Button
          colorType="danger"
          onClick={getConfirmHandler(true)}
        >
                    Confirm
        </Button>
        <Button
          colorType="secondary"
          variant="default"
          onClick={getConfirmHandler(false)}
        >
                    Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

