<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 介面定義
interface NewsItem {
  title: string
  content: string
  date: string
}

// 新聞資料
const newsItems: NewsItem[] = [
  {
    title: '新產品發布會預告',
    content: '我們將於下個月舉辦新產品發布會，屆時將展示最新的技術成果和創新方案。',
    date: '2024年1月15日',
  },
  {
    title: '技術研討會回顧',
    content: '上週的技術研討會圓滿結束，感謝所有與會者的參與和分享。以下是會議重點摘要。',
    date: '2024年1月10日',
  },
  {
    title: '年度技術報告發布',
    content: '我們剛發布了2023年度技術發展報告，詳細介紹了過去一年的技術創新和未來展望。',
    date: '2024年1月5日',
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
        最新動態
      </h1>

      <div class="grid gap-8">
        <div
          v-for="(news, index) in newsItems"
          :key="index"
          class="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transform hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <h2
            class="text-2xl font-semibold text-violet-300 mb-4 hover:text-violet-400 transition-colors duration-300"
          >
            {{ news.title }}
          </h2>
          <p class="text-slate-300 mb-6">
            {{ news.content }}
          </p>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-400">發布日期：{{ news.date }}</span>
            <a
              href="#"
              class="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full hover:bg-violet-500/30 transition-all duration-300"
            >
              閱讀更多
            </a>
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
