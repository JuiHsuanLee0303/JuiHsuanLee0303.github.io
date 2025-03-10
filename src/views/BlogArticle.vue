<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import MarkdownIt from 'markdown-it'

// 創建 markdown-it 實例
const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

// 控制頁面載入動畫的狀態
const isVisible = ref(false)

// 獲取文章數據
const article = computed(() => {
  const index = parseInt(route.params.id as string)
  return articlesStore.articles[index]
})

// 將 Markdown 轉換為 HTML
const articleContent = computed(() => {
  if (!article.value) return ''
  return md.render(article.value.content)
})

// 如果文章不存在，重定向到博客首頁
if (!article.value) {
  router.push('/blog')
}

// 頁面載入時的動畫效果
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <main v-if="article"
    class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8">
    <div class="container mx-auto px-4 transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
      <div
        class="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 overflow-hidden">
        <img :src="article.image" :alt="article.title" class="w-full h-64 object-contain bg-slate-900 p-6" />

        <div class="p-8">
          <div class="flex items-center text-slate-400 text-sm mb-4">
            <span>{{ article.date }}</span>
            <span class="mx-2">•</span>
            <span>{{ article.category }}</span>
          </div>

          <h1 class="text-4xl font-bold text-violet-400 mb-6">
            {{ article.title }}
          </h1>

          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in article.tags" :key="tag"
              class="px-3 py-1 bg-slate-700/50 text-violet-300 rounded-full text-sm">
              {{ tag }}
            </span>
          </div>

          <div class="prose prose-invert prose-violet max-w-none">
            <div v-html="articleContent"></div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <router-link to="/blog"
          class="px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-full transition-colors duration-300">
          返回文章列表
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.prose {
  max-width: none;
}

:deep(.prose h1) {
  color: theme('colors.violet.400');
  margin-top: 2rem;
}

:deep(.prose h2) {
  color: theme('colors.violet.300');
  margin-top: 1.5rem;
}

:deep(.prose h3) {
  color: theme('colors.violet.200');
  margin-top: 1.25rem;
}

:deep(.prose p) {
  color: theme('colors.slate.300');
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(.prose code) {
  color: theme('colors.violet.300');
  background-color: theme('colors.slate.700');
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
}

:deep(.prose pre) {
  background-color: theme('colors.slate.900');
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
}

:deep(.prose pre code) {
  background-color: transparent;
  padding: 0;
  color: theme('colors.slate.300');
}

:deep(.prose a) {
  color: theme('colors.violet.400');
  text-decoration: none;
  transition: color 0.3s;
}

:deep(.prose a:hover) {
  color: theme('colors.violet.300');
}

:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
}

:deep(.prose ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
}

:deep(.prose li) {
  color: theme('colors.slate.300');
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

:deep(.prose blockquote) {
  border-left: 4px solid theme('colors.violet.400');
  padding-left: 1rem;
  margin-left: 0;
  color: theme('colors.slate.400');
}

:deep(.prose img) {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

:deep(.prose th) {
  background-color: theme('colors.slate.700');
  color: theme('colors.violet.300');
  padding: 0.75rem;
  text-align: left;
}

:deep(.prose td) {
  padding: 0.75rem;
  border-bottom: 1px solid theme('colors.slate.700');
}

:deep(.prose tr:hover) {
  background-color: theme('colors.slate.800/50');
}
</style>
