import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
    it('renders a skeleton element', () => {
        const { container } = render(<Skeleton />)
        const skeleton = container.querySelector('[data-slot="skeleton"]')
        expect(skeleton).toBeInTheDocument()
    })

    it('renders as a div element', () => {
        const { container } = render(<Skeleton />)
        const skeleton = container.querySelector('[data-slot="skeleton"]')
        expect(skeleton?.tagName).toBe('DIV')
    })

    it('applies default skeleton styling', () => {
        const { container } = render(<Skeleton />)
        const skeleton = container.querySelector('[data-slot="skeleton"]')
        expect(skeleton?.className).toContain('bg-accent')
        expect(skeleton?.className).toContain('animate-pulse')
        expect(skeleton?.className).toContain('rounded-md')
    })

    it('applies custom className', () => {
        const { container } = render(<Skeleton className="custom-skeleton h-12 w-12" />)
        const skeleton = container.querySelector('[data-slot="skeleton"]')
        expect(skeleton?.className).toContain('custom-skeleton')
        expect(skeleton?.className).toContain('h-12')
        expect(skeleton?.className).toContain('w-12')
    })

    it('merges custom classes with default classes', () => {
        const { container } = render(<Skeleton className="w-full h-4" />)
        const skeleton = container.querySelector('[data-slot="skeleton"]')

        // Should have both default and custom classes
        expect(skeleton?.className).toContain('bg-accent')
        expect(skeleton?.className).toContain('animate-pulse')
        expect(skeleton?.className).toContain('w-full')
        expect(skeleton?.className).toContain('h-4')
    })

    it('forwards custom attributes', () => {
        const { container } = render(<Skeleton id="test-skeleton" data-testid="skeleton" />)
        const skeleton = screen.getByTestId('skeleton')

        expect(skeleton.id).toBe('test-skeleton')
        expect(skeleton.getAttribute('data-slot')).toBe('skeleton')
    })

    it('can be used for loading states', () => {
        const { container } = render(
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        )

        const skeletons = container.querySelectorAll('[data-slot="skeleton"]')
        expect(skeletons).toHaveLength(3)

        skeletons.forEach((skeleton) => {
            expect(skeleton.className).toContain('animate-pulse')
        })
    })
})
