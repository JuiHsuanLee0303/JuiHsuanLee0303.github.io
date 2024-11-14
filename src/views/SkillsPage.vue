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

// 技能資料
const skillCategories = [
  {
    title: '前端開發',
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    title: '後端開發',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    title: '其他技能',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'UI/UX設計', level: 75 },
    ],
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
        專業技能
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(category, categoryIndex) in skillCategories"
          :key="categoryIndex"
          class="bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-500 p-8 animate-fadeIn"
          :style="`animation-delay: ${categoryIndex * 0.2}s`"
        >
          <h2 class="text-2xl font-semibold text-violet-400 mb-6">{{ category.title }}</h2>
          <ul class="space-y-6">
            <li
              v-for="(skill, skillIndex) in category.skills"
              :key="skillIndex"
              class="transform hover:scale-102 transition-all duration-300"
            >
              <div class="w-full">
                <div class="flex justify-between mb-2">
                  <span class="text-slate-300">{{ skill.name }}</span>
                  <span class="text-violet-400">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-slate-700/50 rounded-full h-2.5">
                  <div
                    class="bg-gradient-to-r from-violet-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000"
                    :style="`width: ${isVisible ? skill.level + '%' : '0%'}; transition-delay: ${categoryIndex * 0.3 + skillIndex * 0.2}s`"
                  ></div>
                </div>
              </div>
            </li>
          </ul>
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

.scale-102 {
  transform: scale(1.02);
}
</style>
