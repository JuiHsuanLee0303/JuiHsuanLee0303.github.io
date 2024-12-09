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

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  demo: boolean
  demoLink: string
  source: boolean
  sourceLink: string
}

// 作品集資料
const projects: Project[] = [
  {
    title: '線上題庫測驗系統',
    description:
      '使用 Vue 3 和 TypeScript 開發的線上題庫測驗系統，具備題目匯入與管理、測驗管理等功能。',
    image:
      'https://images.unsplash.com/photo-1585432959449-b1c9c8cc49ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    demo: true,
    demoLink: 'https://juihsuanlee0303.github.io/question-practice/',
    source: true,
    sourceLink: 'https://github.com/JuiHsuanLee0303/question-practice',
  },
  {
    title: 'HackMD CLI',
    description:
      '使用 JavaScript 開發的 HackMD CLI，具備使用命令行操作 HackMD 與本地、遠端同步的功能。',
    image:
      'https://plus.unsplash.com/premium_photo-1726754457459-d2dfa2e3a434?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['JavaScript', 'Node.js', 'HackMD'],
    demo: false,
    demoLink: '#',
    source: true,
    sourceLink: 'https://github.com/JuiHsuanLee0303/hackmd-cli',
  },
  {
    title: '大學學雜費減免系統',
    description: '使用 Vue 3 和 Node.js 開發的大學學雜費減免系統，具備申請管理、審核流程等功能。',
    image:
      'https://plus.unsplash.com/premium_photo-1671796330300-71ca39909fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL'],
    demo: true,
    demoLink: 'https://tuition-relief.ntub.edu.tw',
    source: false,
    sourceLink: '#',
  },
  {
    title: 'JavaScript機器學習library',
    description: '使用TypeScript開發的機器學習library，具備數據處理、模型訓練、預測等功能。',
    image:
      'https://images.unsplash.com/photo-1495592822108-9e6261896da8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['TypeScript', 'Machine Learning', 'Scikit-learn'],
    demo: false,
    demoLink: '#',
    source: true,
    sourceLink: 'https://github.com/JuiHsuanLee0303/js-ml-lib',
  },
  {
    title: '個人網站',
    description: '使用 Vue 3 和 TypeScript 開發的個人作品展示網站，具備響應式設計和流暢動畫效果。',
    image:
      'https://plus.unsplash.com/premium_photo-1661288470388-c5006797bdff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    demo: true,
    demoLink: '#',
    source: true,
    sourceLink: 'https://github.com/JuiHsuanLee0303/JuiHsuanLee0303.github.io',
  },
]
</script>

<template>
  <main
    class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8"
  >
    <div
      class="container mx-auto px-4 mb-8 lg:mb-16 transition-all duration-1000"
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
                v-if="project.demo"
              >
                查看展示
              </a>
              <a
                :href="project.sourceLink"
                target="_blank"
                class="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300"
                v-if="project.source"
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
