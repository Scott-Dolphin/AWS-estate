import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card', () => {
    it('renders card container', () => {
        render(<Card>Card Content</Card>)
        expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<Card>Test</Card>)
        const card = container.querySelector('[data-slot="card"]')
        expect(card).toBeInTheDocument()
    })

    it('applies custom className to card', () => {
        render(<Card className="custom-card">Content</Card>)
        const card = screen.getByText('Content').closest('[data-slot="card"]')
        expect(card?.className).toContain('custom-card')
    })
})

describe('CardHeader', () => {
    it('renders card header', () => {
        render(<CardHeader>Header Content</CardHeader>)
        expect(screen.getByText('Header Content')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<CardHeader>Test</CardHeader>)
        const header = container.querySelector('[data-slot="card-header"]')
        expect(header).toBeInTheDocument()
    })

    it('applies custom className to header', () => {
        render(<CardHeader className="custom-header">Content</CardHeader>)
        const header = screen.getByText('Content').closest('[data-slot="card-header"]')
        expect(header?.className).toContain('custom-header')
    })
})

describe('CardTitle', () => {
    it('renders as h4 element', () => {
        render(<CardTitle>My Title</CardTitle>)
        const title = screen.getByText('My Title')
        expect(title.tagName).toBe('H4')
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<CardTitle>Test</CardTitle>)
        const title = container.querySelector('[data-slot="card-title"]')
        expect(title).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<CardTitle className="custom-title">Title</CardTitle>)
        const title = screen.getByText('Title').closest('[data-slot="card-title"]')
        expect(title?.className).toContain('custom-title')
    })
})

describe('CardDescription', () => {
    it('renders card description', () => {
        render(<CardDescription>This is a description</CardDescription>)
        expect(screen.getByText('This is a description')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<CardDescription>Test</CardDescription>)
        const description = container.querySelector('[data-slot="card-description"]')
        expect(description).toBeInTheDocument()
    })

    it('applies text-muted-foreground class', () => {
        render(<CardDescription>Muted text</CardDescription>)
        const description = screen.getByText('Muted text').closest('[data-slot="card-description"]')
        expect(description?.className).toContain('text-muted-foreground')
    })
})

describe('CardContent', () => {
    it('renders card content', () => {
        render(<CardContent>Main content here</CardContent>)
        expect(screen.getByText('Main content here')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<CardContent>Test</CardContent>)
        const content = container.querySelector('[data-slot="card-content"]')
        expect(content).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<CardContent className="custom-content">Content</CardContent>)
        const content = screen.getByText('Content').closest('[data-slot="card-content"]')
        expect(content?.className).toContain('custom-content')
    })
})

describe('CardFooter', () => {
    it('renders card footer', () => {
        render(<CardFooter>Footer content</CardFooter>)
        expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('renders with correct data-slot attribute', () => {
        const { container } = render(<CardFooter>Test</CardFooter>)
        const footer = container.querySelector('[data-slot="card-footer"]')
        expect(footer).toBeInTheDocument()
    })

    it('applies flex layout classes', () => {
        render(<CardFooter>Footer</CardFooter>)
        const footer = screen.getByText('Footer').closest('[data-slot="card-footer"]')
        expect(footer?.className).toContain('flex')
    })
})

describe('Card with nested components', () => {
    it('renders complete card structure', () => {
        const { container } = render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                </CardHeader>
                <CardContent>Main content</CardContent>
                <CardFooter>Footer content</CardFooter>
            </Card>
        )

        expect(screen.getByText('Card Title')).toBeInTheDocument()
        expect(screen.getByText('Card description text')).toBeInTheDocument()
        expect(screen.getByText('Main content')).toBeInTheDocument()
        expect(screen.getByText('Footer content')).toBeInTheDocument()

        const card = container.querySelector('[data-slot="card"]')
        expect(card).toBeInTheDocument()
    })
})
