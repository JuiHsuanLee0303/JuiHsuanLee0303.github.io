<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[100] bg-black text-terminal-green font-mono overflow-hidden flex items-center justify-center"
    >
      <div class="w-full max-w-4xl px-6 py-8">
        <!-- 關機訊息 -->
        <div v-if="stage >= 1" class="space-y-2 text-sm">
          <div class="text-terminal-green/80">Shutting down system...</div>
          <div v-if="stage >= 2" class="text-terminal-green/60">Stopping services...</div>
          <div v-if="stage >= 3" class="text-terminal-green/60">[OK] Network service stopped</div>
          <div v-if="stage >= 3" class="text-terminal-green/60">[OK] File system unmounted</div>
          <div v-if="stage >= 3" class="text-terminal-green/60">[OK] Display service stopped</div>
          <div v-if="stage >= 4" class="text-terminal-green/60 mt-4">Saving system state...</div>
          <div v-if="stage >= 5" class="text-terminal-green/60">System halted.</div>
          <div v-if="stage >= 6" class="text-terminal-green/40 mt-6 text-xs">
            Please refresh the page to restart.
          </div>
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

// 階段 1: 開始關機
const startStage1 = () => {
  stage.value = 1
  addTimer(() => {
    // 階段 2: 停止服務
    stage.value = 2
    addTimer(() => {
      // 階段 3: 服務已停止
      stage.value = 3
      addTimer(() => {
        // 階段 4: 保存系統狀態
        stage.value = 4
        addTimer(() => {
          // 階段 5: 系統已停止
          stage.value = 5
          addTimer(() => {
            // 階段 6: 顯示提示訊息
            stage.value = 6
            addTimer(() => {
              // 完成關機動畫
              props.onComplete()
            }, 2000)
          }, 1000)
        }, 800)
      }, 1200)
    }, 800)
  }, 1000)
}

onMounted(() => {
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
</style>

