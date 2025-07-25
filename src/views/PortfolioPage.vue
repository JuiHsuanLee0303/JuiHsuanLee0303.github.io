<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 overflow-hidden custom-cursor">
    <main class="container mx-auto px-6 py-24 relative z-10">
      <header class="text-center mb-16 animate-fadeInUp">
        <h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
          我的作品集
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          這裡展示了我引以為傲的專案，涵蓋了從全端開發、AI 應用到資訊安全的各種實踐。
        </p>
      </header>

      <!-- 篩選器 -->
      <div class="flex justify-center flex-wrap gap-3 mb-12 animate-fadeInUp animation-delay-400">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105',
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- 專案網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fadeInUp"
          @click="openProjectModal(project)"
        >
          <div class="relative h-48 overflow-hidden">
            <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
            <span class="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {{ project.category }}
            </span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed h-20">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tech in project.technologies.slice(0, 4)" 
                :key="tech"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
              >
                {{ tech }}
              </span>
            </div>
            <button class="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              查看詳情
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- 專案詳情 Modal -->
    <div v-if="selectedProject" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-modalEnter" @click="closeProjectModal">
      <div class="relative bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-content-container" @click.stop>
        <button @click="closeProjectModal" class="absolute top-4 right-4 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 z-20">
          <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div class="relative h-64 md:h-80 w-full">
          <img :src="selectedProject.image" :alt="selectedProject.title" class="w-full h-full object-cover rounded-t-2xl"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">{{ selectedProject.category }}</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white">{{ selectedProject.title }}</h2>
          </div>
        </div>
        <div class="p-8">
          <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{{ selectedProject.detailedDescription }}</p>
          <div class="mb-6">
            <h4 class="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3">使用技術</h4>
            <div class="flex flex-wrap gap-3">
              <span v-for="tech in selectedProject.technologies" :key="tech" class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <a v-if="selectedProject.liveUrl" :href="selectedProject.liveUrl" target="_blank" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.884 5.73 7.043 6.02a1 1 0 010 1.415 4.012 4.012 0 00-1.248 1.799 1 1 0 01-1.464.31zm10.134 0a1 1 0 011.464-.31 4.012 4.012 0 00-1.248-1.799 1 1 0 11-1.415-1.415 6.012 6.012 0 011.912 2.706c.16.287.033.658-.258.815a1 1 0 01-.815-.258zM8.5 13.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" clip-rule="evenodd" /></svg>
              查看網站
            </a>
            <a v-if="selectedProject.repoUrl" :href="selectedProject.repoUrl" target="_blank" class="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
              原始碼
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories as categoriesData, portfolioProjects } from '../data'

const categories = ref(categoriesData)
const selectedCategory = ref('全部')

const projects = ref(portfolioProjects)

const filteredProjects = computed(() => {
  if (selectedCategory.value === '全部') {
    return projects.value
  }
  return projects.value.filter(p => p.category === selectedCategory.value)
})

const selectedProject = ref(null)

const openProjectModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* 繼承自 HomePage 的動畫效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }

.project-card {
  cursor: pointer;
}

/* Modal 動畫 */
@keyframes modalEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalContentEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modalEnter {
  animation: modalEnter 0.3s ease-out forwards;
}

.modal-content-container {
  animation: modalContentEnter 0.4s ease-out 0.1s both;
}
</style>