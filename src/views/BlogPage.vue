<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 overflow-hidden custom-cursor" ref="mainContainer">
    <main class="container mx-auto px-6 py-24 relative z-10">
      
      <!-- 頁面標題 -->
      <header class="text-center mb-16 animate-fadeInUp">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          技術部落格
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          分享我的學習筆記、開發心得與對新技術的見解。
        </p>
      </header>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- 主要內容：文章列表 -->
        <div class="w-full lg:w-2/3">
          <div class="space-y-12">
            <article 
              v-for="(post, index) in paginatedPosts" 
              :key="post.slug"
              class="blog-post-card group relative animate-fadeInUp"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div class="relative bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ post.date }} · {{ post.author }}</p>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  <router-link :to="`/blog/${post.slug}`" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 stretched-link">
                    {{ post.title }}
                  </router-link>
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {{ post.excerpt }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in post.tags" 
                    :key="tag"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-xs font-semibold"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </article>
          </div>

          <!-- 分頁控制 -->
          <div class="mt-12 flex justify-center items-center gap-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <span class="text-gray-700 dark:text-gray-300 font-medium">
              第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁
            </span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        <!-- 側邊欄 -->
        <aside class="w-full lg:w-1/3 space-y-8 sticky top-24 self-start animate-fadeInUp animation-delay-300">
          <!-- 搜尋框 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-500">搜尋文章</h3>
            <div class="relative">
              <input type="text" placeholder="輸入關鍵字..." class="w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg px-4 py-2 text-sm">
              <svg class="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          
          <!-- 分類/標籤 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-500">熱門標籤</h3>
            <div class="flex flex-wrap gap-2">
              <button v-for="tag in allTags" :key="tag" class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500">
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- 最新文章 -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-blue-500">最新文章</h3>
            <ul class="space-y-4">
              <li v-for="post in recentPosts" :key="post.slug">
                <router-link :to="`/blog/${post.slug}`" class="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm">
                  {{ post.title }}
                </router-link>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ post.date }}</p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const posts = ref([
  {
    slug: 'mastering-vue-3-composition-api',
    title: '精通 Vue 3 Composition API',
    author: 'Jui-Hsuan Lee',
    date: '2023年10月26日',
    excerpt: '深入探討 Vue 3 的 Composition API 如何徹底改變我們的元件寫作方式，提供更強的類型推導、邏輯複用性與可維護性。',
    tags: ['Vue.js', 'JavaScript', '前端開發'],
  },
  {
    slug: 'building-a-restful-api-with-nodejs-and-fastify',
    title: '使用 Node.js 與 Fastify 打造高效能 RESTful API',
    author: 'Jui-Hsuan Lee',
    date: '2023年10月15日',
    excerpt: 'Fastify 以其卓越的性能和低開銷聞名。本篇文章將帶您一步步從零開始，使用 Fastify 建立一個結構清晰、速度飛快的 RESTful API 服務。',
    tags: ['Node.js', 'Fastify', '後端開發'],
  },
  {
    slug: 'introduction-to-large-language-models',
    title: '大型語言模型（LLM）入門指南',
    author: 'Jui-Hsuan Lee',
    date: '2023年9月30日',
    excerpt: '大型語言模型正在掀起 AI 領域的革命。本文將用淺顯易懂的方式介紹 LLM 的基本原理、應用場景以及如何透過 API 與之互動。',
    tags: ['AI', 'LLM', '機器學習'],
  },
  {
    slug: 'web-security-essentials-preventing-xss',
    title: '網站安全基礎：如何防禦跨站腳本攻擊（XSS）',
    author: 'Jui-Hsuan Lee',
    date: '2023年9月12日',
    excerpt: 'XSS 是最常見的網站漏洞之一。本文將詳細解析 XSS 的三種類型（儲存型、反射型、DOM 型）及其防禦策略，保護您的網站免於攻擊。',
    tags: ['資安', 'Web Security', 'XSS'],
  },
  {
    slug: 'ci-cd-with-github-actions',
    title: '使用 GitHub Actions 實現自動化 CI/CD 流程',
    author: 'Jui-Hsuan Lee',
    date: '2023年8月28日',
    excerpt: '自動化是現代軟體開發的核心。本教學將引導您設定 GitHub Actions，為您的專案建立一個完整的持續整合與持續部署（CI/CD）工作流程。',
    tags: ['DevOps', 'CI/CD', 'GitHub'],
  },
]);

const currentPage = ref(1);
const postsPerPage = ref(3);

const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage.value));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value;
  const end = start + postsPerPage.value;
  return posts.value.slice(start, end);
});

const recentPosts = computed(() => posts.value.slice(0, 3));

const allTags = computed(() => {
  const tags = new Set();
  posts.value.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.7s ease-out forwards;
}
.animation-delay-300 { animation-delay: 0.3s; }

.stretched-link::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  pointer-events: auto;
  background-color: transparent;
}
</style>