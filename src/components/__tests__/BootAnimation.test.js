import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BootAnimation from '../BootAnimation.vue'

const stubMatchMedia = (reduced) => {
  vi.stubGlobal('matchMedia', vi.fn((query) => ({
    matches: reduced,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
}

beforeEach(() => {
  stubMatchMedia(false)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('BootAnimation skip / accessibility', () => {
  it('renders a skip control', () => {
    const wrapper = mount(BootAnimation, { props: { onComplete: vi.fn() } })
    const skip = wrapper.find('[data-testid="boot-skip"]')
    expect(skip.exists()).toBe(true)
  })

  it('calls onComplete when the skip control is clicked', async () => {
    const onComplete = vi.fn()
    const wrapper = mount(BootAnimation, { props: { onComplete } })

    await wrapper.get('[data-testid="boot-skip"]').trigger('click')

    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('calls onComplete when Enter is pressed', async () => {
    const onComplete = vi.fn()
    mount(BootAnimation, { props: { onComplete }, attachTo: document.body })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await Promise.resolve()

    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('auto-skips immediately when the user prefers reduced motion', () => {
    stubMatchMedia(true)
    const onComplete = vi.fn()
    mount(BootAnimation, { props: { onComplete } })

    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
