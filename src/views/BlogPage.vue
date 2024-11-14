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

// 部落格文章資料
const blogPosts = [
  {
    date: '2024年1月1日',
    category: '技術分享',
    title: 'Vue 3 開發技巧分享',
    content: '分享一些在使用 Vue 3 開發過程中的實用技巧和最佳實踐，幫助開發者提升開發效率...',
    tags: ['Vue.js', '前端開發'],
    image: 'https://via.placeholder.com/400x300',
  },
  {
    date: '2023年12月25日',
    category: '心得分享',
    title: '我的全端開發之路',
    content: '分享我從前端工程師轉型為全端工程師的經歷，以及在這個過程中學到的寶貴經驗...',
    tags: ['職涯發展', '全端開發'],
    image: 'https://via.placeholder.com/400x300',
  },
  {
    date: '2023年12月15日',
    category: '教學',
    title: 'TypeScript 入門指南',
    content: '為初學者準備的 TypeScript 入門教學，從基礎概念到實際應用，循序漸進地學習...',
    tags: ['TypeScript', '程式教學'],
    image: 'https://via.placeholder.com/400x300',
  },
]
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
        部落格文章
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(post, index) in blogPosts"
          :key="index"
          class="bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-500 overflow-hidden animate-fadeIn"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-48 object-cover hover:scale-105 transition-all duration-500"
          />
          <div class="p-6">
            <div class="flex items-center text-slate-400 text-sm mb-2">
              <span>{{ post.date }}</span>
              <span class="mx-2">•</span>
              <span>{{ post.category }}</span>
            </div>
            <h3
              class="text-xl font-semibold text-violet-400 mb-2 hover:text-violet-300 transition-colors duration-300"
            >
              {{ post.title }}
            </h3>
            <p class="text-slate-300 mb-4 line-clamp-3">
              {{ post.content }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-3 py-1 bg-slate-700/50 text-violet-300 rounded-full text-sm hover:bg-slate-700 transition-colors duration-300"
              >
                {{ tag }}
              </span>
            </div>
            <a
              href="#"
              class="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300"
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
