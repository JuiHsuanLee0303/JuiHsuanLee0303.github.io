import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import HomePage from '../HomePage.vue'
import { personalInfo } from '../../data'

beforeEach(() => {
  // jsdom lacks IntersectionObserver, which HomePage sets up on mount.
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const mountHome = async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })
  await router.push('/')
  await router.isReady()

  return mount(HomePage, { global: { plugins: [router] } })
}

describe('HomePage — evidence-first skills, no self-rated %', () => {
  it('renders no self-assessment percentage anywhere', async () => {
    const wrapper = await mountHome()
    expect(wrapper.text()).not.toMatch(/\d+\s*%/)
  })

  it('renders skill technologies as accessible buttons', async () => {
    const wrapper = await mountHome()
    expect(wrapper.findAll('[data-testid="skill-tech"]').length).toBeGreaterThan(0)
    wrapper.findAll('[data-testid="skill-tech"]').forEach((el) => {
      expect(el.element.tagName).toBe('BUTTON')
    })
  })
})

describe('HomePage — persistent hero CTA', () => {
  it('exposes a mailto contact link in the hero', async () => {
    const wrapper = await mountHome()
    const cta = wrapper.find('[data-testid="hero-cta"]')
    expect(cta.exists()).toBe(true)

    const mail = cta.find(`a[href="mailto:${personalInfo.email}"]`)
    expect(mail.exists()).toBe(true)
  })

  it('links to LinkedIn and GitHub in the hero CTA', async () => {
    const wrapper = await mountHome()
    const cta = wrapper.find('[data-testid="hero-cta"]')
    expect(cta.find(`a[href="${personalInfo.linkedin}"]`).exists()).toBe(true)
    expect(cta.find(`a[href="${personalInfo.github}"]`).exists()).toBe(true)
  })
})
