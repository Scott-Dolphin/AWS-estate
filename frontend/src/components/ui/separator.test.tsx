import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Separator } from './separator'

describe('Separator', () => {
    it('renders a separator element', () => {
        const { container } = render(<Separator />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator).toBeInTheDocument()
    })

    it('renders horizontal separator by default', () => {
        const { container } = render(<Separator />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.getAttribute('data-orientation')).toBe('horizontal')
    })

    it('renders vertical separator when orientation is vertical', () => {
        const { container } = render(<Separator orientation="vertical" />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.getAttribute('data-orientation')).toBe('vertical')
    })

    it('applies horizontal styling', () => {
        const { container } = render(<Separator />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.className).toContain('data-[orientation=horizontal]:h-px')
        expect(separator?.className).toContain('data-[orientation=horizontal]:w-full')
    })

    it('applies vertical styling', () => {
        const { container } = render(<Separator orientation="vertical" />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.className).toContain('data-[orientation=vertical]:h-full')
        expect(separator?.className).toContain('data-[orientation=vertical]:w-px')
    })

    it('is decorative by default', () => {
        const { container } = render(<Separator />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        // Decorative separators have aria-hidden="true"
        expect(separator?.getAttribute('aria-orientation')).toBeNull()
    })

    it('renders non-decorative separator', () => {
        const { container } = render(<Separator decorative={false} />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        // Non-decorative separators render with proper role
        expect(separator?.getAttribute('role')).toBe('separator')
    })

    it('applies border styling', () => {
        const { container } = render(<Separator />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.className).toContain('bg-border')
    })

    it('applies shrink-0 class', () => {
        const { container } = render(<Separator />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.className).toContain('shrink-0')
    })

    it('applies custom className', () => {
        const { container } = render(<Separator className="custom-separator" />)
        const separator = container.querySelector('[data-slot="separator-root"]')
        expect(separator?.className).toContain('custom-separator')
    })

    it('forwards custom attributes', () => {
        const { container } = render(
            <Separator id="custom-id" data-testid="test-separator" />
        )
        const separator = screen.getByTestId('test-separator')
        expect(separator.id).toBe('custom-id')
    })
})
