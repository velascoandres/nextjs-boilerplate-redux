import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import * as router from 'next/navigation'

import { fireEvent, render, screen } from '@testing-library/react'

import { Sidebar } from '@/common/components/Sidebar'

describe('<Sidebar  /> Tests', () => {
  const pushMock = jest.fn()
  const useRouterMock = jest.spyOn(router, 'useRouter')
  const usePathnameMock = jest.spyOn(router, 'usePathname')
  
  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => ({ 
      push: pushMock,
      pathname: '/'
    } as unknown as AppRouterInstance))
  })
  
  describe('When render', () => {
    test('should show sidebar items', () => {
      render(
        <Sidebar>
          <Sidebar.Item
            icon="some-icon" 
            label="Route 1" 
            pathname="/route-1"
          />
          <Sidebar.Item label="Route 2" pathname="/route-2" />
        </Sidebar>
      )

      expect(screen.getByText('Route 1')).toBeInTheDocument()
      expect(screen.getByText('Route 2')).toBeInTheDocument()
    })
  })

  describe('When click on item', () => {
    test('should call push to route', () => {
      render(
        <Sidebar isHidden>
          <Sidebar.Item label="Route 1" pathname="/route-1" />
        </Sidebar>
      )

      fireEvent.click(screen.getByText('Route 1'))

      expect(pushMock).toHaveBeenCalledWith('/route-1')
    })

    test('should not call push to route if current route is the same', () => {
      usePathnameMock.mockReturnValue('/route-2')

      render(
        <Sidebar >
          <Sidebar.Item label="Route 2" pathname="/route-2" />
        </Sidebar>
      )
  
      fireEvent.click(screen.getByText('Route 2'))
  
      expect(pushMock).not.toHaveBeenCalledWith('/route-2')
    })
  })
})