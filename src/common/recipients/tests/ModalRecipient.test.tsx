import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { 
  MOCK_STORE_WITH_CLOSE_MODAL, 
  MOCK_STORE_WITH_CONFIG, 
  MOCK_STORE_WITH_EMPTY_MODAL, 
  MOCK_STORE_WITH_OPEN_MODAL, 
  MOCK_STORE_WITH_UNKNOWN_MODAL 
} from '@/mocks/mock-constants/modals'
import { renderWithRedux } from '@/test-utils/renderWithRedux'

import { ModalRecipient } from '../ModalRecipient'

const MODAL_TEST = () => <div>Some test modal</div>

jest.mock('@/constants/modals', () => ({ MODALS: { MODAL_TEST } }))


describe('<ModalRecipient /> Tests', () => { 
  describe('When component renders', () => { 
    it('should show a modal', () => {
      renderWithRedux(<ModalRecipient />, { preloadedState: MOCK_STORE_WITH_OPEN_MODAL })

      expect(screen.getByText('Some test modal')).toBeInTheDocument()
    })

    
  })

  describe('When modal is close', () => { 
    it('should not show the modal is open flag is false', () => {
      renderWithRedux(<ModalRecipient />, { preloadedState: MOCK_STORE_WITH_CLOSE_MODAL })
    
      expect(screen.queryByText('Some test modal')).not.toBeInTheDocument()
    })
  })


  describe('When modal is open', () => { 
    describe('When modal does not exist', () => { 
      it('should show modal backdrop only (only one children)', () => {
        renderWithRedux(<ModalRecipient />, { preloadedState: MOCK_STORE_WITH_UNKNOWN_MODAL })
        
        expect(screen.queryByRole('modal-container', { hidden: true })?.childNodes).toHaveLength(1)
      })
    })
    
    describe('When modal is null', () => { 
      it('should show modal backdrop only (only one children)', () => {
        renderWithRedux(<ModalRecipient />, { preloadedState: MOCK_STORE_WITH_EMPTY_MODAL })
        
        expect(screen.queryByRole('modal-container', { hidden: true })?.childNodes).toHaveLength(1)
      })
    })
  })

  describe('When Escape key is pressed', () => { 
    it('should close the modal if has config from store', async () => {
      renderWithRedux(<ModalRecipient />, { preloadedState: MOCK_STORE_WITH_CONFIG })
            
      expect(screen.getByText('Some test modal')).toBeInTheDocument()
  
      await userEvent.keyboard('{Escape}')
  
      expect(screen.queryByText('Some test modal')).not.toBeInTheDocument()
    })

    it('should not close the modal if has not config from store', async () => {
      renderWithRedux(<ModalRecipient />, { preloadedState: MOCK_STORE_WITH_OPEN_MODAL })
            
      expect(screen.getByText('Some test modal')).toBeInTheDocument()
  
      await userEvent.keyboard('{Escape}')
    
      expect(screen.getByText('Some test modal')).toBeInTheDocument()
    })
  })
  
})