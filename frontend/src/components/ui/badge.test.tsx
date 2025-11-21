import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './badge'

describe('Badge', () => {
    it('renders with text content', () => {
        render(<Badge>New</Badge>)
        expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('applies default variant classes', () => {
        render(<Badge>Default</Badge>)
        const badge = screen.getByText('Default')
        expect(badge.className).toContain('bg-primary')
        expect(badge.className).toContain('text-primary-foreground')
    })

    it('applies secondary variant', () => {
        render(<Badge variant="secondary">Secondary</Badge>)
        const badge = screen.getByText('Secondary')
        expect(badge.className).toContain('bg-secondary')
    })

    it('applies destructive variant', () => {
        render(<Badge variant="destructive">Delete</Badge>)
        const badge = screen.getByText('Delete')
        expect(badge.className).toContain('bg-destructive')
    })

    it('applies outline variant', () => {
        render(<Badge variant="outline">Outline</Badge>)
        const badge = screen.getByText('Outline')
        expect(badge.className).toContain('text-foreground')
    })

    it('renders as a span by default', () => {
        render(<Badge>Badge Text</Badge>)
        const badge = screen.getByText('Badge Text')
        expect(badge.tagName).toBe('SPAN')
    })

    it('applies custom className', () => {
        render(<Badge className="custom-badge">Custom</Badge>)
        const badge = screen.getByText('Custom')
        expect(badge.className).toContain('custom-badge')
    })

    it('accepts children as multiple elements', () => {
        render(<Badge>New <span>Feature</span></Badge>)
        expect(screen.getByText('New')).toBeInTheDocument()
        expect(screen.getByText('Feature')).toBeInTheDocument()
    })

    it('renders with data-slot attribute', () => {
        render(<Badge>Test</Badge>)
        const badge = screen.getByText('Test')
        expect(badge.getAttribute('data-slot')).toBe('badge')
    })
})
