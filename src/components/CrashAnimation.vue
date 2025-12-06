<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[200] bg-black overflow-hidden"
    >
      <!-- 錯誤訊息階段 -->
      <div v-if="stage === 1" class="h-full flex items-center justify-center">
        <div class="text-red-500 font-mono text-sm px-6">
          <!-- 第一條錯誤訊息 -->
          <div v-if="showError1" class="mb-4 animate-fade-in">
            rm: cannot remove '/': Permission denied
          </div>
          <!-- 第二條錯誤訊息 -->
          <div v-if="showError2" class="text-red-400 animate-fade-in">
            rm: cannot remove '/': Is a directory
          </div>
          <!-- 第三條錯誤訊息 -->
          <div v-if="showError3" class="text-red-300 mt-4 animate-fade-in">
            ...wait, what?
          </div>
          <!-- 彩蛋訊息 -->
          <div v-if="showEasterEgg" class="text-yellow-400 mt-6 animate-fade-in text-xs">
            <div class="mb-2">Easter Egg Detected!</div>
            <div class="text-yellow-300/80">
              You tried to delete the root directory...
              <br>
              Fun fact: In real systems, rm -rf / would destroy everything.<br>
              But here, it just triggers a cool crash animation!<br>
              <br>
              <span class="text-yellow-200">Pro tip: Don't run dangerous commands on production systems!</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 系統錯誤階段 -->
      <div v-if="stage === 2" class="h-full flex items-center justify-center bg-red-950">
        <div class="text-white font-mono text-center px-6">
          <div class="text-2xl mb-4 font-bold">⚠️ CRITICAL ERROR ⚠️</div>
          <div class="text-lg mb-2">System integrity compromised</div>
          <div class="text-sm">Attempting to recover...</div>
        </div>
      </div>

      <!-- 崩潰動畫階段 -->
      <div v-if="stage >= 3" class="h-full relative overflow-hidden">
        <!-- 藍屏效果 -->
        <div class="absolute inset-0 bg-blue-600 flex items-center justify-center">
          <div class="text-white font-mono text-center px-6 max-w-2xl">
            <div class="text-[10em] mb-12 font-bold">:(</div>
            <div class="text-xl mb-4">Your website has encountered a problem</div>
            <div class="text-sm mb-2">and needs to restart.</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

const props = defineProps({
  onComplete: {
    type: Function,
    required: true
  }
})

const isVisible = ref(true)
const stage = ref(1)
const progress = ref(0)
const errorMessages = ref([])
const cracks = ref([])
const crashStyle = ref({})
const showError1 = ref(false)
const showError2 = ref(false)
const showError3 = ref(false)
const showEasterEgg = ref(false)

let timers = []
let intervals = []

const clearAllTimers = () => {
  timers.forEach(timer => clearTimeout(timer))
  intervals.forEach(interval => clearInterval(interval))
  timers = []
  intervals = []
}

const addTimer = (callback, delay) => {
  const timer = setTimeout(callback, delay)
  timers.push(timer)
  return timer
}

const addInterval = (callback, delay) => {
  const interval = setInterval(callback, delay)
  intervals.push(interval)
  return interval
}

// 生成隨機錯誤訊息
const generateErrorMessages = () => {
  const messages = [
    'ERROR 0x00000001',
    'KERNEL PANIC',
    'SEGMENTATION FAULT',
    'NULL POINTER EXCEPTION',
    'STACK OVERFLOW',
    'MEMORY CORRUPTION',
    'FILE SYSTEM ERROR',
    'ACCESS VIOLATION',
    'SYSTEM HALTED',
    'FATAL ERROR',
    'rm -rf / executed',
    'Permission denied',
    'Cannot remove root',
    'Critical failure'
  ]
  
  errorMessages.value = []
  for (let i = 0; i < 20; i++) {
    errorMessages.value.push({
      text: messages[Math.floor(Math.random() * messages.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 30,
      opacity: 0.7 + Math.random() * 0.3
    })
  }
}

// 生成裂痕效果
const generateCracks = () => {
  cracks.value = []
  for (let i = 0; i < 15; i++) {
    cracks.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: 50 + Math.random() * 100,
      height: 2 + Math.random() * 5,
      rotation: Math.random() * 360
    })
  }
}

// 更新崩潰樣式
const updateCrashStyle = () => {
  crashStyle.value = {
    filter: `hue-rotate(${Math.random() * 360}deg) brightness(${0.8 + Math.random() * 0.4})`,
    transform: `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px) rotate(${(Math.random() - 0.5) * 2}deg)`
  }
}

onMounted(() => {
  // 階段 1: 逐一顯示錯誤訊息
  // 第一條訊息
  addTimer(() => {
    showError1.value = true
    // 第二條訊息
    addTimer(() => {
      showError2.value = true
      // 第三條訊息
      addTimer(() => {
        showError3.value = true
        // 彩蛋訊息
        addTimer(() => {
          showEasterEgg.value = true
          // 顯示彩蛋後，等待一段時間再進入下一階段
          addTimer(() => {
            stage.value = 2
            // 階段 2: 系統錯誤
            addTimer(() => {
              stage.value = 3
              generateErrorMessages()
              generateCracks()
              
              // 進度條動畫
              const progressInterval = addInterval(() => {
                if (progress.value < 100) {
                  progress.value += 2
                  updateCrashStyle()
                } else {
                  clearInterval(progressInterval)
                }
              }, 100)
              
              // 階段 3: 崩潰動畫
              addTimer(() => {
                stage.value = 4
                
                // 持續更新崩潰效果
                const crashInterval = addInterval(() => {
                  updateCrashStyle()
                  // 隨機移動錯誤訊息
                  errorMessages.value.forEach(msg => {
                    msg.x += (Math.random() - 0.5) * 2
                    msg.y += (Math.random() - 0.5) * 2
                    msg.rotation += (Math.random() - 0.5) * 5
                  })
                }, 100)
                
                // 完成後回調
                addTimer(() => {
                  props.onComplete()
                }, 3000)
              }, 2000)
            }, 2000)
          }, 3000)
        }, 800)
      }, 600)
    }, 600)
  }, 300)
})

onUnmounted(() => {
  clearAllTimers()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes shake {
  0%, 100% { transform: translate(0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
  20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>

