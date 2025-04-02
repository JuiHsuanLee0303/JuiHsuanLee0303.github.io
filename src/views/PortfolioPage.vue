<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()

// 控制頁面載入動畫的狀態
const isVisible = ref(false)
const selectedCategory = ref('')

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
  category: string
}

// 作品集資料
const projects: Project[] = projectsStore.projects

// 計算所有分類
const categories = computed(() => {
  console.log(projects)
  const cats = new Set(projects.map((project) => project.category))
  console.log(cats)
  return Array.from(cats)
})

// 過濾後的專案
const filteredProjects = computed(() => {
  if (!selectedCategory.value) return projects
  return projects.filter((project) => project.category === selectedCategory.value)
})

// 重置篩選
const resetFilter = () => {
  selectedCategory.value = ''
}
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

      <!-- 分類篩選 -->
      <div
        class="flex flex-wrap justify-center gap-4 mb-8 animate-fadeIn"
        style="animation-delay: 0.2s"
      >
        <button
          class="px-4 py-2 rounded-full transition-all duration-300"
          :class="
            !selectedCategory
              ? 'bg-violet-500/20 text-violet-300'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
          "
          @click="resetFilter"
        >
          全部作品
        </button>
        <button
          v-for="category in categories"
          :key="category"
          class="px-4 py-2 rounded-full transition-all duration-300"
          :class="
            selectedCategory === category
              ? 'bg-violet-500/20 text-violet-300'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
          "
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in filteredProjects"
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
            <div class="flex items-center justify-between mb-3">
              <h3
                class="text-xl font-semibold text-violet-400 group-hover:text-violet-300 transition-colors duration-300"
              >
                {{ project.title }}
              </h3>
              <span class="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
                {{ project.category }}
              </span>
            </div>
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
                target="_blank"
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

      <!-- 無結果提示 -->
      <div v-if="filteredProjects.length === 0" class="text-center py-12 animate-fadeIn">
        <p class="text-slate-400 text-lg">沒有找到相關作品</p>
        <button
          @click="resetFilter"
          class="mt-4 px-6 py-2 bg-violet-500/10 text-violet-400 rounded-lg hover:bg-violet-500/20 transition-all duration-300"
        >
          重置篩選
        </button>
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
