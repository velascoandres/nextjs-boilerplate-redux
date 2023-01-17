import { render, screen } from '@testing-library/react'

import { Spinner } from '@/common/components/Spinner'

describe('<Spinner/> Tests', () => {
  describe('When renders', () => {
    it('should show spinner text', () => {
      render(<Spinner text="loading..." />)
        
      expect(screen.getByText('loading...')).toBeInTheDocument()
    })

    it('should not show spinner text', () => {
      render(<Spinner />)

      expect(screen.queryByText('loading...')).not.toBeInTheDocument()
    })
  })
})
