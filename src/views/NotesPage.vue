<template>
  <div class="min-h-screen bg-transparent text-terminal-green font-mono">
    <div class="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      <header :ref="setRevealSection" class="reveal-section mb-10 md:mb-12">
        <div class="rounded-3xl border border-terminal-green/20 bg-black/45 p-6 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="typing-text" :class="{ typing: isTyping }">open /notes</span>
            <span class="cursor-blink">_</span>
          </div>
          <div class="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div class="text-terminal-green/42 text-xs uppercase tracking-[0.24em]">Journal</div>
              <h1 class="mt-3 text-4xl md:text-5xl font-bold text-terminal-green">
                筆記文章
              </h1>
              <p class="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-terminal-green/72">
                聚焦 AI 工具、RAG、Agent workflow 與實作觀察，整理成可以持續回看的文章筆記。
              </p>
            </div>
            <div class="grid grid-cols-3 gap-3 lg:min-w-[340px]">
              <div class="rounded-2xl border border-terminal-green/18 bg-black/30 px-4 py-4">
                <div class="text-terminal-green/45 text-[11px] uppercase tracking-[0.2em]">Posts</div>
                <div class="mt-2 text-2xl text-terminal-green">{{ noteStats.total }}</div>
              </div>
              <div class="rounded-2xl border border-terminal-green/18 bg-black/30 px-4 py-4">
                <div class="text-terminal-green/45 text-[11px] uppercase tracking-[0.2em]">Tags</div>
                <div class="mt-2 text-2xl text-terminal-green">{{ tagFilters.length }}</div>
              </div>
              <div class="rounded-2xl border border-terminal-green/18 bg-black/30 px-4 py-4">
                <div class="text-terminal-green/45 text-[11px] uppercase tracking-[0.2em]">Years</div>
                <div class="mt-2 text-2xl text-terminal-green">{{ yearFilters.length }}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        <main>
          <section :ref="setRevealSection" class="reveal-section">
            <div class="mb-5 flex flex-col gap-4 rounded-3xl border border-terminal-green/16 bg-black/32 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div class="text-terminal-green/45 text-[11px] uppercase tracking-[0.18em]">Showing</div>
                <div class="mt-2 text-lg text-terminal-green">
                  {{ filteredNotes.length }} / {{ notes.length }} 篇文章
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="selectedTag"
                  class="rounded-full border border-terminal-green/20 bg-terminal-green/8 px-3 py-1 text-xs text-terminal-green/72"
                >
                  類別：{{ selectedTag }}
                </span>
                <span
                  v-if="selectedYear"
                  class="rounded-full border border-terminal-green/20 bg-terminal-green/8 px-3 py-1 text-xs text-terminal-green/72"
                >
                  年份：{{ selectedYear }}
                </span>
                <button
                  v-if="selectedTag || selectedYear"
                  class="rounded-full border border-terminal-green/22 px-3 py-1 text-xs text-terminal-green/70 hover:border-terminal-green/55 hover:text-terminal-green"
                  @click="clearFilters"
                >
                  清除篩選
                </button>
              </div>
            </div>

            <div class="space-y-6">
              <article
                v-for="note in filteredNotes"
                :key="note.slug"
                :ref="setRevealSection"
                class="reveal-section note-card cursor-pointer overflow-hidden rounded-3xl border border-terminal-green/20 bg-black/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-green/80"
                tabindex="0"
                @click="openNote(note.slug)"
                @keydown.enter.prevent="openNote(note.slug)"
                @keydown.space.prevent="openNote(note.slug)"
              >
                <div v-if="note.coverImage" class="note-cover-wrapper border-b border-terminal-green/12">
                  <img :src="note.coverImage" :alt="note.title" class="note-cover" loading="lazy" />
                </div>

                <div class="p-6 md:p-7">
                  <div class="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">
                    <span>{{ formatNoteDate(note.date) }}</span>
                    <span class="text-terminal-green/25">/</span>
                    <span>{{ note.readingTime }} min read</span>
                    <span v-if="note.attachments.length" class="text-terminal-green/25">/</span>
                    <span v-if="note.attachments.length">{{ note.attachments.length }} files</span>
                  </div>

                  <h2 class="mt-4 text-2xl md:text-3xl font-bold text-terminal-green">
                    {{ note.title }}
                  </h2>
                  <p class="mt-3 max-w-3xl text-sm leading-relaxed text-terminal-green/72">
                    {{ note.excerpt }}
                  </p>

                  <div v-if="note.tags.length" class="mt-5 flex flex-wrap gap-2">
                    <button
                      v-for="tag in note.tags"
                      :key="`${note.slug}-${tag}`"
                      class="rounded-full border border-terminal-green/18 bg-terminal-green/7 px-3 py-1 text-xs text-terminal-green/68 hover:border-terminal-green/50 hover:text-terminal-green"
                      @click.stop="selectTag(tag)"
                    >
                      # {{ tag }}
                    </button>
                  </div>

                  <div class="mt-6 flex items-center justify-between gap-4 text-sm text-terminal-green/46">
                    <span>{{ note.updated ? `Updated ${formatNoteDate(note.updated)}` : 'Published entry' }}</span>
                    <span class="text-terminal-green/75">Open article ></span>
                  </div>
                </div>
              </article>

              <div
                v-if="!filteredNotes.length"
                class="rounded-3xl border border-terminal-green/16 bg-black/35 px-6 py-8 text-center text-terminal-green/68"
              >
                目前沒有符合這組篩選條件的文章，可以試著切換類別或年份。
              </div>
            </div>
          </section>
        </main>

        <aside :ref="setRevealSection" class="reveal-section xl:sticky xl:top-24 xl:self-start">
          <div class="space-y-5">
            <section class="rounded-3xl border border-terminal-green/18 bg-black/42 p-5 md:p-6">
              <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Browse</div>
              <div class="mt-4 grid grid-cols-3 gap-3 text-center">
                <div class="rounded-2xl border border-terminal-green/16 bg-black/28 px-3 py-4">
                  <div class="text-xl text-terminal-green">{{ noteStats.total }}</div>
                  <div class="mt-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/45">Posts</div>
                </div>
                <div class="rounded-2xl border border-terminal-green/16 bg-black/28 px-3 py-4">
                  <div class="text-xl text-terminal-green">{{ tagFilters.length }}</div>
                  <div class="mt-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/45">Tags</div>
                </div>
                <div class="rounded-2xl border border-terminal-green/16 bg-black/28 px-3 py-4">
                  <div class="text-xl text-terminal-green">{{ yearFilters.length }}</div>
                  <div class="mt-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/45">Years</div>
                </div>
              </div>
            </section>

            <section class="rounded-3xl border border-terminal-green/18 bg-black/42 p-5 md:p-6">
              <div class="flex items-center justify-between gap-4">
                <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Categories</div>
                <button
                  v-if="selectedTag"
                  class="text-xs text-terminal-green/58 hover:text-terminal-green"
                  @click="selectedTag = ''"
                >
                  reset
                </button>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <button
                  v-for="filter in tagFilters"
                  :key="filter.name"
                  class="filter-chip rounded-full border px-3 py-1.5 text-xs"
                  :class="selectedTag === filter.name ? 'filter-chip-active' : 'filter-chip-idle'"
                  @click="toggleTag(filter.name)"
                >
                  <span># {{ filter.name }}</span>
                  <span class="ml-2 text-terminal-green/45">{{ filter.count }}</span>
                </button>
              </div>
            </section>

            <section class="rounded-3xl border border-terminal-green/18 bg-black/42 p-5 md:p-6">
              <div class="flex items-center justify-between gap-4">
                <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Archive</div>
                <button
                  v-if="selectedYear"
                  class="text-xs text-terminal-green/58 hover:text-terminal-green"
                  @click="selectedYear = ''"
                >
                  reset
                </button>
              </div>
              <div class="mt-4 space-y-2">
                <button
                  v-for="filter in yearFilters"
                  :key="filter.year"
                  class="archive-link flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm"
                  :class="selectedYear === filter.year ? 'filter-chip-active' : 'filter-chip-idle'"
                  @click="toggleYear(filter.year)"
                >
                  <span>{{ filter.year }}</span>
                  <span class="text-terminal-green/45">{{ filter.count }}</span>
                </button>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatNoteDate, notes, noteStats } from '../lib/blog/posts'

const router = useRouter()
const isTyping = ref(false)
const revealSections = ref([])
const selectedTag = ref('')
const selectedYear = ref('')
let revealObserver = null

const getNoteYear = (dateString) => {
  if (typeof dateString !== 'string' || dateString.length < 4) {
    return '未標示'
  }

  return dateString.slice(0, 4)
}

const tagFilters = computed(() => {
  const counts = new Map()

  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    })
  })

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => left.name.localeCompare(right.name, 'zh-Hant'))
})

const yearFilters = computed(() => {
  const counts = new Map()

  notes.forEach((note) => {
    const year = getNoteYear(note.date)
    counts.set(year, (counts.get(year) || 0) + 1)
  })

  return [...counts.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((left, right) => right.year.localeCompare(left.year, 'zh-Hant'))
})

const filteredNotes = computed(() => {
  return notes.filter((note) => {
    const matchesTag = !selectedTag.value || note.tags.includes(selectedTag.value)
    const matchesYear = !selectedYear.value || getNoteYear(note.date) === selectedYear.value
    return matchesTag && matchesYear
  })
})

const clearFilters = () => {
  selectedTag.value = ''
  selectedYear.value = ''
}

const toggleTag = (tag) => {
  selectedTag.value = selectedTag.value === tag ? '' : tag
}

const selectTag = (tag) => {
  selectedTag.value = tag
}

const toggleYear = (year) => {
  selectedYear.value = selectedYear.value === year ? '' : year
}

const openNote = (slug) => {
  router.push(`/notes/${slug}`)
}

const setRevealSection = (element) => {
  if (element && !revealSections.value.includes(element)) {
    revealSections.value.push(element)

    if (revealObserver) {
      revealObserver.observe(element)
    }
  }
}

onMounted(() => {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' })

  revealSections.value.forEach((section) => revealObserver?.observe(section))

  window.setTimeout(() => {
    isTyping.value = true
  }, 400)
})

onUnmounted(() => {
  revealObserver?.disconnect()
})
</script>

<style scoped>
.reveal-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
}

.prompt-symbol {
  color: #00ff00;
  font-weight: bold;
}

.typing-text {
  color: #00ff00;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
}

.typing-text.typing {
  animation: typing 0.9s steps(14, end);
}

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
}

.note-card {
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, background-color 0.28s ease;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
}

.note-card:hover {
  transform: translateY(-6px);
  border-color: rgba(57, 255, 20, 0.48);
  box-shadow: 0 0 28px rgba(57, 255, 20, 0.08), 0 22px 48px rgba(0, 0, 0, 0.34);
  background: rgba(0, 0, 0, 0.52);
}

.note-cover-wrapper {
  background:
    linear-gradient(135deg, rgba(57, 255, 20, 0.08), transparent 55%),
    radial-gradient(circle at top right, rgba(57, 255, 20, 0.14), transparent 32%),
    rgba(0, 0, 0, 0.4);
}

.note-cover {
  display: block;
  width: 100%;
  max-height: 260px;
  object-fit: cover;
}

.filter-chip,
.archive-link {
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.filter-chip:hover,
.archive-link:hover {
  transform: translateY(-1px);
}

.filter-chip-idle {
  border-color: rgba(57, 255, 20, 0.16);
  background: rgba(0, 0, 0, 0.28);
  color: rgba(214, 255, 214, 0.7);
}

.filter-chip-active {
  border-color: rgba(57, 255, 20, 0.55);
  background: rgba(57, 255, 20, 0.12);
  color: #00ff00;
  box-shadow: inset 0 0 0 1px rgba(57, 255, 20, 0.08), 0 0 18px rgba(57, 255, 20, 0.08);
}

@keyframes typing {
  from {
    max-width: 0;
  }
  to {
    max-width: 1000px;
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
