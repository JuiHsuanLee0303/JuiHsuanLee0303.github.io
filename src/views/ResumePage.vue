<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 介面定義
interface BasicInfo {
  label: string
  value: string
  icon?: string
}

interface Education {
  school: string
  department: string
  period: string
  gpa?: string
  achievements?: string[]
}

interface WorkExperience {
  company: string
  position: string
  period: string
  responsibilities: string[]
  technologies?: string[]
}

interface Skill {
  category: string
  items: string[]
}

// 資料
const basicInfos: BasicInfo[] = [
  { label: '姓名', value: '李睿軒', icon: '👨‍💻' },
  { label: '年齡', value: `${new Date().getFullYear() - 1996}`, icon: '🎂' },
  { label: '所在地', value: '台灣台北', icon: '📍' },
  { label: '電子郵件', value: 'juihsuan.lee@gmail.com', icon: '📧' },
]

const education: Education = {
  school: '國立臺灣大學',
  department: '資訊工程學系',
  period: '2014-2018',
  // gpa: '3.8/4.0',
  achievements: ['於TANET會議發表論文《人工智慧在資安領域趨勢之研究》'],
}

const workExperience: WorkExperience = {
  company: '國立臺北商業大學資訊與網路中心',
  position: '程式設計師',
  period: 'Jul. 2024 - 至今',
  responsibilities: [
    '負責學校主要網站的開發與維護',
    '優化網站效能，提升使用者體驗',
    '參與網站資安設計與改進',
    '帶領團隊完成多項重要專案',
    '建立開發流程標準化制度',
  ],
  technologies: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
}

const skills: Skill[] = [
  {
    category: '前端開發',
    items: [
      'Vue.js/React.js 框架開發',
      'TypeScript 開發',
      'HTML/CSS/JavaScript',
      'Tailwind CSS/SCSS',
      'RWD 響應式設計',
    ],
  },
  {
    category: '後端開發',
    items: [
      'Node.js/Express',
      'Python/Django',
      'RESTful API 設計',
      '資料庫設計與優化',
      '系統架構規劃',
    ],
  },
  {
    category: '人工智慧',
    items: ['PyTorch', 'LLaMA Factory', 'Scikit-learn', 'Machine Learning', 'Deep Learning'],
  },
  {
    category: '其他技能',
    items: ['Git 版本控制', 'Docker 容器化', 'CI/CD 部署流程', '敏捷開發方法', '團隊溝通協作'],
  },
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
      class="container mx-auto px-4 transition-all duration-1000 mb-16"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <h1
        class="text-6xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-12 hover:scale-105 transition-all duration-300 animate-fadeIn"
      >
        個人履歷
      </h1>

      <div
        class="max-w-5xl mx-auto bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 p-10 transition-all duration-500"
      >
        <!-- 基本資料 -->
        <section class="mb-14 animate-fadeIn" style="animation-delay: 0.2s">
          <h2
            class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8 hover:text-violet-400 transition-colors duration-300"
          >
            基本資料
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="info in basicInfos"
              :key="info.label"
              class="flex items-center gap-6 group p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              <span class="text-2xl">{{ info.icon }}</span>
              <div>
                <span class="font-medium text-violet-400 block mb-1">{{ info.label }}</span>
                <span class="text-slate-300">{{ info.value }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 學歷背景 -->
        <section class="mb-14 animate-fadeIn" style="animation-delay: 0.4s">
          <h2
            class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8 hover:text-violet-400 transition-colors duration-300"
          >
            學歷背景
          </h2>
          <div
            class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 class="text-2xl font-medium text-violet-400 mb-4">{{ education.school }}</h3>
            <p class="text-slate-300 text-lg mb-4">
              {{ education.department }} | {{ education.period }}
            </p>
            <div class="space-y-2">
              <p class="text-slate-200 font-medium mb-2">主要成就：</p>
              <ul class="list-disc pl-5 space-y-2">
                <li
                  v-for="achievement in education.achievements"
                  :key="achievement"
                  class="text-slate-300 hover:text-violet-300 transition-colors duration-300"
                >
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 工作經驗 -->
        <section class="mb-14 animate-fadeIn" style="animation-delay: 0.6s">
          <h2
            class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8 hover:text-violet-400 transition-colors duration-300"
          >
            工作經驗
          </h2>
          <div
            class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 class="text-2xl font-medium text-violet-400 mb-4">{{ workExperience.company }}</h3>
            <p class="text-slate-300 text-lg mb-6">
              {{ workExperience.position }} | {{ workExperience.period }}
            </p>

            <div class="mb-6">
              <h4 class="text-slate-200 font-medium mb-4">主要職責：</h4>
              <ul class="list-disc pl-5 space-y-3">
                <li
                  v-for="responsibility in workExperience.responsibilities"
                  :key="responsibility"
                  class="text-slate-300 hover:text-violet-300 transition-colors duration-300"
                >
                  {{ responsibility }}
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-slate-200 font-medium mb-4">使用技術：</h4>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in workExperience.technologies"
                  :key="tech"
                  class="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full hover:bg-violet-500/30 transition-colors duration-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 專業技能 -->
        <section class="animate-fadeIn" style="animation-delay: 0.8s">
          <h2
            class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8 hover:text-violet-400 transition-colors duration-300"
          >
            專業技能
          </h2>
          <div class="grid md:grid-cols-4 gap-8">
            <div
              v-for="skillGroup in skills"
              :key="skillGroup.category"
              class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transform hover:-translate-y-2 transition-all duration-300"
            >
              <h3 class="text-xl font-medium text-violet-400 mb-4">{{ skillGroup.category }}</h3>
              <ul class="space-y-3">
                <li
                  v-for="item in skillGroup.items"
                  :key="item"
                  class="text-slate-300 hover:text-violet-300 flex items-center gap-2 transition-all duration-300"
                >
                  <span class="text-violet-400">▹</span>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
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
