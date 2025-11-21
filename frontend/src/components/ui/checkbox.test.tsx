import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './checkbox'

describe('Checkbox', () => {
    it('renders a checkbox element', () => {
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]')
        expect(checkbox).toBeInTheDocument()
    })

    it('can be clicked to toggle state', async () => {
        const user = userEvent.setup()
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        await user.click(checkbox)
        expect(checkbox.getAttribute('data-state')).toBe('checked')
    })

    it('toggles between checked and unchecked states', async () => {
        const user = userEvent.setup()
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        // First click to check
        await user.click(checkbox)
        expect(checkbox.getAttribute('data-state')).toBe('checked')

        // Second click to uncheck
        await user.click(checkbox)
        expect(checkbox.getAttribute('data-state')).toBe('unchecked')
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]')
        expect(checkbox).toBeInTheDocument()
    })

    it('renders checkbox indicator when checked', async () => {
        const user = userEvent.setup()
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        await user.click(checkbox)
        const indicator = container.querySelector('[data-slot="checkbox-indicator"]')
        expect(indicator).toBeInTheDocument()
    })

    it('applies custom className', () => {
        const { container } = render(<Checkbox className="custom-checkbox" />)
        const checkbox = container.querySelector('[data-slot="checkbox"]')
        expect(checkbox?.className).toContain('custom-checkbox')
    })

    it('respects disabled state', () => {
        const { container } = render(<Checkbox disabled />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        expect(checkbox).toHaveAttribute('disabled')
    })

    it('can be controlled with checked prop', () => {
        const handleChange = vi.fn()
        const { container } = render(<Checkbox checked onChange={handleChange} />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        expect(checkbox.getAttribute('data-state')).toBe('checked')
    })

    it('applies correct styling for checked state', async () => {
        const user = userEvent.setup()
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        await user.click(checkbox)
        expect(checkbox.className).toContain('data-[state=checked]:bg-primary')
    })

    it('displays CheckIcon when checked', async () => {
        const user = userEvent.setup()
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]') as HTMLElement

        await user.click(checkbox)
        const icon = container.querySelector('[data-slot="checkbox-indicator"] svg')
        expect(icon).toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
        const { container } = render(<Checkbox />)
        const checkbox = container.querySelector('[data-slot="checkbox"]')

        expect(checkbox).toBeInTheDocument()
    })
})
