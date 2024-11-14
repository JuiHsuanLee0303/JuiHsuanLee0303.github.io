<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 介面定義
interface BasicInfo {
  label: string
  value: string
}

interface Education {
  school: string
  department: string
  period: string
}

interface WorkExperience {
  company: string
  position: string
  period: string
  responsibilities: string[]
}

// 資料
const basicInfos: BasicInfo[] = [
  { label: '姓名', value: '李睿軒' },
  { label: '年齡', value: `${new Date().getFullYear() - 1996}` },
]

const education: Education = {
  school: '國立臺灣大學',
  department: '資訊工程學系',
  period: '2014-2018',
}

const workExperience: WorkExperience = {
  company: '國立臺北商業大學資訊與網路中心',
  position: '程式設計師',
  period: '2022-至今',
  responsibilities: [
    '負責學校主要網站的開發與維護',
    '優化網站效能，提升使用者體驗',
    '參與網站資安設計與改進',
  ],
}

const skills: string[] = [
  '熟練掌握 HTML5、CSS3、JavaScript/TypeScript',
  '精通 Vue.js 前端框架',
  '熟悉 Node.js 後端開發',
  '具備良好的團隊合作能力',
]

// 動畫控制
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
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
        個人履歷
      </h1>

      <div
        class="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 p-8 transition-all duration-500"
      >
        <!-- 基本資料 -->
        <section class="mb-12 animate-fadeIn" style="animation-delay: 0.2s">
          <h2
            class="text-2xl font-semibold text-violet-300 pb-3 border-b border-violet-500/30 mb-6 hover:text-violet-400 transition-colors duration-300"
          >
            基本資料
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="info in basicInfos"
              :key="info.label"
              class="flex gap-4 group transform hover:-translate-y-1 transition-all duration-300"
            >
              <span class="font-medium text-violet-400 group-hover:text-violet-300"
                >{{ info.label }}：</span
              >
              <span class="text-slate-300">{{ info.value }}</span>
            </div>
          </div>
        </section>

        <!-- 學歷背景 -->
        <section class="mb-12 animate-fadeIn" style="animation-delay: 0.4s">
          <h2
            class="text-2xl font-semibold text-violet-300 pb-3 border-b border-violet-500/30 mb-6 hover:text-violet-400 transition-colors duration-300"
          >
            學歷背景
          </h2>
          <div class="mt-4 transform hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-medium text-violet-400">{{ education.school }}</h3>
            <p class="text-slate-300 mt-2">{{ education.department }} | {{ education.period }}</p>
          </div>
        </section>

        <!-- 工作經驗 -->
        <section class="mb-12 animate-fadeIn" style="animation-delay: 0.6s">
          <h2
            class="text-2xl font-semibold text-violet-300 pb-3 border-b border-violet-500/30 mb-6 hover:text-violet-400 transition-colors duration-300"
          >
            工作經驗
          </h2>
          <div class="mt-4 transform hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-medium text-violet-400">{{ workExperience.company }}</h3>
            <p class="text-slate-300 mt-2">
              {{ workExperience.position }} | {{ workExperience.period }}
            </p>
            <ul class="list-disc pl-5 mt-4 space-y-2 text-slate-300">
              <li
                v-for="(responsibility, index) in workExperience.responsibilities"
                :key="index"
                class="hover:text-violet-300 transition-colors duration-300"
              >
                {{ responsibility }}
              </li>
            </ul>
          </div>
        </section>

        <!-- 專業技能 -->
        <section class="mb-8 animate-fadeIn" style="animation-delay: 0.8s">
          <h2
            class="text-2xl font-semibold text-violet-300 pb-3 border-b border-violet-500/30 mb-6 hover:text-violet-400 transition-colors duration-300"
          >
            專業技能
          </h2>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in skills"
              :key="index"
              class="text-slate-300 hover:text-violet-300 transform hover:-translate-x-2 transition-all duration-300"
            >
              ▸ {{ skill }}
            </li>
          </ul>
        </section>
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
