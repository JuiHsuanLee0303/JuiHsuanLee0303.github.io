<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 overflow-hidden custom-cursor" ref="mainContainer">
    <div v-if="post" class="max-w-4xl mx-auto py-12 px-6">
      
      <!-- 麵包屑導航 -->
      <nav class="mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
        <router-link to="/" class="hover:text-blue-600 dark:hover:text-blue-400">首頁</router-link>
        <span class="mx-2">/</span>
        <router-link to="/blog" class="hover:text-blue-600 dark:hover:text-blue-400">部落格</router-link>
      </nav>
      
      <!-- 文章標頭 -->
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          {{ post.title }}
        </h1>
        <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <span>{{ post.date }}</span>
          <span class="mx-2">·</span>
          <span>{{ post.author }}</span>
          <span class="mx-2">·</span>
          <span>閱讀時間約 {{ readingTime }} 分鐘</span>
        </div>
      </header>

      <!-- 文章內容 -->
      <article 
        class="rendered-markdown max-w-none mb-12"
        v-html="post.content"
      ></article>
      
      <!-- 標籤 -->
      <div class="mb-12">
        <div class="flex flex-wrap gap-3">
          <span v-for="tag in post.tags" :key="tag" class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- 分享按鈕 -->
      <div class="text-center py-8 border-t border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">喜歡這篇文章嗎？分享給朋友吧！</h3>
        <div class="flex justify-center gap-4">
          <a :href="`https://twitter.com/share?url=${currentUrl}&text=${encodedTitle}`" target="_blank" class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            Twitter
          </a>
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`" target="_blank" class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            Facebook
          </a>
          <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodedTitle}`" target="_blank" class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            LinkedIn
          </a>
        </div>
      </div>

    </div>
    <div v-else class="text-center py-24">
      <h2 class="text-2xl font-bold">找不到文章</h2>
      <p class="text-gray-500 mt-2">這篇文章可能已經被移除或是不存在。</p>
      <router-link to="/blog" class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        返回部落格
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 模擬的文章數據庫
const allPosts = {
  'mastering-vue-3-composition-api': {
    title: '精通 Vue 3 Composition API',
    author: 'Jui-Hsuan Lee',
    date: '2023年10月26日',
    tags: ['Vue.js', 'JavaScript', '前端開發'],
    content: `## 前言
Vue 3 的 Composition API 是框架中最具革命性的功能之一。它提供了一種更靈活、可組合的方式來組織元件邏輯，尤其是在處理大型、複雜的元件時，其優勢更加明顯。
      
### 為什麼需要 Composition API？
在 Vue 2 的 Options API 中，我們通常會將元件的邏輯分散在 \`data\`, \`methods\`, \`computed\`, \`watch\` 等不同的選項中。當元件變得複雜時，一個單一功能的相關邏輯會被拆散在各處，難以閱讀和維護。

Composition API 讓我們可以將相關的邏輯組織在一起。例如，所有與處理使用者輸入相關的響應式狀態、方法和計算屬性都可以放在同一個函數中。
      
\`\`\`javascript
import { ref, computed } from 'vue'

export default function useFeature() {
  const count = ref(0)
  const double = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, double, increment }
}
\`\`\`
      
## 結論
Composition API 不僅解決了 Options API 在大型專案中的痛點，還帶來了更好的 TypeScript 支援和邏輯複用能力。對於任何 Vue 開發者來說，掌握它都是至關重要的。`
  },
  // 其他文章...
};

const route = useRoute()
const post = ref(null)

// 載入 marked.js
function loadMarked(callback) {
  if (window.marked) {
    callback(window.marked);
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  script.onload = () => callback(window.marked);
  document.head.appendChild(script);
}


const readingTime = computed(() => {
  if (!post.value || !post.value.content) return 0;
  const text = post.value.content.replace(/<[^>]*>?/gm, ''); // 移除 HTML 標籤
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
});

const currentUrl = computed(() => window.location.href);
const encodedTitle = computed(() => post.value ? encodeURIComponent(post.value.title) : '');

onMounted(() => {
  const slug = route.params.slug;
  const postData = allPosts[slug];
  
  if (postData) {
    loadMarked((marked) => {
        post.value = { ...postData, content: marked.parse(postData.content) };
    });
  }
})
</script>

<style>
/* 非 Scoped 樣式，用於渲染 v-html 內容 */
.rendered-markdown h2 {
  font-size: 1.875rem; /* 30px */
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb; /* gray-200 */
}
.dark .rendered-markdown h2 {
  border-bottom-color: #374151; /* gray-700 */
}

.rendered-markdown h3 {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.rendered-markdown p {
  line-height: 1.75;
  margin-bottom: 1rem;
  font-size: 1.125rem; /* 18px */
}

.rendered-markdown a {
  color: #3b82f6; /* blue-600 */
  text-decoration: underline;
}
.dark .rendered-markdown a {
  color: #60a5fa; /* blue-400 */
}

.rendered-markdown pre {
  background-color: #1f2937; /* gray-800 */
  color: #e5e7eb; /* gray-200 */
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.rendered-markdown code {
  font-family: 'Courier New', Courier, monospace;
}

.rendered-markdown pre code {
  background-color: transparent;
  padding: 0;
}

.rendered-markdown :not(pre) > code {
  background-color: #e5e7eb; /* gray-200 */
  color: #ef4444; /* red-500 */
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
.dark .rendered-markdown :not(pre) > code {
  background-color: #374151; /* gray-700 */
  color: #fca5a5; /* red-300 */
}
</style> 