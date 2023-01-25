import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PasswordField } from '@/common/components/PasswordField'

describe('<PasswordField/> tests', () => { 
  describe('When component renders', () => { 
    test('should show a password hidden', () => {
      render(<PasswordField onChange={jest.fn()} value="password-1" />)

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password')
    })
  })

  describe('When component toggle', () => { 
    test('should to be password input', async () => {
      render(<PasswordField onChange={jest.fn()} value="password-1" />)

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password')
      
      await userEvent.click(screen.getByRole('button', { hidden: true }))

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })
  })
})