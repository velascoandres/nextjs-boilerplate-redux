import { render, screen } from '@testing-library/react'

import { NavLink } from '@/components/NavLink'

describe('<NavLink /> Tests', () => {
  describe('When component renders', () => {
    it('should show nav title', () => {
      render(<NavLink title="title" href="/" />)
    
      expect(screen.getByText('title')).toBeInTheDocument()
    })
  })
})
