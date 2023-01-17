import { render, screen } from '@testing-library/react'

import { Avatar } from '../Avatar'

describe('Avatar Tests', () => {
  describe('When renders', () => {
    it('should show initials', () => {
      render(<Avatar firstname="bob" lastname="Doe" />)

      expect(screen.getByText('BD')).toBeInTheDocument()
    })
  })
})
