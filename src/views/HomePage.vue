<template>
  <div class="min-h-screen bg-black text-terminal-green font-mono overflow-hidden relative">
    <div class="container mx-auto px-6 py-12 relative z-10">
      <!-- ASCII藝術標題 -->
      <header class="mb-12">
        <div class="ascii-art text-xs md:text-sm mb-6 text-terminal-green/80">
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
      </header>

      <!-- 自我介紹 -->
      <section class="mb-12">
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
      <section class="mb-12">
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>ls skills/</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="terminal-card p-6 hover:border-terminal-green transition-all"
          >
            <div class="mb-4">
              <h3 class="text-xl font-bold text-terminal-green mb-2">
                > {{ skill.title }}
              </h3>
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
          </div>
        </div>
      </section>

      <!-- 研究亮點 -->
      <section class="mb-12">
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>cat research_highlights.txt</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="terminal-card p-6 hover:border-terminal-green transition-all"
          >
            <h3 class="text-xl font-bold text-terminal-green mb-2">
              > {{ project.title }}
            </h3>
            <p class="text-terminal-green/70 text-sm mb-4">
              {{ project.description }}
            </p>
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
      <section>
        <div class="terminal-prompt mb-4">
          <span class="prompt-symbol">$</span>
          <span>./quick_links.sh</span>
        </div>
        <div class="terminal-card p-6">
          <div class="space-y-2 text-terminal-green/80">
            <div v-for="link in quickLinks" :key="link.id">
              <span class="text-terminal-green">[{{ link.id }}]</span>
              <router-link
                v-if="link.type === 'router'"
                :to="link.path"
                class="ml-2 hover:text-terminal-green underline"
              >
                {{ link.label }}
              </router-link>
              <a
                v-else
                :href="link.path"
                :target="link.type === 'external' ? '_blank' : undefined"
                class="ml-2 hover:text-terminal-green underline"
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
import { ref, onMounted, onUnmounted } from 'vue'
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
})
</script>

<style scoped>
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
</style>
