<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 介面定義
interface Certification {
  title: string
  issueDate: string
  validPeriod: string
  imageUrl: string
}

// 證照資料
const certifications: Certification[] = [
  {
    title: 'AWS 解決方案架構師',
    issueDate: '2023年12月',
    validPeriod: '3年',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: 'Microsoft Azure 認證',
    issueDate: '2023年10月',
    validPeriod: '2年',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    title: 'Google Cloud 專業認證',
    issueDate: '2023年8月',
    validPeriod: '2年',
    imageUrl: 'https://via.placeholder.com/100',
  },
]

// 動畫控制
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <main
    class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8"
  >
    <div
      class="container mx-auto px-4 transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <h1
        class="text-6xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-12 hover:scale-105 transition-all duration-300 animate-fadeIn"
      >
        專業證照
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transform hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="flex items-center justify-center mb-6">
            <img
              :src="cert.imageUrl"
              :alt="cert.title"
              class="w-24 h-24 object-contain rounded-xl shadow-lg hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3
            class="text-xl font-semibold text-violet-300 text-center mb-4 hover:text-violet-400 transition-colors duration-300"
          >
            {{ cert.title }}
          </h3>
          <p class="text-slate-300 text-center mb-4">發證日期：{{ cert.issueDate }}</p>
          <div class="text-center">
            <span
              class="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm border border-violet-500/30"
            >
              有效期限：{{ cert.validPeriod }}
            </span>
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
</style>
