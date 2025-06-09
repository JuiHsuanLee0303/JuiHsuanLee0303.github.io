<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Navbar from './components/Navbar.vue'
import Mouse from './components/Mouse.vue'
import BackgroundEffects from './components/BackgroundEffects.vue'
import router from './router'

// 管理暗色模式狀態
const isDark = ref(false)

// 切換暗色模式
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', isDark.value.toString())
  updateDarkModeClass()
}

// 更新文檔類別
const updateDarkModeClass = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// 初始化暗色模式
onMounted(() => {
  // 檢查 localStorage 中的設定
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDark.value = savedDarkMode === 'true'
  } else {
    // 如果沒有保存的設定，則使用系統偏好
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateDarkModeClass()
})

// 監聽系統主題變化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const handleMediaQueryChange = (e) => {
  if (localStorage.getItem('darkMode') === null) {
    isDark.value = e.matches
    updateDarkModeClass()
  }
}

onMounted(() => {
  mediaQuery.addEventListener('change', handleMediaQueryChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', handleMediaQueryChange)
})
</script>

<template>
  <div class="min-h-screen">
    <Navbar :isDark="isDark" @toggle-dark-mode="toggleDarkMode" />
    <Mouse />
    <BackgroundEffects />
    <router-view />
  </div>
</template>