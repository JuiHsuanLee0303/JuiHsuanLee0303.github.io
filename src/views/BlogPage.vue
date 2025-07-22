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
import { blogPosts } from '../data'

const posts = ref(blogPosts)

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