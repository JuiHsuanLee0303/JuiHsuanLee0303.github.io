<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import BootAnimation from './components/BootAnimation.vue'
import ShutdownAnimation from './components/ShutdownAnimation.vue'

const route = useRoute()
const isTerminalPage = computed(() => route.path === '/terminal')
const showBootAnimation = ref(false)
const showShutdownAnimation = ref(false)
const showMainContent = ref(true)

onMounted(() => {
  // 確保文檔始終使用深色模式（終端機風格）
  document.documentElement.classList.add('dark')
  
  // 檢查是否已經看過開機動畫
  const hasSeenBootAnimation = localStorage.getItem('hasSeenBootAnimation')
  
  if (!hasSeenBootAnimation) {
    // 第一次訪問，顯示開機動畫
    showBootAnimation.value = true
    showMainContent.value = false
  }
})

const handleBootAnimationComplete = () => {
  // 設置標記，表示已經看過動畫
  localStorage.setItem('hasSeenBootAnimation', 'true')
  // 隱藏動畫
  showBootAnimation.value = false
  showMainContent.value = true
}

const handleShutdown = () => {
  // 顯示關機動畫
  showShutdownAnimation.value = true
  showMainContent.value = false
}

const handleShutdownComplete = () => {
  // 清除開機動畫標記，這樣重新整理後會顯示開機動畫
  localStorage.removeItem('hasSeenBootAnimation')
  // 關機動畫完成後，頁面會保持全黑狀態
  // 用戶需要重新整理頁面才會看到開機動畫
}

// 提供關機函數給子組件使用
provide('shutdown', handleShutdown)
</script>

<template>
  <div class="h-screen bg-black flex flex-col overflow-hidden relative">
    <div class="pointer-events-none absolute inset-0 opacity-70">
      <div class="ambient-layer ambient-layer-primary absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,255,0,0.08),transparent_28%)]"></div>
      <div class="ambient-layer ambient-layer-grid absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:28px_28px]"></div>
      <div class="ambient-layer ambient-layer-orb absolute -left-24 top-20 h-72 w-72 rounded-full bg-terminal-green/6 blur-3xl"></div>
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.2)_40%,rgba(0,0,0,0.6))]"></div>
    </div>

    <!-- 開機動畫（覆蓋在主內容上方） -->
    <BootAnimation 
      v-if="showBootAnimation"
      :on-complete="handleBootAnimationComplete"
    />
    
    <!-- 關機動畫（覆蓋在主內容上方） -->
    <ShutdownAnimation 
      v-if="showShutdownAnimation"
      :on-complete="handleShutdownComplete"
    />
    
    <!-- 主內容（始終存在，動畫完成後顯示） -->
    <div v-if="showMainContent" class="h-screen bg-black/80 backdrop-blur-[1px] flex flex-col overflow-hidden relative z-10">
      <Navbar />
      <div
        class="flex-1"
        :class="isTerminalPage ? 'overflow-hidden' : 'overflow-y-auto'"
      >
        <router-view v-slot="{ Component }">
          <transition name="page-shell" mode="out-in" appear>
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ambient-layer-primary {
  animation: ambientDrift 18s ease-in-out infinite alternate;
}

.ambient-layer-grid {
  animation: gridPulse 12s ease-in-out infinite;
}

.ambient-layer-orb {
  animation: orbFloat 16s ease-in-out infinite alternate;
}

.page-shell-enter-active,
.page-shell-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-shell-enter-from,
.page-shell-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes ambientDrift {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(0, -18px, 0) scale(1.04);
  }
}

@keyframes gridPulse {
  0%,
  100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.55;
  }
}

@keyframes orbFloat {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(48px, 24px, 0);
  }
}
</style>
