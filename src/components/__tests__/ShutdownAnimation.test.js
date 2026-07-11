import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ShutdownAnimation from '../ShutdownAnimation.vue'

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

// Advance through the staged shutdown sequence until the final stage renders.
const advanceToFinalStage = async (wrapper) => {
  await vi.advanceTimersByTimeAsync(6000)
  await wrapper.vm.$nextTick()
}

describe('ShutdownAnimation power-on', () => {
  it('shows a Power On control at the final stage', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ShutdownAnimation, { props: { onComplete: vi.fn() } })

    await advanceToFinalStage(wrapper)

    expect(wrapper.find('[data-testid="power-on"]').exists()).toBe(true)
  })

  it('reloads the page when Power On is clicked', async () => {
    vi.useFakeTimers()
    const reload = vi.fn()
    // jsdom's location.reload is non-configurable, so replace the whole object.
    vi.stubGlobal('location', { ...window.location, reload })

    const wrapper = mount(ShutdownAnimation, { props: { onComplete: vi.fn() } })
    await advanceToFinalStage(wrapper)

    await wrapper.get('[data-testid="power-on"]').trigger('click')

    expect(reload).toHaveBeenCalledTimes(1)
  })
})
