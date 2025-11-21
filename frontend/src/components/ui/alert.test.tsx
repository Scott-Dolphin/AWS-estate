import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from './alert'
import { AlertCircle } from 'lucide-react'

describe('Alert', () => {
    it('renders alert container', () => {
        render(<Alert>Alert content</Alert>)
        expect(screen.getByText('Alert content')).toBeInTheDocument()
    })

    it('renders with alert role', () => {
        const { container } = render(<Alert>Content</Alert>)
        const alert = container.querySelector('[role="alert"]')
        expect(alert).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<Alert>Test</Alert>)
        const alert = container.querySelector('[data-slot="alert"]')
        expect(alert).toBeInTheDocument()
    })

    it('applies default variant classes', () => {
        render(<Alert>Default Alert</Alert>)
        const alert = screen.getByText('Default Alert').closest('[data-slot="alert"]')
        expect(alert?.className).toContain('bg-card')
    })

    it('applies destructive variant', () => {
        render(<Alert variant="destructive">Error Alert</Alert>)
        const alert = screen.getByText('Error Alert').closest('[data-slot="alert"]')
        expect(alert?.className).toContain('text-destructive')
    })

    it('applies custom className', () => {
        render(<Alert className="custom-alert">Custom</Alert>)
        const alert = screen.getByText('Custom').closest('[data-slot="alert"]')
        expect(alert?.className).toContain('custom-alert')
    })
})

describe('AlertTitle', () => {
    it('renders alert title', () => {
        render(<AlertTitle>Alert Title</AlertTitle>)
        expect(screen.getByText('Alert Title')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<AlertTitle>Test</AlertTitle>)
        const title = container.querySelector('[data-slot="alert-title"]')
        expect(title).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<AlertTitle className="custom-title">Title</AlertTitle>)
        const title = screen.getByText('Title').closest('[data-slot="alert-title"]')
        expect(title?.className).toContain('custom-title')
    })

    it('applies font-medium styling', () => {
        render(<AlertTitle>Bold Title</AlertTitle>)
        const title = screen.getByText('Bold Title').closest('[data-slot="alert-title"]')
        expect(title?.className).toContain('font-medium')
    })
})

describe('AlertDescription', () => {
    it('renders alert description', () => {
        render(<AlertDescription>This is a description</AlertDescription>)
        expect(screen.getByText('This is a description')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<AlertDescription>Test</AlertDescription>)
        const description = container.querySelector('[data-slot="alert-description"]')
        expect(description).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<AlertDescription className="custom-desc">Description</AlertDescription>)
        const description = screen.getByText('Description').closest('[data-slot="alert-description"]')
        expect(description?.className).toContain('custom-desc')
    })
})

describe('Alert with nested components', () => {
    it('renders complete alert structure with icon', () => {
        const { container } = render(
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong</AlertDescription>
            </Alert>
        )

        expect(screen.getByText('Error')).toBeInTheDocument()
        expect(screen.getByText('Something went wrong')).toBeInTheDocument()

        const alert = container.querySelector('[role="alert"]')
        expect(alert?.className).toContain('text-destructive')
    })

    it('renders alert with title and description', () => {
        const { container } = render(
            <Alert>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>This is informational</AlertDescription>
            </Alert>
        )

        expect(screen.getByText('Information')).toBeInTheDocument()
        expect(screen.getByText('This is informational')).toBeInTheDocument()
    })
})
