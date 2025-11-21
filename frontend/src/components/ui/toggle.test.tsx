import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from './toggle'
import { Bold } from 'lucide-react'

describe('Toggle', () => {
    it('renders a button element', () => {
        render(<Toggle>Bold</Toggle>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('renders with children', () => {
        render(<Toggle><Bold className="h-4 w-4" /></Toggle>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('toggles pressed state on click', async () => {
        const user = userEvent.setup()
        const { container } = render(<Toggle>Click me</Toggle>)
        const toggle = screen.getByRole('button')

        expect(toggle.getAttribute('data-state')).toBe('off')

        await user.click(toggle)
        expect(toggle.getAttribute('data-state')).toBe('on')

        await user.click(toggle)
        expect(toggle.getAttribute('data-state')).toBe('off')
    })

    it('applies default variant', () => {
        render(<Toggle variant="default">Default</Toggle>)
        const toggle = screen.getByRole('button')
        expect(toggle.className).toContain('bg-transparent')
    })

    it('applies outline variant', () => {
        render(<Toggle variant="outline">Outline</Toggle>)
        const toggle = screen.getByRole('button')
        expect(toggle.className).toContain('border')
    })

    it('applies size variants', () => {
        const { rerender } = render(<Toggle size="sm">Small</Toggle>)
        let toggle = screen.getByRole('button')
        expect(toggle.className).toContain('h-8')

        rerender(<Toggle size="lg">Large</Toggle>)
        toggle = screen.getByRole('button')
        expect(toggle.className).toContain('h-10')
    })

    it('respects disabled state', async () => {
        const user = userEvent.setup()
        render(<Toggle disabled>Disabled</Toggle>)
        const toggle = screen.getByRole('button')

        expect(toggle).toHaveAttribute('disabled')
        await user.click(toggle)
        expect(toggle.getAttribute('data-state')).toBe('off')
    })

    it('applies accent styling when pressed', async () => {
        const user = userEvent.setup()
        render(<Toggle>Toggle</Toggle>)
        const toggle = screen.getByRole('button')

        await user.click(toggle)
        expect(toggle.className).toContain('data-[state=on]:bg-accent')
    })

    it('applies custom className', () => {
        render(<Toggle className="custom-toggle">Custom</Toggle>)
        const toggle = screen.getByRole('button')
        expect(toggle.className).toContain('custom-toggle')
    })
})
