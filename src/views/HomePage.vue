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
          <div class="mb-2">Jui-Hsuan Lee</div>
          <div class="text-terminal-green/70 text-sm">// 學術研究者 | AI工程師 | 資安研究者</div>
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
            <p>
              > 歡迎來到我的個人網站
            </p>
            <p>
              > 我專注於人工智慧、自然語言處理、資訊安全等領域的研究
            </p>
            <p>
              > 致力於將理論研究與實際應用相結合，推動技術創新
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
                class="text-terminal-green/60 text-xs"
              >
                - {{ tech.name }}
              </div>
            </div>
            <div class="mt-4 space-y-2">
              <div
                v-for="level in skill.skillLevels"
                :key="level.name"
                class="text-xs"
              >
                <div class="flex justify-between mb-1">
                  <span class="text-terminal-green/70">{{ level.name }}</span>
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
            <div>
              <span class="text-terminal-green">[1]</span>
              <router-link to="/research" class="ml-2 hover:text-terminal-green underline">
                學術研究
              </router-link>
            </div>
            <div>
              <span class="text-terminal-green">[2]</span>
              <router-link to="/experience" class="ml-2 hover:text-terminal-green underline">
                工作經歷
              </router-link>
            </div>
            <div>
              <span class="text-terminal-green">[3]</span>
              <a href="mailto:juihsuanlee0303@gmail.com" class="ml-2 hover:text-terminal-green underline">
                聯絡我
              </a>
            </div>
            <div>
              <span class="text-terminal-green">[4]</span>
              <a href="https://github.com" target="_blank" class="ml-2 hover:text-terminal-green underline">
                GitHub
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
import { typewriterTexts, skills as skillsData, homeProjects } from '../data'

const isTyping = ref(false)
const displayText = ref('')
const currentTextIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)
let typeTimeout = null

const skills = ref(skillsData)
const projects = ref(homeProjects)

const asciiArt = `
██╗    ██╗ █████╗ ██████╗ ██████╗ ███████╗███╗   ██╗
██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝████╗  ██║
██║ █╗ ██║███████║██████╔╝██████╔╝█████╗  ██╔██╗ ██║
██║███╗██║██╔══██║██╔══██╗██╔══██╗██╔══╝  ██║╚██╗██║
╚███╔███╔╝██║  ██║██║  ██║██║  ██║███████╗██║ ╚████║
 ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝                              
`

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
</style>
