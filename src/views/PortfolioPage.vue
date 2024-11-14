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

// 作品集資料
const projects = [
  {
    title: '個人作品集網站',
    description: '使用 Vue 3 和 TypeScript 開發的個人作品展示網站，具備響應式設計和流暢動畫效果。',
    image: 'https://via.placeholder.com/400x300',
    tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    demoLink: '#',
    sourceLink: '#',
  },
  {
    title: '電商平台',
    description: '全端電商網站，整合金流系統、會員管理、商品管理等功能。',
    image: 'https://via.placeholder.com/400x300',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    demoLink: '#',
    sourceLink: '#',
  },
  {
    title: '任務管理系統',
    description: '團隊協作任務管理平台，支援即時通知、進度追蹤等功能。',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React', 'Express', 'PostgreSQL'],
    demoLink: '#',
    sourceLink: '#',
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
        作品集
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 overflow-hidden transition-all duration-500 group animate-fadeIn"
          :style="`animation-delay: ${index * 0.2}s`"
        >
          <div class="relative overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>

          <div class="p-6">
            <h3
              class="text-xl font-semibold text-violet-400 mb-3 group-hover:text-violet-300 transition-colors duration-300"
            >
              {{ project.title }}
            </h3>
            <p class="text-slate-300 mb-4 line-clamp-3">{{ project.description }}</p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 bg-slate-700/50 text-violet-300 rounded-full text-sm hover:bg-slate-700 transition-colors duration-300"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex justify-between">
              <a
                :href="project.demoLink"
                class="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300"
              >
                查看展示
              </a>
              <a
                :href="project.sourceLink"
                target="_blank"
                class="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300"
              >
                原始碼
              </a>
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
</style>
