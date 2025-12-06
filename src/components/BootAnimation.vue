<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-50 bg-black text-terminal-green font-mono overflow-hidden flex items-center justify-center"
    >
      <div class="w-full max-w-4xl px-6 py-8">
        <!-- BIOS 開機訊息 -->
        <div v-if="stage >= 1" class="space-y-1 text-sm">
          <div class="text-terminal-green/80">BIOS Version 2.0.0</div>
          <div class="text-terminal-green/60">Copyright (C) 2024</div>
          <div class="text-terminal-green/60 mt-4">Initializing system...</div>
          <div v-if="stage >= 2" class="text-terminal-green/60">Checking RAM... OK</div>
          <div v-if="stage >= 2" class="text-terminal-green/60">Checking CPU... OK</div>
          <div v-if="stage >= 2" class="text-terminal-green/60">Checking storage... OK</div>
          <div v-if="stage >= 2" class="text-terminal-green/60">Loading boot sector...</div>
        </div>

        <!-- 系統載入訊息 -->
        <div v-if="stage >= 3" class="mt-6 space-y-1 text-sm">
          <div class="text-terminal-green/70">System boot completed.</div>
          <div class="text-terminal-green/70">Starting services...</div>
          <div v-if="stage >= 4" class="text-terminal-green/60">[OK] Network service</div>
          <div v-if="stage >= 4" class="text-terminal-green/60">[OK] File system</div>
          <div v-if="stage >= 4" class="text-terminal-green/60">[OK] Display service</div>
        </div>

        <!-- 歡迎字樣 -->
        <div v-if="stage >= 5" class="mt-8">
          <div class="text-terminal-green text-lg mb-2">Welcome to Jui-Hsuan Lee's Website</div>
          <div class="text-terminal-green/70 text-sm">System ready. Initializing interface...</div>
        </div>

        <!-- 自動輸入指令 -->
        <div v-if="stage >= 6" class="mt-8">
          <div class="flex items-center gap-2">
            <span class="prompt-symbol">$</span>
            <span class="text-terminal-green">{{ displayedCommand }}</span>
            <span v-if="isTypingCommand" class="cursor-blink">_</span>
          </div>
        </div>

        <!-- 運行指令輸出 -->
        <div v-if="stage >= 7" class="mt-4 space-y-2 text-sm">
          <div class="text-terminal-green/70">Starting web server...</div>
          <div v-if="commandOutput.length > 0" class="text-terminal-green/60">
            <div v-for="(line, index) in commandOutput" :key="index" class="ml-4">
              {{ line }}
            </div>
          </div>
          <div v-if="showProgress" class="mt-4">
            <div class="flex items-center gap-2 text-terminal-green/70">
              <span>Loading:</span>
              <div class="flex-1 bg-terminal-green/10 border border-terminal-green/30 h-2">
                <div
                  class="bg-terminal-green h-full transition-all duration-300"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
              <span class="text-terminal-green/60">{{ progress }}%</span>
            </div>
          </div>
        </div>

        <!-- 完成訊息 -->
        <div v-if="stage >= 8" class="mt-6 text-terminal-green/80 text-sm">
          <div>✓ System initialization complete</div>
          <div class="mt-2 text-terminal-green/60">Redirecting to homepage...</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  onComplete: {
    type: Function,
    required: true
  }
})

const isVisible = ref(true)
const stage = ref(0)
const displayedCommand = ref('')
const isTypingCommand = ref(false)
const commandOutput = ref([])
const showProgress = ref(false)
const progress = ref(0)

const fullCommand = './start.sh'
const outputLines = [
  'Initializing components...',
  'Loading assets...',
  'Connecting to services...',
  'Rendering interface...'
]

let timers = []

const clearAllTimers = () => {
  timers.forEach(timer => clearTimeout(timer))
  timers = []
}

const addTimer = (callback, delay) => {
  const timer = setTimeout(callback, delay)
  timers.push(timer)
  return timer
}

// 階段 1: BIOS 開機訊息
const startStage1 = () => {
  stage.value = 1
  addTimer(() => {
    // 階段 2: 系統載入訊息
    stage.value = 2
    addTimer(() => {
      // 階段 3: 載入完成
      stage.value = 3
      addTimer(() => {
        // 階段 4: 服務啟動
        stage.value = 4
        addTimer(() => {
          // 階段 5: 歡迎字樣
          stage.value = 5
          addTimer(() => {
            // 階段 6: 自動輸入指令
            stage.value = 6
            startTypingCommand()
          }, 2000)
        }, 1500)
      }, 1000)
    }, 1500)
  }, 2500)
}

// 自動輸入指令
const startTypingCommand = () => {
  isTypingCommand.value = true
  let charIndex = 0
  
  const typeCommand = () => {
    if (charIndex < fullCommand.length) {
      displayedCommand.value = fullCommand.substring(0, charIndex + 1)
      charIndex++
      addTimer(typeCommand, 100)
    } else {
      isTypingCommand.value = false
      addTimer(() => {
        // 階段 7: 運行指令輸出
        stage.value = 7
        startCommandOutput()
      }, 500)
    }
  }
  
  typeCommand()
}

// 運行指令輸出
const startCommandOutput = () => {
  let lineIndex = 0
  
  const addOutputLine = () => {
    if (lineIndex < outputLines.length) {
      commandOutput.value.push(outputLines[lineIndex])
      lineIndex++
      addTimer(addOutputLine, 600)
    } else {
      showProgress.value = true
      startProgress()
    }
  }
  
  addOutputLine()
}

// 進度條動畫
const startProgress = () => {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 5
    } else {
      clearInterval(interval)
      addTimer(() => {
        // 階段 8: 完成並淡出
        stage.value = 8
        addTimer(() => {
          isVisible.value = false
          addTimer(() => {
            props.onComplete()
          }, 500)
        }, 1500)
      }, 500)
    }
  }, 100)
}

onMounted(() => {
  // 開始動畫序列
  startStage1()
})

onUnmounted(() => {
  clearAllTimers()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.prompt-symbol {
  color: #00ff00;
  font-weight: bold;
}

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>

