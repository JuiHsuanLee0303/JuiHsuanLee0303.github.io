import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import Navbar from '../Navbar.vue'

const buildRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', name: 'catch', component: { template: '<div />' } }],
  })

const mountNavbar = async (shutdown) => {
  const router = buildRouter()
  await router.push('/')
  await router.isReady()

  return mount(Navbar, {
    global: {
      plugins: [router],
      provide: { shutdown },
    },
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Navbar shutdown confirmation', () => {
  it('does NOT trigger shutdown when the user cancels the confirm dialog', async () => {
    vi.stubGlobal('confirm', vi.fn(() => false))
    const shutdown = vi.fn()
    const wrapper = await mountNavbar(shutdown)

    await wrapper.get('button[title="Shutdown"]').trigger('click')

    expect(window.confirm).toHaveBeenCalled()
    expect(shutdown).not.toHaveBeenCalled()
  })

  it('triggers shutdown when the user confirms', async () => {
    vi.stubGlobal('confirm', vi.fn(() => true))
    const shutdown = vi.fn()
    const wrapper = await mountNavbar(shutdown)

    await wrapper.get('button[title="Shutdown"]').trigger('click')

    expect(shutdown).toHaveBeenCalledTimes(1)
  })
})
