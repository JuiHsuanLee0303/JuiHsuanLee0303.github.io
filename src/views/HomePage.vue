<template>
  <div class="min-h-screen bg-transparent text-terminal-green font-mono relative">
    <div class="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      <!-- ASCII藝術標題 -->
      <header :ref="setRevealSection" class="reveal-section mb-10 md:mb-12 grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-stretch">
        <div class="hero-panel h-full rounded-3xl border border-terminal-green/20 bg-black/45 p-5 md:p-8 shadow-[0_0_0_1px_rgba(0,255,0,0.04),0_20px_60px_rgba(0,0,0,0.35)]">
          <div class="ascii-art text-[10px] md:text-sm mb-6 text-terminal-green/80">
            <pre v-html="asciiArt"></pre>
          </div>

          <!-- 終端機提示符 -->
          <div class="terminal-prompt mb-4">
            <span class="prompt-symbol">$</span>
            <span class="typing-text" :class="{ 'typing': isTyping }">whoami</span>
            <span class="cursor-blink">_</span>
          </div>

          <div class="text-terminal-green text-lg md:text-xl mt-4">
            <div class="mb-2">{{ personalInfo.name }}</div>
            <div class="text-terminal-green/70 text-sm">// {{ personalInfo.title }}</div>
          </div>
        </div>

        <aside class="hero-panel hero-panel--accent h-full rounded-3xl border border-terminal-green/20 bg-[linear-gradient(180deg,rgba(0,255,0,0.05),rgba(0,0,0,0.55))] p-5 md:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
          <div class="terminal-prompt mb-4">
            <span class="prompt-symbol">$</span>
            <span>status --summary</span>
          </div>
          <p class="text-terminal-green/80 leading-relaxed text-sm md:text-base">
            專注於 LLM / AI Agent 系統設計，擅長把 RAG、MCP、Local LLM 與企業流程整合成可落地、可驗證、可持續擴展的 AI 應用。
          </p>
          <div class="mt-6 grid grid-cols-2 gap-3">
            <div v-for="stat in quickStats" :key="stat.label" class="rounded-2xl border border-terminal-green/18 bg-black/40 px-4 py-4">
              <div class="text-terminal-green/45 text-[11px] uppercase tracking-[0.2em]">{{ stat.label }}</div>
              <div class="mt-2 text-2xl font-semibold text-terminal-green">{{ stat.value }}</div>
              <div class="mt-1 text-xs text-terminal-green/60">{{ stat.description }}</div>
            </div>
          </div>
        </aside>
      </header>

      <!-- 自我介紹 -->
      <section :ref="setRevealSection" class="reveal-section mb-12">
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>cat about.txt</span>
        </div>
        <div class="terminal-card p-6 mb-6">
          <div class="space-y-4 text-terminal-green/80">
            <p v-for="(line, index) in aboutText" :key="index">
              {{ line }}
            </p>
          </div>
        </div>
      </section>

      <!-- 技能展示 -->
      <section :ref="setRevealSection" class="reveal-section mb-12">
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>ls skills/</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="terminal-card group p-6 hover:-translate-y-1 hover:border-terminal-green transition-all"
          >
            <div class="mb-4">
              <div class="mb-3 flex items-center justify-between gap-3">
                <h3 class="text-xl font-bold text-terminal-green mb-2">
                  > {{ skill.title }}
                </h3>
                <span class="rounded-full border border-terminal-green/20 px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/55">
                  {{ skill.technologies.length }} Tech
                </span>
              </div>
              <p class="text-terminal-green/70 text-sm mb-4">
                {{ skill.description }}
              </p>
            </div>
            <div class="space-y-2">
              <div
                v-for="tech in skill.technologies"
                :key="tech.name"
                class="text-terminal-green/60 text-xs relative group cursor-pointer"
                @mouseenter="hoveredItem = { type: 'tech', name: tech.name, experience: tech.experience }"
                @mouseleave="hoveredItem = null"
                @click="toggleItemDetail({ type: 'tech', name: tech.name, experience: tech.experience })"
              >
                - {{ tech.name }}
                <div
                  v-if="hoveredItem && hoveredItem.type === 'tech' && hoveredItem.name === tech.name"
                  class="experience-tooltip"
                >
                  <div class="text-terminal-green text-xs p-2">
                    {{ tech.experience }}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 space-y-2">
              <div
                v-for="level in skill.skillLevels"
                :key="level.name"
                class="text-xs"
              >
                <div class="flex justify-between mb-1 relative">
                  <span
                    class="text-terminal-green/70 cursor-pointer relative group"
                    @mouseenter="hoveredItem = { type: 'skill', name: level.name, experience: level.experience }"
                    @mouseleave="hoveredItem = null"
                    @click="toggleItemDetail({ type: 'skill', name: level.name, experience: level.experience })"
                  >
                    {{ level.name }}
                    <div
                      v-if="hoveredItem && hoveredItem.type === 'skill' && hoveredItem.name === level.name"
                      class="experience-tooltip"
                    >
                      <div class="text-terminal-green text-xs p-2">
                        {{ level.experience }}
                      </div>
                    </div>
                  </span>
                  <span class="text-terminal-green/50">{{ level.level }}%</span>
                </div>
                <div class="w-full bg-terminal-green/10 border border-terminal-green/30 h-2">
                  <div
                    class="bg-terminal-green h-full transition-all duration-1000"
                    :style="{ width: `${level.level}%` }"
                  ></div>
                </div>
              </div>
            </div>
            <div
              v-if="selectedItem && skillContainsSelectedItem(skill)"
              class="mt-4 rounded-2xl border border-terminal-green/20 bg-terminal-green/6 p-3 text-xs text-terminal-green/75 md:hidden"
            >
              <div class="text-terminal-green/45 uppercase tracking-[0.2em]">Detail</div>
              <div class="mt-2 font-semibold text-terminal-green">{{ selectedItem.name }}</div>
              <div class="mt-1 leading-relaxed">{{ selectedItem.experience }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 精選案例 -->
      <section :ref="setRevealSection" class="reveal-section mb-12">
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>cat featured_case_studies.txt</span>
        </div>
        <div class="mb-4 rounded-2xl border border-terminal-green/18 bg-black/35 px-4 py-3 text-sm text-terminal-green/70">
          這裡集中展示最能代表企業 AI 落地能力的案例，從平台設計、系統整合到實際使用情境都能快速看出技術主軸。
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="terminal-card p-6 hover:border-terminal-green transition-all"
          >
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <span v-if="project.status" class="rounded-full border border-terminal-green/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/55">
                {{ project.status }}
              </span>
            </div>
            <h3 class="text-xl font-bold text-terminal-green mb-2">
              > {{ project.title }}
            </h3>
            <p class="text-terminal-green/70 text-sm mb-4">
              {{ project.description }}
            </p>
            <div v-if="project.role" class="mb-3 text-sm text-terminal-green/72">
              <span class="text-terminal-green/45">Role:</span>
              <span class="ml-2">{{ project.role }}</span>
            </div>
            <div v-if="project.impact" class="mb-4 text-sm text-terminal-green/72">
              <span class="text-terminal-green/45">Impact:</span>
              <span class="ml-2">{{ project.impact }}</span>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech.name"
                class="px-2 py-1 bg-terminal-green/10 border border-terminal-green/30 text-terminal-green/80 text-xs"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 快速連結 -->
      <section :ref="setRevealSection" class="reveal-section">
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>./quick_links.sh</span>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <div v-for="link in quickLinks" :key="link.id" class="terminal-card p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Link {{ link.id }}</div>
                <div class="mt-2 text-terminal-green/70 text-sm">{{ getLinkDescription(link.type) }}</div>
              </div>
              <span class="rounded-full border border-terminal-green/20 px-2 py-1 text-[11px] text-terminal-green/55">
                {{ link.type }}
              </span>
            </div>
            <div class="mt-4 text-terminal-green/80">
              <span class="text-terminal-green">[{{ link.id }}]</span>
              <router-link
                v-if="link.type === 'router'"
                :to="link.path"
                class="ml-2 hover:text-terminal-green underline underline-offset-4"
              >
                {{ link.label }}
              </router-link>
              <a
                v-else
                :href="link.path"
                :target="link.type === 'external' ? '_blank' : undefined"
                :rel="link.type === 'external' ? 'noopener noreferrer' : undefined"
                class="ml-2 hover:text-terminal-green underline underline-offset-4"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- 打字機效果文字 -->
      <div class="mt-12 text-center">
        <div class="terminal-prompt justify-center">
          <span class="prompt-symbol">$</span>
          <span class="typing-text text-terminal-green">{{ displayText }}</span>
          <span class="cursor-blink">_</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  typewriterTexts,
  skills as skillsData,
  homeProjects,
  personalInfo,
  asciiArt,
  aboutText,
  quickLinks
} from '../data'

const isTyping = ref(false)
const displayText = ref('')
const currentTextIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)
let typeTimeout = null

const skills = ref(skillsData)
const projects = ref(homeProjects)
const hoveredItem = ref(null)
const selectedItem = ref(null)
const revealSections = ref([])
let revealObserver = null

const quickStats = computed(() => [
  { label: 'Target', value: 'AI Eng.', description: '聚焦 AI Engineer 職缺' },
  { label: 'Specialty', value: 'LLM / Agent', description: '主打模型應用落地' },
  { label: 'Users', value: '20+', description: 'Anselm AI 內部使用者' },
  { label: 'Infra', value: 'Local LLM', description: '支援企業端部署評估' }
])

const getLinkDescription = (type) => {
  if (type === 'router') return '快速跳到站內重點頁面'
  if (type === 'mailto') return '直接透過電子郵件聯繫'
  return '開啟外部平台與作品資訊'
}

const toggleItemDetail = (item) => {
  if (selectedItem.value?.type === item.type && selectedItem.value?.name === item.name) {
    selectedItem.value = null
    return
  }

  selectedItem.value = item
}

const skillContainsSelectedItem = (skill) => {
  if (!selectedItem.value) return false

  return skill.technologies.some((tech) => tech.name === selectedItem.value.name) ||
    skill.skillLevels.some((level) => level.name === selectedItem.value.name)
}

const setRevealSection = (element) => {
  if (element && !revealSections.value.includes(element)) {
    revealSections.value.push(element)
  }
}

const typeWriter = () => {
  const currentText = typewriterTexts[currentTextIndex.value]
  
  if (isDeleting.value) {
    displayText.value = currentText.substring(0, currentCharIndex.value - 1)
    currentCharIndex.value--
    
    if (currentCharIndex.value === 0) {
      isDeleting.value = false
      currentTextIndex.value = (currentTextIndex.value + 1) % typewriterTexts.length
    }
    
    typeTimeout = setTimeout(typeWriter, 50)
  } else {
    displayText.value = currentText.substring(0, currentCharIndex.value + 1)
    currentCharIndex.value++
    
    if (currentCharIndex.value === currentText.length) {
      isDeleting.value = true
      typeTimeout = setTimeout(typeWriter, 2000)
    } else {
      typeTimeout = setTimeout(typeWriter, 100)
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
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' })

  revealSections.value.forEach((section) => revealObserver?.observe(section))

  setTimeout(() => {
    isTyping.value = true
    setTimeout(() => {
      typeWriter()
    }, 1000)
  }, 500)
})

onUnmounted(() => {
  if (typeTimeout) {
    clearTimeout(typeTimeout)
  }
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

.ascii-art {
  font-family: 'Courier New', monospace;
  white-space: pre;
  line-height: 1.2;
  overflow-x: auto;
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
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 0, 0.3);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.terminal-card:hover {
  border-color: #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
}

.experience-tooltip {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 8px;
  z-index: 50;
  min-width: 200px;
  max-width: 300px;
  background-color: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(0, 255, 0, 0.5);
  box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
  animation: fadeIn 0.2s ease-in;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: fadeRise 0.7s ease both;
}

.hero-panel--accent {
  animation-delay: 0.08s;
}

.experience-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 20px;
  border: 6px solid transparent;
  border-top-color: rgba(0, 255, 0, 0.5);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .text-terminal-green\/60 {
  color: rgba(0, 255, 0, 0.8);
  transition: color 0.2s ease;
}

@keyframes fadeRise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
