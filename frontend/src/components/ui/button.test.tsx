import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders with default text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('applies the correct variant and size classes', () => {
    render(<Button variant="destructive" size="lg">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button.className).toContain('bg-destructive')
    expect(button.className).toContain('h-10')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Press</Button>)
    fireEvent.click(screen.getByText('Press'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as a different element when asChild is true', () => {
    const CustomButton = (props: any) => <a {...props} href="#" />
    render(
      <Button asChild>
        <CustomButton>Link</CustomButton>
      </Button>
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})

