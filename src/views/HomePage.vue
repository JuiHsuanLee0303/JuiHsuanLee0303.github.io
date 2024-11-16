<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 狀態管理
const isVisible = ref(false)

// 生命週期鉤子
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// 常數定義
const SKILLS = [
  {
    icon: '💻',
    title: '前端開發',
    description: 'Vue.js',
    bgColor: 'bg-violet-100',
    hoverBgColor: 'hover:bg-violet-200',
  },
  {
    icon: '⚙️',
    title: '後端開發',
    description: 'Node.js, TypeScript, Python',
    bgColor: 'bg-teal-100',
    hoverBgColor: 'hover:bg-teal-200',
  },
  {
    icon: '💾',
    title: '資料庫',
    description: 'PostgreSQL, MySQL',
    bgColor: 'bg-purple-100',
    hoverBgColor: 'hover:bg-purple-200',
  },
  {
    icon: '🎨',
    title: 'UI/UX設計',
    description: 'Figma, Tailwind CSS',
    bgColor: 'bg-fuchsia-100',
    hoverBgColor: 'hover:bg-fuchsia-200',
  },
]

const PROJECTS = ['個人作品集網站', '電商管理系統', '社群媒體應用']
</script>

<template>
  <main class="bg-gradient-to-b from-slate-900 to-slate-800 mt-16 pt-8 min-h-[calc(100vh-64px)]">
    <div
      class="max-w-4xl mx-auto px-4 transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 標題區塊 -->
      <h1
        class="text-5xl font-bold text-center text-violet-400 mb-12 hover:text-violet-300 transition-colors duration-300 animate-fadeIn"
        style="animation-delay: 0.3s"
      >
        歡迎來到我的個人網站
      </h1>

      <!-- 簡介區塊 -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- 關於我 -->
        <div
          class="bg-slate-800/90 p-8 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn backdrop-blur-sm"
          style="animation-delay: 0.5s"
        >
          <h2 class="text-2xl font-semibold text-violet-400 mb-4 flex items-center">
            <span class="text-violet-400 mr-2">👨‍💻</span>關於我
          </h2>
          <p class="text-slate-300 leading-relaxed">
            我是一名全端開發工程師，熱衷於創造優秀的Web應用。我專注於使用現代化技術堆疊進行開發，
            包括Vue.js、Node.js等。
          </p>
          <router-link
            to="/about"
            class="inline-block mt-6 text-violet-400 hover:text-violet-300 font-medium group"
          >
            了解更多
            <span class="group-hover:translate-x-2 inline-block transition-transform duration-300"
              >→</span
            >
          </router-link>
        </div>

        <!-- 最新專案 -->
        <div
          class="bg-slate-800/90 p-8 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn backdrop-blur-sm"
          style="animation-delay: 0.7s"
        >
          <h2 class="text-2xl font-semibold text-violet-400 mb-4 flex items-center">
            <span class="text-violet-400 mr-2">🚀</span>最新專案
          </h2>
          <ul class="space-y-4">
            <li
              v-for="project in PROJECTS"
              :key="project"
              class="flex items-center text-slate-300 hover:text-violet-400 transition-colors duration-300"
            >
              <span class="w-2 h-2 bg-violet-400 rounded-full mr-3"></span>
              {{ project }}
            </li>
          </ul>
          <router-link
            to="/portfolio"
            class="inline-block mt-6 text-violet-400 hover:text-violet-300 font-medium group"
          >
            查看更多
            <span class="group-hover:translate-x-2 inline-block transition-transform duration-300"
              >→</span
            >
          </router-link>
        </div>
      </div>

      <!-- 技能區塊 -->
      <div
        class="bg-slate-800/90 p-10 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 animate-fadeIn backdrop-blur-sm mb-12"
        style="animation-delay: 0.9s"
      >
        <h2 class="text-2xl font-semibold text-violet-400 mb-8 text-center">專業技能</h2>
        <div class="grid md:grid-cols-4 gap-8">
          <div
            v-for="skill in SKILLS"
            :key="skill.title"
            class="text-center transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              :class="[skill.bgColor, skill.hoverBgColor]"
              class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 shadow-lg shadow-violet-500/20"
            >
              <span class="text-3xl">{{ skill.icon }}</span>
            </div>
            <h3 class="font-medium text-violet-400 mb-3">{{ skill.title }}</h3>
            <p class="text-slate-300">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

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
  animation: fadeIn 1s ease-out forwards;
  opacity: 0;
}
</style>
