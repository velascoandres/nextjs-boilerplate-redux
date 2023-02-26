import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '@/components/Button'

const onClickMock = jest.fn()

describe('<Button /> Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  describe('When component renders', () => {
    it('should show button text', () => {
      render(<Button onClick={onClickMock}>Click me</Button>)
      
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('should show button disabled', () => {
      render(<Button onClick={onClickMock} disabled>Click me</Button>)

      expect(screen.getByText('Click me')).toBeDisabled()
    })
  })

  describe('When click button', () => {
    it('should call onClick', async () => {
      render(<Button onClick={onClickMock}>Click me</Button>)

      await userEvent.click(screen.getByText('Click me'))

      expect(onClickMock).toBeCalled()
    })
    it('should not call  if disabled', async () => {
      render(<Button onClick={onClickMock} disabled>Click me</Button>)

      await userEvent.click(screen.getByText('Click me'))

      expect(onClickMock).not.toBeCalled()
    })
  })
})
