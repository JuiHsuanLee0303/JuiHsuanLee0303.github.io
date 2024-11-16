<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 控制頁面載入動畫的狀態
const isVisible = ref(false)

// 頁面載入時的動畫效果
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// 個人資料
const personalInfo = [
  { label: '所在地', value: '台北市', icon: '📍' },
  { label: '工作經驗', value: '5年+', icon: '💼' },
  { label: '專業領域', value: '全端開發、網頁設計、系統架構', icon: '💡' },
]

// 專業技能
const skills = [
  {
    title: '前端開發',
    icons: 'vue,ts,tailwind',
    color: 'violet',
    borderColor: 'border-violet-500/30',
    hoverScale: 'hover:scale-105',
  },
  {
    title: '後端開發',
    icons: 'nodejs,python,express',
    color: 'violet',
    borderColor: 'border-violet-500/30',
    hoverScale: 'hover:scale-105',
  },
  {
    title: '資料庫',
    icons: 'mongodb,postgres,mysql',
    color: 'violet',
    borderColor: 'border-violet-500/30',
    hoverScale: 'hover:scale-105',
  },
  {
    title: '開發工具',
    icons: 'git,github,docker',
    color: 'violet',
    borderColor: 'border-violet-500/30',
    hoverScale: 'hover:scale-105',
  },
  {
    title: '人工智慧',
    icons: 'sklearn,pytorch,tensorflow',
    color: 'violet',
    borderColor: 'border-violet-500/30',
    hoverScale: 'hover:scale-105',
  },
  {
    title: '測試工具',
    icons: 'jest,cypress,selenium',
    color: 'violet',
    borderColor: 'border-violet-500/30',
    hoverScale: 'hover:scale-105',
  },
]
</script>

<template>
  <main
    class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8"
  >
    <div
      class="container mx-auto px-4 transition-all duration-1000 mb-12"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 標題 -->
      <h1
        class="text-6xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-12 hover:scale-105 transition-all duration-300 animate-fadeIn"
        style="animation-delay: 0.3s"
      >
        關於我
      </h1>

      <!-- 主要內容區塊 -->
      <div
        class="bg-slate-800/80 backdrop-blur-lg max-w-4xl mx-auto rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-500 p-10 animate-fadeIn"
        style="animation-delay: 0.3s"
      >
        <!-- 個人介紹 -->
        <div class="max-w-3xl mx-auto">
          <h2
            class="text-4xl font-semibold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-8 animate-fadeIn hover:scale-105 transition-all duration-300"
            style="animation-delay: 0.5s"
          >
            您好，我是李睿軒
          </h2>
          <p
            class="text-slate-300 text-lg mb-10 leading-relaxed animate-fadeIn hover:text-slate-200 transition-colors duration-300"
            style="animation-delay: 0.6s"
          >
            我是一位熱愛程式開發的全端工程師，擅長運用最新的技術框架打造優質網站。我重視使用者體驗，致力於開發直覺且易用的網頁應用程式。
          </p>

          <!-- 個人資訊列表 -->
          <div class="space-y-4 animate-fadeIn" style="animation-delay: 0.7s">
            <div
              v-for="(info, index) in personalInfo"
              :key="index"
              class="flex items-center p-4 hover:bg-slate-700/50 rounded-xl transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div class="w-8 flex justify-center">
                <span class="text-2xl">{{ info.icon }}</span>
              </div>
              <span class="text-violet-400 font-medium w-32 ml-3">{{ info.label }}</span>
              <span class="text-slate-300 hover:text-slate-200 transition-colors duration-300">{{
                info.value
              }}</span>
            </div>
          </div>

          <!-- 專業技能區塊 -->
          <div class="mt-12 animate-fadeIn" style="animation-delay: 0.8s">
            <h3
              class="text-3xl font-semibold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-8"
            >
              專業技能概述
            </h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div
                v-for="(skill, index) in skills"
                :key="index"
                class="p-5 bg-slate-700/40 backdrop-blur-sm rounded-xl transition-all duration-500 border-2 group"
                :class="[skill.borderColor, skill.hoverScale]"
              >
                <h4
                  :class="`font-medium text-center text-${skill.color}-400 mb-3 text-lg group-hover:scale-105 transition-transform duration-300`"
                >
                  {{ skill.title }}
                </h4>
                <div
                  class="flex justify-center transform group-hover:scale-110 transition-transform duration-300"
                >
                  <img
                    :src="`https://skillicons.dev/icons?i=${skill.icons}`"
                    :alt="skill.title"
                    class="h-14 object-contain hover:brightness-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.scale-102 {
  transform: scale(1.02);
}
</style>
