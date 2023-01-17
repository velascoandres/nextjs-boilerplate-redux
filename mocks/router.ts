import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { useRouter } from 'next/navigation'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const useRouterMock = useRouter as jest.Mock<Partial<AppRouterInstance>>

const mockResult = (router: Partial<AppRouterInstance>) => {
  useRouterMock.mockClear()

  useRouterMock.mockReturnValue({
    push: jest.fn(),
    ...router,
  })
}


export const useRouterMocked = {
  mockResult
}
