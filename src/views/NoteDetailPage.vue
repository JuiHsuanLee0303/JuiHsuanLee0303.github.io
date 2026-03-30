<template>
  <div class="min-h-screen bg-transparent text-terminal-green font-mono">
    <div class="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      <template v-if="note">
        <header class="mb-8 md:mb-10">
          <router-link
            to="/notes"
            class="inline-flex items-center gap-2 rounded-full border border-terminal-green/22 px-4 py-2 text-sm text-terminal-green/75 hover:border-terminal-green/55 hover:text-terminal-green"
          >
            <span><</span>
            <span>Back to journal</span>
          </router-link>

          <div class="mt-6 rounded-3xl border border-terminal-green/20 bg-black/45 p-6 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span>open note://{{ note.slug }}</span>
              <span class="cursor-blink">_</span>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">
              <span>{{ formatNoteDate(note.date) }}</span>
              <span v-if="note.updated" class="text-terminal-green/25">/</span>
              <span v-if="note.updated">updated {{ formatNoteDate(note.updated) }}</span>
              <span class="text-terminal-green/25">/</span>
              <span>{{ note.readingTime }} min read</span>
            </div>

            <h1 class="mt-4 text-4xl md:text-5xl font-bold text-terminal-green">
              {{ note.title }}
            </h1>
            <p class="mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-terminal-green/72">
              {{ note.excerpt }}
            </p>

            <div v-if="note.tags.length" class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in note.tags"
                :key="tag"
                class="rounded-full border border-terminal-green/18 bg-terminal-green/8 px-3 py-1 text-xs text-terminal-green/70"
              >
                # {{ tag }}
              </span>
            </div>
          </div>
        </header>

        <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <main class="rounded-3xl border border-terminal-green/20 bg-black/45 p-5 md:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <div v-if="note.coverImage" class="mb-6 overflow-hidden rounded-3xl border border-terminal-green/12 bg-black/40">
              <img :src="note.coverImage" :alt="note.title" class="cover-image" loading="lazy" />
            </div>

            <article class="note-content" v-html="note.html"></article>
          </main>

          <aside class="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <section class="rounded-3xl border border-terminal-green/20 bg-black/45 p-5 md:p-6">
              <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">At a glance</div>
              <div class="mt-4 space-y-3">
                <div class="rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-4">
                  <div class="text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">Published</div>
                  <div class="mt-2 text-sm text-terminal-green">{{ formatNoteDate(note.date) }}</div>
                </div>
                <div
                  v-if="note.updated"
                  class="rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-4"
                >
                  <div class="text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">Updated</div>
                  <div class="mt-2 text-sm text-terminal-green">{{ formatNoteDate(note.updated) }}</div>
                </div>
                <div class="rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-4">
                  <div class="text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">Reading time</div>
                  <div class="mt-2 text-sm text-terminal-green">{{ note.readingTime }} min read</div>
                </div>
              </div>

              <div v-if="note.tags.length" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in note.tags"
                  :key="`aside-${tag}`"
                  class="rounded-full border border-terminal-green/18 bg-terminal-green/8 px-3 py-1 text-xs text-terminal-green/72"
                >
                  # {{ tag }}
                </span>
              </div>
            </section>

            <section v-if="note.attachments.length" class="rounded-3xl border border-terminal-green/20 bg-black/45 p-5 md:p-6">
              <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Attachments</div>
              <div class="mt-4 space-y-3">
                <a
                  v-for="attachment in note.attachments"
                  :key="attachment.relativePath"
                  :href="attachment.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="attachment-item flex items-center justify-between gap-4 rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-3"
                >
                  <div class="min-w-0">
                    <div class="truncate text-sm text-terminal-green">{{ attachment.name }}</div>
                    <div class="mt-1 truncate text-xs text-terminal-green/48">{{ attachment.relativePath }}</div>
                  </div>
                  <span class="rounded-full border border-terminal-green/18 px-2 py-1 text-[11px] text-terminal-green/58">
                    {{ attachment.extension || 'FILE' }}
                  </span>
                </a>
              </div>
            </section>

            <section class="rounded-3xl border border-terminal-green/20 bg-black/45 p-5 md:p-6">
              <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Continue</div>
              <div class="mt-4 space-y-3">
                <router-link
                  v-if="adjacent.previous"
                  :to="`/notes/${adjacent.previous.slug}`"
                  class="nav-item block rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-3"
                >
                  <div class="text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">Newer</div>
                  <div class="mt-2 text-sm text-terminal-green">{{ adjacent.previous.title }}</div>
                </router-link>
                <router-link
                  v-if="adjacent.next"
                  :to="`/notes/${adjacent.next.slug}`"
                  class="nav-item block rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-3"
                >
                  <div class="text-[11px] uppercase tracking-[0.18em] text-terminal-green/45">Older</div>
                  <div class="mt-2 text-sm text-terminal-green">{{ adjacent.next.title }}</div>
                </router-link>
                <div v-if="!adjacent.previous && !adjacent.next" class="rounded-2xl border border-terminal-green/16 bg-black/28 px-4 py-4 text-sm text-terminal-green/62">
                  目前這是這個筆記區裡唯一的一篇文章。
                </div>
              </div>
            </section>
          </aside>
        </div>
      </template>

      <section v-else class="mx-auto max-w-2xl rounded-3xl border border-terminal-green/20 bg-black/45 p-6 md:p-8 text-center">
        <div class="terminal-prompt justify-center">
          <span class="prompt-symbol">$</span>
          <span>cat missing-note.txt</span>
          <span class="cursor-blink">_</span>
        </div>
        <h1 class="mt-5 text-3xl md:text-4xl font-bold text-terminal-green">
          找不到這篇文章
        </h1>
        <p class="mt-4 text-sm leading-relaxed text-terminal-green/68">
          這個 slug 目前沒有對應到已發布的筆記文章。你可以先回到文章列表，或確認資料夾名稱與路由是否一致。
        </p>
        <router-link
          to="/notes"
          class="mt-6 inline-flex items-center gap-2 rounded-full border border-terminal-green/22 px-4 py-2 text-sm text-terminal-green/75 hover:border-terminal-green/55 hover:text-terminal-green"
        >
          <span>Open notes</span>
          <span>></span>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { formatNoteDate, getAdjacentNotes, getNoteBySlug } from '../lib/blog/posts'

const route = useRoute()

const note = computed(() => getNoteBySlug(String(route.params.slug || '')))
const adjacent = computed(() => getAdjacentNotes(String(route.params.slug || '')))

const ensureMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }

  return element
}

watchEffect(() => {
  if (!note.value) {
    const title = '文章不存在 | Jui-Hsuan Lee'
    const description = '查無對應的筆記文章。'

    document.title = title
    ensureMetaTag('meta[name="description"]', { name: 'description' }).setAttribute('content', description)
    ensureMetaTag('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', title)
    ensureMetaTag('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', description)
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', title)
    ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', description)
    return
  }

  const title = `${note.value.title} | Jui-Hsuan Lee`
  const description = note.value.excerpt

  document.title = title
  ensureMetaTag('meta[name="description"]', { name: 'description' }).setAttribute('content', description)
  ensureMetaTag('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', title)
  ensureMetaTag('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', description)
  ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', title)
  ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', description)
})
</script>

<style scoped>
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

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
}

.cover-image {
  display: block;
  width: 100%;
  max-height: 360px;
  object-fit: cover;
}

.attachment-item,
.nav-item {
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.attachment-item:hover,
.nav-item:hover {
  transform: translateY(-2px);
  border-color: rgba(57, 255, 20, 0.45);
  background: rgba(57, 255, 20, 0.08);
}

.note-content {
  font-size: 0.98rem;
  line-height: 1.9;
  color: rgba(224, 255, 224, 0.88);
}

.note-content :deep(h1),
.note-content :deep(h2),
.note-content :deep(h3),
.note-content :deep(h4) {
  color: #00ff00;
  font-weight: 700;
  line-height: 1.3;
}

.note-content :deep(h1) {
  margin: 0 0 1rem;
  font-size: clamp(1.9rem, 4vw, 2.8rem);
}

.note-content :deep(h2) {
  margin: 2.25rem 0 0.9rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.note-content :deep(h3) {
  margin: 1.8rem 0 0.75rem;
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
}

.note-content :deep(p) {
  margin: 0 0 1.1rem;
}

.note-content :deep(ul),
.note-content :deep(ol) {
  margin: 0 0 1.2rem;
  padding-left: 1.35rem;
}

.note-content :deep(li) {
  margin-bottom: 0.45rem;
}

.note-content :deep(blockquote) {
  margin: 1.4rem 0;
  padding: 0.15rem 0 0.15rem 1rem;
  border-left: 3px solid rgba(57, 255, 20, 0.45);
  color: rgba(214, 255, 214, 0.75);
  background: rgba(57, 255, 20, 0.05);
  border-radius: 0 1rem 1rem 0;
}

.note-content :deep(pre) {
  margin: 1.4rem 0;
  padding: 1rem 1.1rem;
  background: rgba(0, 0, 0, 0.68);
  border: 1px solid rgba(57, 255, 20, 0.24);
}

.note-content :deep(pre code) {
  display: block;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
}

.note-content :deep(code) {
  color: #afffaf;
}

.note-content :deep(table) {
  margin: 1.4rem 0;
  background: rgba(0, 0, 0, 0.46);
}

.note-content :deep(th) {
  color: #00ff00;
}

.note-content :deep(td) {
  color: rgba(214, 255, 214, 0.8);
}

.note-content :deep(.note-figure) {
  margin: 1.6rem 0;
}

.note-content :deep(.note-image) {
  display: block;
  width: 100%;
  border-radius: 1.25rem;
  border: 1px solid rgba(57, 255, 20, 0.18);
  background: rgba(0, 0, 0, 0.35);
}

.note-content :deep(.note-caption) {
  margin-top: 0.7rem;
  font-size: 0.85rem;
  text-align: center;
  color: rgba(214, 255, 214, 0.56);
}

.note-content :deep(.note-link) {
  color: #39ff14;
  text-decoration: underline;
  text-underline-offset: 0.22rem;
}

.note-content :deep(.note-link-attachment) {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.1rem 0.15rem;
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
