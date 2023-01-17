import { render, screen } from '@testing-library/react'

import { AuthGuard } from '@/features/auth/components/AuthGuard'
import * as authCheck from '@/features/auth/hooks/useAuthCheck'


const useAuthCheckMock = jest.spyOn(authCheck, 'useAuthCheck')

describe('<AuthGuard /> tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When is not allowed yet', () => {
    beforeEach(() => {
      useAuthCheckMock.mockReturnValue({ isAllowed: false })
    })
    
    it('should show a spinner', () => {
      render(<AuthGuard>Protected content</AuthGuard>)
      
      expect(screen.getByRole('note')).toBeInTheDocument()
    })
  })

  describe('When is allowed', () => {
    beforeEach(() => {
      useAuthCheckMock.mockReturnValue({ isAllowed: true })
    })

    it('should show a protected content', () => {
      render(<AuthGuard>Protected content</AuthGuard>)

      expect(screen.getByText('Protected content')).toBeInTheDocument()
    })
  })
})
