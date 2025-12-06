<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import ThreeBackground from './components/ThreeBackground.vue'
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
  <div class="h-screen bg-black flex flex-col overflow-hidden">
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
    <div v-if="showMainContent" class="h-screen bg-black flex flex-col overflow-hidden">
      <ThreeBackground />
      <Navbar />
      <div 
        class="flex-1"
        :class="isTerminalPage ? 'overflow-hidden' : 'overflow-y-auto'"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>