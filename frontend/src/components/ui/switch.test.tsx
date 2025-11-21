import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Switch } from './switch'

describe('Switch', () => {
    it('renders a switch element', () => {
        const { container } = render(<Switch />)
        const switchElement = container.querySelector('[data-slot="switch"]')
        expect(switchElement).toBeInTheDocument()
    })

    it('renders switch thumb', () => {
        const { container } = render(<Switch />)
        const thumb = container.querySelector('[data-slot="switch-thumb"]')
        expect(thumb).toBeInTheDocument()
    })

    it('toggles between checked and unchecked states', async () => {
        const user = userEvent.setup()
        const { container } = render(<Switch />)
        const switchElement = container.querySelector('[data-slot="switch"]') as HTMLElement

        expect(switchElement.getAttribute('data-state')).toBe('unchecked')

        await user.click(switchElement)
        expect(switchElement.getAttribute('data-state')).toBe('checked')

        await user.click(switchElement)
        expect(switchElement.getAttribute('data-state')).toBe('unchecked')
    })

    it('applies checked styling', async () => {
        const user = userEvent.setup()
        const { container } = render(<Switch />)
        const switchElement = container.querySelector('[data-slot="switch"]') as HTMLElement

        await user.click(switchElement)
        expect(switchElement.className).toContain('data-[state=checked]:bg-primary')
    })

    it('applies unchecked styling', () => {
        const { container } = render(<Switch />)
        const switchElement = container.querySelector('[data-slot="switch"]') as HTMLElement

        expect(switchElement.className).toContain('data-[state=unchecked]:bg-switch-background')
    })

    it('respects disabled state', () => {
        const { container } = render(<Switch disabled />)
        const switchElement = container.querySelector('[data-slot="switch"]') as HTMLElement

        expect(switchElement).toHaveAttribute('disabled')
    })

    it('applies custom className', () => {
        const { container } = render(<Switch className="custom-switch" />)
        const switchElement = container.querySelector('[data-slot="switch"]')
        expect(switchElement?.className).toContain('custom-switch')
    })

    it('thumb moves on toggle', async () => {
        const user = userEvent.setup()
        const { container } = render(<Switch />)
        const switchElement = container.querySelector('[data-slot="switch"]') as HTMLElement
        const thumb = container.querySelector('[data-slot="switch-thumb"]')

        expect(thumb?.className).toContain('data-[state=unchecked]:translate-x-0')

        await user.click(switchElement)
        expect(thumb?.className).toContain('data-[state=checked]:translate-x')
    })

    it('can be controlled with checked prop', () => {
        const { container } = render(<Switch checked />)
        const switchElement = container.querySelector('[data-slot="switch"]')

        expect(switchElement?.getAttribute('data-state')).toBe('checked')
    })

    it('renders correctly with custom attributes', () => {
        const { container } = render(<Switch id="test-switch" data-testid="test-switch" />)
        const switchElement = screen.getByTestId('test-switch')

        expect(switchElement.id).toBe('test-switch')
        expect(switchElement).toBeInTheDocument()
    })
})
