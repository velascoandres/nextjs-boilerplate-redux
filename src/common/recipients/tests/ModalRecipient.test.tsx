import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { IModalContext } from '@/common/providers/ModalProvider'
import { renderWithModalContext } from '@/test-utils/renderWithModalContext'

import { ModalRecipient } from '../ModalRecipient'

const TestModalComponent = () => <div>Some test modal</div>

const BASE_MODAL_CONTEXT: Partial<IModalContext> = { 
  state: { 
    component: TestModalComponent, 
    isOpen: true, 
    modalConfig: {
      closeOnClickOutside: false,
      closeOnEscapeKeydown: false,
    } 
  }
}

const EMPTY_MODAL_CONTEXT: Partial<IModalContext> = {
  state: {
    isOpen: true,
    modalConfig: {
      closeOnClickOutside: false,
      closeOnEscapeKeydown: false,
    } 
  },
}

const MODAL_CONFIG_WITH_CONFIG: Partial<IModalContext> = {
  state: {
    component: TestModalComponent, 
    isOpen: true,
    modalConfig: {
      closeOnClickOutside: false,
      closeOnEscapeKeydown: true,
    } 
  },
}

describe('<ModalRecipient /> Tests', () => { 
  describe('When component renders', () => { 
    test('should show a modal', () => {
      renderWithModalContext(<ModalRecipient />, BASE_MODAL_CONTEXT)

      expect(screen.getByText('Some test modal')).toBeInTheDocument()
    })
  })

  describe('When modal is close', () => { 
    test('should not show the modal is open flag is false from context', () => {
      renderWithModalContext(<ModalRecipient />, EMPTY_MODAL_CONTEXT)
    
      expect(screen.queryByText('Some test modal')).not.toBeInTheDocument()
    })
  })


  describe('When modal is open', () => { 
    describe('When modal does not exist', () => { 
      test('should show modal backdrop only (only one children)', () => {
        renderWithModalContext(<ModalRecipient />, EMPTY_MODAL_CONTEXT)
        
        expect(screen.queryByRole('modal-container', { hidden: true })?.childNodes).toHaveLength(1)
      })
    })
  })

  describe('When Escape key is pressed', () => { 
    const closeModalMock = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should call "closeModal" method if has config from context', async () => {

      renderWithModalContext(<ModalRecipient />, {
        ...MODAL_CONFIG_WITH_CONFIG,
        closeModal: closeModalMock,
      })
            
      expect(screen.getByText('Some test modal')).toBeInTheDocument()

      await userEvent.keyboard('{Escape}')

      expect(closeModalMock).toHaveBeenCalled()
    })

    test('should not call "closeModal" method if has not config from context', async () => {
      renderWithModalContext(<ModalRecipient />, {
        ...BASE_MODAL_CONTEXT,
        closeModal: closeModalMock,
      })
            
      expect(screen.getByText('Some test modal')).toBeInTheDocument()
  
      await userEvent.keyboard('{Escape}')
    
      expect(closeModalMock).not.toHaveBeenCalled()
    })
  })
  
})