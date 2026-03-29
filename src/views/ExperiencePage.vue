<template>
  <div class="min-h-screen bg-transparent text-terminal-green font-mono">
    <div class="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      <!-- 頁面標題 -->
      <header :ref="setRevealSection" class="reveal-section mb-12">
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="typing-text" :class="{ 'typing': isTyping }">cat experience.txt</span>
          <span class="cursor-blink">_</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mt-4 text-terminal-green">
          > 工作經歷
        </h1>
        <p class="text-terminal-green/70 mt-2 text-sm">
          // 專業工作經驗與職責
        </p>
      </header>

      <section :ref="setRevealSection" class="reveal-section mb-10 rounded-3xl border border-terminal-green/20 bg-black/45 p-5 md:p-6">
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl border border-terminal-green/18 bg-black/35 px-4 py-4">
            <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Roles</div>
            <div class="mt-2 text-2xl text-terminal-green">{{ sortedExperiences.length }}</div>
            <div class="mt-1 text-sm text-terminal-green/60">已收錄工作職位</div>
          </div>
          <div class="rounded-2xl border border-terminal-green/18 bg-black/35 px-4 py-4">
            <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Current</div>
            <div class="mt-2 text-2xl text-terminal-green">{{ currentExperienceCount }}</div>
            <div class="mt-1 text-sm text-terminal-green/60">目前在職角色</div>
          </div>
          <div class="rounded-2xl border border-terminal-green/18 bg-black/35 px-4 py-4">
            <div class="text-terminal-green/45 text-xs uppercase tracking-[0.2em]">Tooling</div>
            <div class="mt-2 text-2xl text-terminal-green">{{ uniqueTechnologiesCount }}</div>
            <div class="mt-1 text-sm text-terminal-green/60">涉獵技術關鍵字</div>
          </div>
        </div>
        <div class="mt-4 rounded-2xl border border-terminal-green/18 bg-black/30 px-4 py-3 text-sm text-terminal-green/68">
          依時間整理每個階段負責的系統、關鍵成果與核心技術，方便快速掌握我在企業 AI 導入與整合上的實戰經驗。
        </div>
      </section>

      <!-- 工作經歷列表 -->
      <section :ref="setRevealSection" class="reveal-section">
        <div class="terminal-prompt mb-6">
          <span class="prompt-symbol">$</span>
          <span>ls experiences/</span>
        </div>
        <div class="space-y-8 md:space-y-10">
          <div
            v-for="experience in sortedExperiences"
            :key="experience.id"
            class="timeline-entry reveal-section relative md:pl-14"
            :ref="setRevealSection"
          >
            <div class="timeline-line hidden md:block"></div>
            <div class="timeline-node hidden md:flex">
              <span class="timeline-node-core"></span>
            </div>
            <div class="terminal-card border border-terminal-green/30 bg-black/50 p-6 md:p-7 hover:-translate-y-1 hover:border-terminal-green transition-all">
            <!-- 職位標題與時間 -->
            <div class="flex flex-col gap-5 md:flex-row md:items-start md:justify-between mb-4">
              <div class="flex-1 md:border-l md:border-terminal-green/20 md:pl-5">
                <h2 class="text-2xl font-bold text-terminal-green mb-2">
                  > {{ experience.position }}
                </h2>
                <div class="text-terminal-green/80 text-lg mb-1">
                  {{ experience.company }}
                </div>
                <div class="text-terminal-green/60 text-sm">
                  {{ experience.location }}
                </div>
              </div>
              <div class="text-left md:text-right md:min-w-48">
                <div class="text-terminal-green/80 text-sm font-semibold">
                  {{ formatDate(experience.startDate) }} - {{ experience.isCurrent ? '仍在職' : formatDate(experience.endDate) }}
                </div>
                <span
                  v-if="experience.isCurrent"
                  class="inline-block mt-2 px-2 py-1 bg-terminal-green/20 border border-terminal-green/50 text-terminal-green text-xs"
                >
                  現職
                </span>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full border border-terminal-green/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/55">
                {{ experience.technologies?.length || 0 }} tech
              </span>
              <span class="rounded-full border border-terminal-green/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-terminal-green/55">
                {{ experience.impactNotes?.length || 0 }} highlights
              </span>
              <button
                @click="toggleExperienceDetails(experience.id)"
                class="ml-auto inline-flex items-center gap-2 rounded-full border border-terminal-green/25 px-3 py-1.5 text-xs text-terminal-green/70 hover:border-terminal-green/60 hover:text-terminal-green"
              >
                <span
                  class="detail-chevron"
                  :class="{ 'detail-chevron-expanded': expandedExperiences[experience.id] }"
                >
                  ▾
                </span>
                <span>{{ expandedExperiences[experience.id] ? '收起細節' : '查看細節' }}</span>
              </button>
            </div>

            <div
              v-if="experience.impactNotes && experience.impactNotes.length > 0"
              class="mt-5 rounded-2xl border border-terminal-green/18 bg-terminal-green/6 px-4 py-4"
            >
              <div class="text-terminal-green/45 text-[11px] uppercase tracking-[0.18em]">Summary</div>
              <div class="mt-2 text-sm leading-relaxed text-terminal-green/78">
                {{ experience.impactNotes[0] }}
              </div>
            </div>

            <transition name="experience-detail">
              <div v-if="expandedExperiences[experience.id]" class="mt-6 space-y-6">
                <!-- 工作職責 -->
                <div>
                  <div class="text-terminal-green/50 mb-3 text-sm">職責:</div>
                  <ul class="space-y-3">
                    <li
                      v-for="(responsibility, index) in experience.responsibilities"
                      :key="index"
                      class="text-terminal-green/80 text-sm leading-relaxed flex items-start"
                    >
                      <span class="text-terminal-green mr-2">-</span>
                      <span>{{ responsibility }}</span>
                    </li>
                  </ul>
                </div>

                <!-- 技術關鍵字 -->
                <div v-if="experience.technologies && experience.technologies.length > 0">
                  <div class="text-terminal-green/50 mb-3 text-sm">技術:</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in experience.technologies"
                      :key="tech"
                      class="px-3 py-1 bg-terminal-green/10 border border-terminal-green/30 text-terminal-green/80 text-xs"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div v-if="experience.impactNotes && experience.impactNotes.length > 0">
                  <div class="text-terminal-green/50 mb-3 text-sm">成效重點:</div>
                  <ul class="space-y-2">
                    <li
                      v-for="(note, index) in experience.impactNotes"
                      :key="index"
                      class="text-terminal-green/70 text-sm leading-relaxed flex items-start"
                    >
                      <span class="text-terminal-green mr-2">+</span>
                      <span>{{ note }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </transition>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { experiences } from '../data'

const isTyping = ref(false)
const expandedExperiences = ref({ 1: true })
const revealSections = ref([])
let revealObserver = null

const formatDate = (dateString) => {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  return `${year}/${month}`
}

const sortedExperiences = computed(() => {
  return [...experiences].sort((a, b) => {
    // 當前職位排在最前面
    if (a.isCurrent && !b.isCurrent) return -1
    if (!a.isCurrent && b.isCurrent) return 1
    
    // 按開始日期倒序排列
    const dateA = new Date(a.startDate)
    const dateB = new Date(b.startDate)
    return dateB - dateA
  })
})

const currentExperienceCount = computed(() => experiences.filter((experience) => experience.isCurrent).length)

const uniqueTechnologiesCount = computed(() => {
  return new Set(experiences.flatMap((experience) => experience.technologies || [])).size
})

const toggleExperienceDetails = (id) => {
  expandedExperiences.value[id] = !expandedExperiences.value[id]
}

const setRevealSection = (element) => {
  if (element && !revealSections.value.includes(element)) {
    revealSections.value.push(element)
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
  }, { threshold: 0.14, rootMargin: '0px 0px -10% 0px' })

  revealSections.value.forEach((section) => revealObserver?.observe(section))

  setTimeout(() => {
    isTyping.value = true
  }, 500)
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

.timeline-line {
  position: absolute;
  left: 17px;
  top: 1.5rem;
  bottom: 1.5rem;
  width: 1px;
  background: linear-gradient(180deg, rgba(57, 255, 20, 0.08), rgba(57, 255, 20, 0.45), rgba(57, 255, 20, 0.08));
}

.timeline-node {
  position: absolute;
  left: 0;
  top: 1.8rem;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(57, 255, 20, 0.28);
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 0 6px rgba(57, 255, 20, 0.04);
}

.timeline-node-core {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #39ff14;
  box-shadow: 0 0 14px rgba(57, 255, 20, 0.7);
}

.detail-chevron {
  display: inline-block;
  transition: transform 0.25s ease;
}

.detail-chevron-expanded {
  transform: rotate(180deg);
}

.experience-detail-enter-active,
.experience-detail-leave-active {
  transition: opacity 0.26s ease, transform 0.26s ease, max-height 0.32s ease;
  overflow: hidden;
}

.experience-detail-enter-from,
.experience-detail-leave-to {
  opacity: 0;
  transform: translateY(-6px);
  max-height: 0;
}

.experience-detail-enter-to,
.experience-detail-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1200px;
}

</style>
