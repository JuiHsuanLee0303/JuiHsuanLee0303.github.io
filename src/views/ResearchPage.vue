<template>
  <div class="min-h-screen bg-transparent text-terminal-green font-mono">
    <div class="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      <!-- 頁面標題 -->
      <header class="mb-12">
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="typing-text" :class="{ 'typing': isTyping }">cat research.txt</span>
          <span class="cursor-blink">_</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mt-4 text-terminal-green">
          > 學術研究
        </h1>
        <p class="text-terminal-green/70 mt-2 text-sm">
          // 研討會參與與論文發表記錄
        </p>
      </header>

      <section class="mb-8 rounded-3xl border border-terminal-green/20 bg-black/40 p-5 md:p-6">
        <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Recruiter Note</div>
        <p class="mt-3 text-sm leading-relaxed text-terminal-green/78">
          這個頁面除了展示論文與會議紀錄，也用來補強我在 LLM、RAG 與企業 AI 應用場景的研究深度，對應我在產品與顧問工作中的實作方向。
        </p>
      </section>

      <!-- 篩選器 -->
      <div class="mb-5 rounded-3xl border border-terminal-green/20 bg-black/55 p-4 md:p-5">
        <div class="mb-2 text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Research Snapshot</div>
        <div class="text-terminal-green/80 text-sm">共收錄 {{ conferences.length }} 場研討會與 {{ publications.length }} 篇論文，支援年份與類型快速篩選。</div>
      </div>
      <div class="mb-8 rounded-3xl border border-terminal-green/20 bg-black/75 p-4 md:p-5 backdrop-blur-md">
        <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Filters</div>
            <div class="mt-2 text-terminal-green/80 text-sm">依年份與論文類型快速切換，整理研究軌跡與發表重點。</div>
          </div>
          <div class="flex flex-wrap gap-3 text-xs">
            <div class="rounded-full border border-terminal-green/20 px-3 py-2 text-terminal-green/65">Conferences {{ filteredConferences.length }}</div>
            <div class="rounded-full border border-terminal-green/20 px-3 py-2 text-terminal-green/65">Publications {{ filteredPublications.length }}</div>
            <button
              v-if="activeFilter !== 'all'"
              @click="activeFilter = 'all'"
              class="rounded-full border border-terminal-green/25 px-3 py-2 text-terminal-green/70 hover:border-terminal-green/60 hover:text-terminal-green"
            >
              重設篩選
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="[
              'px-4 py-2 border border-terminal-green/50 rounded-full',
              activeFilter === filter.value
                ? 'bg-terminal-green/20 text-terminal-green border-terminal-green shadow-[0_0_20px_rgba(0,255,0,0.1)]'
                : 'text-terminal-green/70 hover:text-terminal-green hover:border-terminal-green/70'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- 研討會區塊 -->
      <section class="mb-16">
        <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span>ls conferences/</span>
          </div>
          <div class="text-terminal-green/55 text-sm">顯示 {{ filteredConferences.length }} 筆結果</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="conference in filteredConferences"
            :key="conference.id"
            class="terminal-card border border-terminal-green/30 bg-black/50 p-6 hover:-translate-y-1 hover:border-terminal-green transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold text-terminal-green flex-1">
                {{ conference.title }}
              </h3>
              <span class="text-terminal-green/50 text-xs ml-4">
                {{ conference.date }}
              </span>
            </div>
            <div class="space-y-2 text-sm text-terminal-green/80">
              <div>
                <span class="text-terminal-green/50">地點:</span>
                <span class="ml-2">{{ conference.location }}</span>
              </div>
              <div>
                <span class="text-terminal-green/50">類型:</span>
                <span class="ml-2">{{ conference.type }}</span>
              </div>
              <div>
                <span class="text-terminal-green/50">報告形式:</span>
                <span class="ml-2">{{ conference.presentationType }}</span>
              </div>
              <div v-if="conference.paperTitle" class="mt-4">
                <span class="text-terminal-green/50">論文標題:</span>
                <p class="mt-1 text-terminal-green/70 font-semibold">{{ conference.paperTitle }}</p>
              </div>
              <div v-if="conference.authors && conference.authors.length > 0" class="mt-4">
                <span class="text-terminal-green/50">作者:</span>
                <p class="mt-1 text-terminal-green/70">{{ conference.authors.join(', ') }}</p>
              </div>
              <div v-if="conference.abstract" class="mt-4">
                <button
                  @click="toggleConferenceAbstract(conference.id)"
                  class="flex items-center gap-2 text-terminal-green/70 hover:text-terminal-green transition-colors mb-2"
                >
                  <span class="text-terminal-green/50">摘要:</span>
                  <span
                    class="abstract-chevron"
                    :class="{ 'abstract-chevron-expanded': expandedConferences[conference.id] }"
                  >
                    ▾
                  </span>
                  <span class="text-xs">{{ expandedConferences[conference.id] ? '[收起]' : '[展開]' }}</span>
                </button>
                <transition name="abstract-expand">
                  <div
                    v-if="expandedConferences[conference.id]"
                    class="abstract-panel mt-1 text-terminal-green/70 leading-relaxed"
                  >
                    {{ conference.abstract }}
                  </div>
                </transition>
              </div>
              <a
                v-if="conference.link"
                :href="conference.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block mt-4 text-terminal-green hover:text-terminal-green/70 underline"
              >
                [查看詳情]
              </a>
            </div>
          </div>
        </div>
        <div
          v-if="filteredConferences.length === 0"
          class="rounded-3xl border border-dashed border-terminal-green/25 bg-black/35 px-6 py-10 text-center text-terminal-green/60"
        >
          目前篩選條件下沒有符合的研討會資料。
        </div>
      </section>

      <!-- 論文區塊 -->
      <section>
        <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span>ls publications/</span>
          </div>
          <div class="text-terminal-green/55 text-sm">顯示 {{ filteredPublications.length }} 筆結果</div>
        </div>
        <div class="space-y-6">
          <div
            v-for="publication in filteredPublications"
            :key="publication.id"
            class="terminal-card border border-terminal-green/30 bg-black/50 p-6 hover:-translate-y-1 hover:border-terminal-green transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-xl font-bold text-terminal-green flex-1">
                {{ publication.title }}
              </h3>
              <span class="text-terminal-green/50 text-xs ml-4">
                {{ publication.year }}
              </span>
            </div>
            <div class="mb-4 flex flex-wrap gap-2">
              <span class="rounded-full border border-terminal-green/20 px-3 py-1 text-xs text-terminal-green/60">{{ publication.type }}</span>
              <span v-if="publication.venue" class="rounded-full border border-terminal-green/20 px-3 py-1 text-xs text-terminal-green/60">{{ publication.venue }}</span>
            </div>
            <div class="space-y-2 text-sm text-terminal-green/80">
              <div>
                <span class="text-terminal-green/50">作者:</span>
                <span class="ml-2">{{ publication.authors.join(', ') }}</span>
              </div>
              <div v-if="publication.journal">
                <span class="text-terminal-green/50">期刊:</span>
                <span class="ml-2">{{ publication.journal }}</span>
                <span v-if="publication.volume" class="ml-2">
                  (Vol. {{ publication.volume }}, pp. {{ publication.pages }})
                </span>
              </div>
              <div v-if="publication.conference">
                <span class="text-terminal-green/50">會議:</span>
                <span class="ml-2">{{ publication.conference }}</span>
                <span v-if="publication.venue" class="ml-2">({{ publication.venue }})</span>
              </div>
              <div v-if="publication.doi">
                <span class="text-terminal-green/50">DOI:</span>
                <a
                  :href="`https://doi.org/${publication.doi}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-2 text-terminal-green hover:text-terminal-green/70 underline"
                >
                  {{ publication.doi }}
                </a>
              </div>
              <div v-if="publication.abstract" class="mt-4">
                <button
                  @click="togglePublicationAbstract(publication.id)"
                  class="flex items-center gap-2 text-terminal-green/70 hover:text-terminal transition-colors mb-2"
                >
                  <span class="text-terminal-green/50">摘要:</span>
                  <span
                    class="abstract-chevron"
                    :class="{ 'abstract-chevron-expanded': expandedPublications[publication.id] }"
                  >
                    ▾
                  </span>
                  <span class="text-xs">{{ expandedPublications[publication.id] ? '[收起]' : '[展開]' }}</span>
                </button>
                <transition name="abstract-expand">
                  <div
                    v-if="expandedPublications[publication.id]"
                    class="abstract-panel mt-1 text-terminal-green/70 leading-relaxed"
                  >
                    {{ publication.abstract }}
                  </div>
                </transition>
              </div>
              <div v-if="publication.keywords && publication.keywords.length > 0" class="mt-4">
                <span class="text-terminal-green/50">關鍵字:</span>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    v-for="keyword in publication.keywords"
                    :key="keyword"
                    class="px-2 py-1 bg-terminal-green/10 border border-terminal-green/30 text-terminal-green/80 text-xs"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex gap-4">
                <a
                  v-if="publication.pdfLink"
                  :href="publication.pdfLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-terminal-green hover:text-terminal-green/70 underline"
                >
                  [下載PDF]
                </a>
                <a
                  v-if="publication.doi"
                  :href="`https://doi.org/${publication.doi}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-terminal-green hover:text-terminal-green/70 underline"
                >
                  [查看DOI]
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="filteredPublications.length === 0"
          class="rounded-3xl border border-dashed border-terminal-green/25 bg-black/35 px-6 py-10 text-center text-terminal-green/60"
        >
          目前篩選條件下沒有符合的論文資料。
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { conferences, publications, researchFilters } from '../data'

const isTyping = ref(false)
const activeFilter = ref('all')
const expandedConferences = ref({})
const expandedPublications = ref({})

const filters = researchFilters

const filteredConferences = computed(() => {
  if (activeFilter.value === 'all') {
    return conferences
  }
  if (activeFilter.value === '2025' || activeFilter.value === '2024') {
    return conferences.filter(c => c.date.startsWith(activeFilter.value))
  }
  return conferences
})

const filteredPublications = computed(() => {
  let result = publications
  
  if (activeFilter.value === 'conference') {
    result = result.filter(p => p.type === '會議論文')
  } else if (activeFilter.value === 'thesis') {
    result = result.filter(p => p.type === '碩士學位論文')
  } else if (activeFilter.value === '2025' || activeFilter.value === '2024') {
    result = result.filter(p => p.year.toString() === activeFilter.value)
  }
  
  return result
})

const toggleConferenceAbstract = (id) => {
  expandedConferences.value[id] = !expandedConferences.value[id]
}

const togglePublicationAbstract = (id) => {
  expandedPublications.value[id] = !expandedPublications.value[id]
}

onMounted(() => {
  setTimeout(() => {
    isTyping.value = true
  }, 500)
})
</script>

<style scoped>
.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Courier New', monospace;
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
  animation: typing 1s steps(20, end);
}

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
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
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.terminal-card {
  position: relative;
  transition: all 0.3s ease;
}

.terminal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  pointer-events: none;
  transition: border-color 0.3s ease;
}

.terminal-card:hover::before {
  border-color: rgba(0, 255, 0, 0.5);
}

.abstract-panel {
  overflow: hidden;
  border-left: 2px solid rgba(57, 255, 20, 0.22);
  padding-left: 0.9rem;
}

.abstract-chevron {
  display: inline-block;
  transition: transform 0.25s ease;
}

.abstract-chevron-expanded {
  transform: rotate(180deg);
}

.abstract-expand-enter-active,
.abstract-expand-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease, max-height 0.3s ease;
  transform-origin: top;
  overflow: hidden;
}

.abstract-expand-enter-from,
.abstract-expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
  max-height: 0;
}

.abstract-expand-enter-to,
.abstract-expand-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}
</style>
