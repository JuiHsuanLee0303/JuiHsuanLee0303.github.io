import { describe, it, expect } from 'vitest'
import ui from '../ui.json'
import research from '../research.json'

// Mirrors the filter -> data mapping implemented in src/views/ResearchPage.vue
const PUBLICATION_TYPE_BY_FILTER = {
  conference: '會議論文',
  thesis: '碩士學位論文',
}

const filterMatchesData = (value) => {
  // Year filters (e.g. "2025") match conferences by date prefix or publications by year.
  const matchesYear =
    research.conferences.some((c) => typeof c.date === 'string' && c.date.startsWith(value)) ||
    research.publications.some((p) => String(p.year) === value)

  // Type filters match publications by their `type` field.
  const matchesType = research.publications.some(
    (p) => p.type === PUBLICATION_TYPE_BY_FILTER[value]
  )

  return matchesYear || matchesType
}

describe('researchFilters (src/data/ui.json)', () => {
  it('exposes an "all" filter', () => {
    expect(ui.researchFilters.some((f) => f.value === 'all')).toBe(true)
  })

  it('has no dead filter — every non-"all" filter matches at least one conference or publication', () => {
    const dead = ui.researchFilters
      .filter((f) => f.value !== 'all')
      .filter((f) => !filterMatchesData(f.value))
      .map((f) => `${f.label} (${f.value})`)

    expect(dead, `dead filters yield empty results: ${dead.join(', ')}`).toEqual([])
  })
})
