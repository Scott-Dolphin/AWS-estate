import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input', () => {
    it('renders an input element', () => {
        render(<Input />)
        const input = screen.getByRole('textbox') as HTMLInputElement
        expect(input).toBeInTheDocument()
    })

    it('accepts and displays placeholder text', () => {
        render(<Input placeholder="Enter text" />)
        const input = screen.getByPlaceholderText('Enter text')
        expect(input).toBeInTheDocument()
    })

    it('sets the correct type attribute', () => {
        render(<Input type="email" />)
        const input = screen.getByRole('textbox') as HTMLInputElement
        expect(input.type).toBe('email')
    })

    it('allows typing text into the input', async () => {
        const user = userEvent.setup()
        render(<Input />)
        const input = screen.getByRole('textbox') as HTMLInputElement

        await user.type(input, 'Hello World')
        expect(input.value).toBe('Hello World')
    })

    it('respects disabled attribute', () => {
        render(<Input disabled />)
        const input = screen.getByRole('textbox') as HTMLInputElement
        expect(input).toBeDisabled()
    })

    it('handles different input types', () => {
        const { container } = render(<Input type="password" />)
        let input = container.querySelector('input') as HTMLInputElement
        expect(input.type).toBe('password')

        const { container: container2 } = render(<Input type="email" />)
        input = container2.querySelector('input') as HTMLInputElement
        expect(input.type).toBe('email')
    })

    it('applies custom className', () => {
        render(<Input className="custom-class" />)
        const input = screen.getByRole('textbox')
        expect(input.className).toContain('custom-class')
    })

    it('renders correctly with custom attributes', () => {
        const { container } = render(<Input id="test-input" data-testid="test-input" />)
        const input = screen.getByTestId('test-input')

        expect(input.id).toBe('test-input')
        expect(input).toBeInTheDocument()
    })

    it('handles value prop and change events', async () => {
        const user = userEvent.setup()
        const handleChange = vi.fn()
        render(<Input value="test" onChange={handleChange} />)

        const input = screen.getByRole('textbox') as HTMLInputElement
        await user.type(input, 'a')
        expect(handleChange).toHaveBeenCalled()
    })
})
