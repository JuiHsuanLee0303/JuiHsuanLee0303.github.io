<template>
  <div class="min-h-screen bg-black text-terminal-green font-mono overflow-hidden">
    <div class="container mx-auto px-6 py-12 relative z-10">
      <!-- 頁面標題 -->
      <header class="mb-12">
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

      <!-- 工作經歷列表 -->
      <section>
        <div class="terminal-prompt mb-6">
          <span class="prompt-symbol">$</span>
          <span>ls experiences/</span>
        </div>
        <div class="space-y-8">
          <div
            v-for="experience in sortedExperiences"
            :key="experience.id"
            class="terminal-card border border-terminal-green/30 bg-black/50 p-6 hover:border-terminal-green transition-all"
          >
            <!-- 職位標題與時間 -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
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
              <div class="text-right ml-4">
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

            <!-- 工作職責 -->
            <div class="mt-6">
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
            <div v-if="experience.technologies && experience.technologies.length > 0" class="mt-6">
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
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { experiences } from '../data'

const isTyping = ref(false)

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
</style>

