'use client'

import { Button } from '@/common/components/Button'
import { useModal } from '@/common/hooks/useModal'
import { AlertModal } from '@/common/modals/AlertModal'

export default function Dashboard() {
  const { openModal } = useModal()

  const handleOpenModal = () => {
    openModal({
      component: AlertModal,
      props: {
        onSubmit: () => null
      }
    })
  }
  
  const handleOpenConfigModal = () => {
    openModal({
      component: AlertModal,
      config: {
        closeOnClickOutside: true,
        closeOnEscapeKeydown: true,
      },
      props: {
        onSubmit: () => null
      }
    })
  }

  return (
    <main className="bg-slate-300">
      <section>
        <div className="w-4 caret-slate-900">
          Container
          <Button onClick={handleOpenModal}>Open modal</Button>
          <Button onClick={handleOpenConfigModal}>Open modal config</Button>
        </div>
      </section>
    </main>
  )
}
