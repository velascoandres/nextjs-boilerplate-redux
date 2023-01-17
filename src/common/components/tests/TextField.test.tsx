import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextField } from '@/common/components/TextField'

const onChangeMock = jest.fn()

describe('<NavLink /> Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When component renders', () => {
    it('should display a placeholder', () => {
      render(
        <TextField
          placeholder="write text"
          onChange={onChangeMock}
        />
      )

      expect(screen.getByPlaceholderText('write text')).toBeInTheDocument()
    })
    it('should display a value', () => {
      render(
        <TextField
          value="text value"
          onChange={onChangeMock}
        />
      )

      expect(screen.getByDisplayValue('text value')).toBeInTheDocument()
    })
  })

  describe('When renders with valid prop', () => {
    it('should display a valid helper text', () => {
      render(
        <TextField
          valid
          validText="field is valid"
          errorText="field is invalid"
          onChange={onChangeMock}
        />
      )

      expect(screen.getByText('field is valid')).toBeInTheDocument()
      expect(screen.queryByText('field is invalid')).not.toBeInTheDocument()
    })
    it('should not display a valid helper text', () => {
      render(
        <TextField
          valid={false}
          validText="field is valid"
          errorText="field is invalid"
          onChange={onChangeMock}
        />
      )

      expect(screen.queryByText('field is valid')).not.toBeInTheDocument()
      expect(screen.getByText('field is invalid')).toBeInTheDocument()
    })
  })

  describe('When text field changes', () => {
    it('should call on change', async () => {
      render(
        <TextField
          placeholder="placeholder text"
          onChange={onChangeMock}
        />
      )
      
      await userEvent.type(screen.getByPlaceholderText('placeholder text'), 'another text')

      expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({
          value: 'another text'
        })
      }))
    })
  })

  describe('When render with adornments', () => {
    it('should show adornments', () => {
      render(
        <TextField
          onChange={onChangeMock}
          startAdornment="%"
          endAdornment="$"
        />
      )

      expect(screen.getByText('%')).toBeInTheDocument()
      expect(screen.getByText('$')).toBeInTheDocument()
    })
  })
})
