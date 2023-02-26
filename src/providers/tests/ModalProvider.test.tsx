import React from 'react'

import { fireEvent, render, screen } from '@testing-library/react'

import { IModalContext, ModalContext, ModalProvider } from '../ModalProvider'

const ModalTestComponent = () => <div />

const TestComponent = () => {
  const { state, closeModal, openModal } = React.useContext(ModalContext) as IModalContext

  const handleOpenModal = () => {
    openModal({
      component: ModalTestComponent,
      props: { propA: 'prop A' }
    })
  } 

  return (
    <div>
      {state.isOpen ? 'Modal is open' : 'Modal is closed'}
      {
        state.isOpen ?

          (<button onClick={closeModal}>Close modal</button>) :
          (<button onClick={handleOpenModal}>Open modal</button>)
      }
      <div>
        {state.componentProps?.propA as React.ReactNode}
      </div>
      <div>
        {state.component?.name}
      </div>
    </div>
  )
}

const renderWithProvider = (ui: React.ReactNode) => {
  return render(
    <ModalProvider>{ui}</ModalProvider>,
  )
}
  

describe('<ModalProvider /> tests', () => {


  test('should show "Open modal" button', () => {
    renderWithProvider(<TestComponent />)
  
    expect(screen.getByText('Open modal')).toBeInTheDocument()
  })
  
  test('should show "Close modal" button (toggle)', () => {
    renderWithProvider(<TestComponent />)
    
    fireEvent.click(screen.getByText('Open modal'))
  
    expect(screen.getByText('Close modal')).toBeInTheDocument()
  })

  test('should set component modal props', () => {
    renderWithProvider(<TestComponent />)

    fireEvent.click(screen.getByText('Open modal'))

  
    expect(screen.getByText('ModalTestComponent')).toBeInTheDocument()
    expect(screen.getByText('prop A')).toBeInTheDocument()
  })
})