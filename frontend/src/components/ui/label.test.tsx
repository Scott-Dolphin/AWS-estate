import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './label'

describe('Label', () => {
    it('renders a label element', () => {
        render(<Label>Label Text</Label>)
        const label = screen.getByText('Label Text')
        expect(label.tagName).toBe('LABEL')
    })

    it('displays text content', () => {
        render(<Label>Email Address</Label>)
        expect(screen.getByText('Email Address')).toBeInTheDocument()
    })

    it('can be associated with an input via htmlFor', () => {
        render(
            <>
                <Label htmlFor="email">Email</Label>
                <input id="email" type="email" />
            </>
        )
        const label = screen.getByText('Email')
        expect(label.getAttribute('for')).toBe('email')
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<Label>Test</Label>)
        const label = container.querySelector('[data-slot="label"]')
        expect(label).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<Label className="custom-label">Custom</Label>)
        const label = screen.getByText('Custom')
        expect(label.className).toContain('custom-label')
    })

    it('applies default styling classes', () => {
        render(<Label>Styled</Label>)
        const label = screen.getByText('Styled')
        expect(label.className).toContain('text-sm')
        expect(label.className).toContain('font-medium')
    })

    it('renders with multiple children', () => {
        render(
            <Label>
                <span>Required</span>
                <span>*</span>
            </Label>
        )
        expect(screen.getByText('Required')).toBeInTheDocument()
        expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('forwards custom attributes', () => {
        const { container } = render(
            <Label id="custom-id" data-testid="test-label">
                Test Label
            </Label>
        )
        const label = screen.getByTestId('test-label')
        expect(label.id).toBe('custom-id')
    })
})
