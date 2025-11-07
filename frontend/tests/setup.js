// tests/setup.js

import '@testing-library/jest-dom'
import { expect, vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Automatically unmount and clean up DOM after each test
afterEach(() => {
  cleanup()
})

// Optional: mock any globals if needed
vi.stubGlobal('matchMedia', (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false
}))

// Extend expect with jest-dom assertions
expect.extend({
  ...require('@testing-library/jest-dom/matchers')
})

