import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import * as router from 'next/navigation'
import { } from 'next/navigation'

import { fireEvent, screen, waitFor } from '@testing-library/react'

import { Navbar } from '@/common/components/Navbar'
import * as authSlice from '@/common/slices/authSlice'
import { IRootState } from '@/store/store'
import { renderWithRedux } from '@/test-utils/renderWithRedux'

jest.spyOn(authSlice, 'logout')

const mockState = {
  auth: {
    user: {
      id: 1,
      firstname: 'John',
      lastname: 'Peterson',
      email: 'john.peterson@mail.com'
    },
  },
} as IRootState

describe('Navbar tests', () => {
  const pushMock = jest.fn()
  const useRouterMock = jest.spyOn(router, 'useRouter')

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => ({ push: pushMock } as unknown as AppRouterInstance))
  })
  
  describe('when render', () => {
    it('should show a user avatar', () => {
      renderWithRedux(<Navbar />, { preloadedState: mockState })

      expect(screen.getByText('JP')).toBeDefined()
    })
  })

  describe('When toggle user avatar', () => {
    it('should show user menu options', () => {
      renderWithRedux(<Navbar />, { preloadedState: mockState })

      const userAvatar = screen.getByText('JP')

      fireEvent.click(userAvatar)

      expect(screen.getByText('Your Profile')).toBeTruthy()
      expect(screen.getByText('Sign out')).toBeTruthy()
    })

    it('should show toggle user options', async () => {
      renderWithRedux(<Navbar />, { preloadedState: mockState })

      const userAvatar = screen.getByText('JP')
      const totalItems = 2
      const noItems = 2

      fireEvent.click(userAvatar)
      expect(screen.queryAllByRole('menuitem')).toHaveLength(totalItems)

      fireEvent.click(document)

      await waitFor(() => {
        expect(screen.queryAllByRole('menuitem')).toHaveLength(noItems)
      })
    })
  })

  describe('When a menu option is clicked', () => {
    it('should call navigate router function to profile page', () => {
      renderWithRedux(<Navbar />, { preloadedState: mockState })

      const userAvatar = screen.getByText('JP')

      fireEvent.click(userAvatar)
      fireEvent.click(screen.getByText('Your Profile'))

      expect(pushMock).toBeCalledWith('/profile')
    })

    it('should call logout action', () => {
      renderWithRedux(<Navbar />, { preloadedState: mockState })

      const userAvatar = screen.getByText('JP')

      fireEvent.click(userAvatar)
      fireEvent.click(screen.getByText('Sign out'))

      expect(authSlice.logout).toHaveBeenCalled()
    })
  })
})
