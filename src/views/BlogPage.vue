<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useArticlesStore } from '@/stores/articles'
import MarkdownIt from 'markdown-it'

// 創建 markdown-it 實例，用於摘要顯示的簡化版本
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

const articlesStore = useArticlesStore()
const isVisible = ref(false)
const selectedCategory = ref('')
const selectedYear = ref('')
const selectedTag = ref('')

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// 獲取所有文章
const blogPosts = articlesStore.sortedArticles

// 計算所有分類
const categories = computed(() => {
  const cats = new Set(blogPosts.map((post) => post.category))
  return Array.from(cats)
})

// 計算所有年份
const years = computed(() => {
  const years = new Set(blogPosts.map((post) => post.date.split('-')[0]))
  return Array.from(years).sort((a, b) => Number(b) - Number(a))
})

// 計算所有標籤
const tags = computed(() => {
  const allTags = new Set(blogPosts.flatMap((post) => post.tags))
  return Array.from(allTags).sort()
})

// 過濾文章
const filteredPosts = computed(() => {
  return blogPosts.filter((post) => {
    const matchCategory = !selectedCategory.value || post.category === selectedCategory.value
    const matchYear = !selectedYear.value || post.date.split('-')[0] === selectedYear.value
    const matchTag = !selectedTag.value || post.tags.includes(selectedTag.value)
    return matchCategory && matchYear && matchTag
  })
})

// 重置篩選
const resetFilters = () => {
  selectedCategory.value = ''
  selectedYear.value = ''
  selectedTag.value = ''
}

// 格式化日期
const formatDate = (dateString: string) => {
  try {
    // 確保日期字符串格式正確
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // 月份從0開始，所以要減1

    // 檢查日期是否有效
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString // 如果出錯則返回原始字符串
  }
}

// 獲取文章摘要
const getContentPreview = (content: string) => {
  // 移除 Markdown 標題
  const withoutHeaders = content.replace(/^#+ .*$/gm, '')
  // 移除代碼塊
  const withoutCodeBlocks = withoutHeaders.replace(/```[\s\S]*?```/g, '')
  // 移除圖片
  const withoutImages = withoutCodeBlocks.replace(/!\[.*?\]\(.*?\)/g, '')
  // 轉換為 HTML
  const html = md.render(withoutImages)
  // 移除 HTML 標籤
  const plainText = html.replace(/<[^>]*>/g, '')
  // 取前 150 個字符
  return plainText.trim().slice(0, 150) + '...'
}
</script>

<template>
  <main
    class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8 pb-16"
  >
    <div
      class="max-w-7xl mx-auto px-4 transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 頁面標題 -->
      <div class="text-center mb-16 animate-fadeIn" style="animation-delay: 0.3s">
        <h1
          class="text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-4"
        >
          部落格
        </h1>
        <p class="text-slate-300 max-w-2xl mx-auto">分享我在學習過程中的心得、技術研究和解決方案</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 側邊欄 -->
        <aside class="lg:w-1/4 space-y-8 animate-fadeIn" style="animation-delay: 0.4s">
          <!-- 分類篩選 -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6">
            <h2 class="text-xl font-semibold text-violet-400 mb-4">文章分類</h2>
            <div class="space-y-2">
              <button
                class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-300"
                :class="
                  !selectedCategory
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-slate-300 hover:bg-slate-700/50'
                "
                @click="selectedCategory = ''"
              >
                全部分類
              </button>
              <button
                v-for="category in categories"
                :key="category"
                class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-300"
                :class="
                  selectedCategory === category
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-slate-300 hover:bg-slate-700/50'
                "
                @click="selectedCategory = category"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- 年份篩選 -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6">
            <h2 class="text-xl font-semibold text-violet-400 mb-4">年份篩選</h2>
            <div class="space-y-2">
              <button
                class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-300"
                :class="
                  !selectedYear
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-slate-300 hover:bg-slate-700/50'
                "
                @click="selectedYear = ''"
              >
                全部年份
              </button>
              <button
                v-for="year in years"
                :key="year"
                class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-300"
                :class="
                  selectedYear === year
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-slate-300 hover:bg-slate-700/50'
                "
                @click="selectedYear = year"
              >
                {{ year }}
              </button>
            </div>
          </div>

          <!-- 標籤篩選 -->
          <div class="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6">
            <h2 class="text-xl font-semibold text-violet-400 mb-4">標籤篩選</h2>
            <div class="flex flex-wrap gap-2">
              <button
                class="px-3 py-1 rounded-full transition-colors duration-300"
                :class="
                  !selectedTag
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                "
                @click="selectedTag = ''"
              >
                全部標籤
              </button>
              <button
                v-for="tag in tags"
                :key="tag"
                class="px-3 py-1 rounded-full transition-colors duration-300"
                :class="
                  selectedTag === tag
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                "
                @click="selectedTag = tag"
              >
                #{{ tag }}
              </button>
            </div>
          </div>

          <!-- 重置按鈕 -->
          <button
            v-if="selectedCategory || selectedYear || selectedTag"
            @click="resetFilters"
            class="w-full px-4 py-2 bg-violet-500/10 text-violet-400 rounded-lg hover:bg-violet-500/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="i-carbon-reset"></span>
            重置篩選
          </button>
        </aside>

        <!-- 文章列表 -->
        <div class="lg:w-3/4">
          <div v-if="filteredPosts.length" class="grid grid-cols-1 gap-12">
            <article
              v-for="(post, index) in filteredPosts"
              :key="index"
              class="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-500 overflow-hidden animate-fadeIn"
              :style="`animation-delay: ${index * 0.1 + 0.4}s`"
            >
              <div class="md:flex">
                <!-- 文章圖片 -->
                <div class="md:w-1/3 relative overflow-hidden">
                  <img
                    :src="post.image"
                    :alt="post.title"
                    class="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <!-- 文章內容 -->
                <div class="md:w-2/3 p-8">
                  <!-- 文章資訊 -->
                  <div class="flex items-center text-slate-400 text-sm mb-3 space-x-4">
                    <span class="flex items-center">
                      <span class="i-carbon-calendar mr-2"></span>
                      {{ formatDate(post.date) }}
                    </span>
                    <span class="flex items-center">
                      <span class="i-carbon-folder mr-2"></span>
                      {{ post.category }}
                    </span>
                  </div>

                  <!-- 文章標題 -->
                  <h2
                    class="text-2xl font-bold text-violet-400 mb-4 hover:text-violet-300 transition-colors duration-300 line-clamp-2"
                  >
                    {{ post.title }}
                  </h2>

                  <!-- 文章摘要 -->
                  <p class="text-slate-300 mb-6 line-clamp-3">
                    {{ getContentPreview(post.content) }}
                  </p>

                  <!-- 標籤和閱讀更多 -->
                  <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in post.tags"
                        :key="tag"
                        class="px-3 py-1 bg-slate-700/50 text-violet-300 rounded-full text-sm hover:bg-slate-700 transition-colors duration-300"
                      >
                        #{{ tag }}
                      </span>
                    </div>
                    <router-link
                      :to="`/blog/${index}`"
                      class="inline-flex items-center text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300 group"
                    >
                      閱讀更多
                      <span
                        class="i-carbon-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"
                      ></span>
                    </router-link>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- 無結果提示 -->
          <div v-else class="text-center py-12 animate-fadeIn">
            <p class="text-slate-400 text-lg">沒有找到符合條件的文章</p>
            <button
              @click="resetFilters"
              class="mt-4 px-6 py-2 bg-violet-500/10 text-violet-400 rounded-lg hover:bg-violet-500/20 transition-all duration-300"
            >
              重置篩選
            </button>
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
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

/* 確保圖片容器保持固定比例 */
.md\:w-1\/3 {
  aspect-ratio: 16/9;
}

/* 添加滾動條樣式 */
aside {
  position: sticky;
  top: 5rem;
  height: fit-content;
}

@media (max-width: 1024px) {
  aside {
    position: static;
  }
}

/* 添加 Markdown 內容的基本樣式 */
:deep(.markdown-content) {
  color: theme('colors.slate.300');
}

:deep(.markdown-content p) {
  margin: 0.5rem 0;
}

:deep(.markdown-content code) {
  color: theme('colors.violet.300');
  background-color: theme('colors.slate.700/50');
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
</style>
