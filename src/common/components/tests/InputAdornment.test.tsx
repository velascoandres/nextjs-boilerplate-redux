import { render, screen } from '@testing-library/react'

import { InputAdornment } from '@/common/components/InputAdornment'

describe('<InputAdorment /> Tests', () => {
  describe('When render component', () => {
    it('should show adornment child', () => {
      render(<InputAdornment position="end">$</InputAdornment>)
    
      expect(screen.getByText('$')).toBeInTheDocument()
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('should return null if children is not set', () => {
      render(<InputAdornment position="start" />)

      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })
})
