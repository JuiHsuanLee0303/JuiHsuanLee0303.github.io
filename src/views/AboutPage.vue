<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import { useProjectsStore } from '@/stores/projects'

// 介面定義
interface BasicInfo {
  label: string
  value: string
  icon: string
}

interface Education {
  school: string
  department: string
  period: string
  achievements?: string[]
}

interface WorkExperience {
  company: string
  position: string
  period: string
  responsibilities: string[]
  technologies: string[]
  summary?: string
}

interface Skill {
  name: string
  icon: string
  category: string
  level?: number
  description?: string
  projects?: string[]
  experience?: string
}

// 獲取 store 實例
const skillsStore = useSkillsStore()
const projectsStore = useProjectsStore()

// 獲取所有技能類別並對應顯示名稱
const skillCategories = computed(() => {
  const categories = [...new Set(skillsStore.skills.map(s => s.category))]
  return categories.map(category => ({
    key: category,
    title: skillsStore.categories.find(c => c.name === category)?.title || category
  }))
})

// 基本資料
const basicInfos: BasicInfo[] = [
  { label: '姓名', value: '李睿軒', icon: '👨‍💻' },
  { label: '年齡', value: `${new Date().getFullYear() - 1996}`, icon: '🎂' },
  { label: '所在地', value: '台灣台北', icon: '📍' },
  { label: '電子郵件', value: 'juihsuanlee0303@gmail.com', icon: '📧' },
  { label: '語言能力', value: '中文、英文', icon: '🗣️' },
  { label: '個人興趣', value: '閱讀、寫作、健身', icon: '🎯' },
]

// 教育背景
const education: Education[] = [
  {
    school: '國立臺灣大學',
    department: '資訊工程學系',
    period: '2014-2018',
    achievements: [],
  },
  {
    school: '國立臺北商業大學',
    department: '人工智慧與商業應用碩士班',
    period: '2024-2026',
    achievements: ['於TANET會議發表論文《人工智慧在資安領域趨勢之研究》'],
  },
]

// 個人特質
const personalTraits = [
  {
    title: '創新思維',
    description: '善於發現問題並提出創新解決方案，持續關注最新技術發展。',
    icon: '💡',
  },
  {
    title: '團隊合作',
    description: '具備良好的溝通能力，能有效協調團隊成員完成專案目標。',
    icon: '🤝',
  },
  {
    title: '自主學習',
    description: '保持學習熱忱，主動吸收新知識和技能，追求專業成長。',
    icon: '📚',
  },
  {
    title: '解決問題',
    description: '面對挑戰時能夠冷靜分析，制定有效的解決策略。',
    icon: '🎯',
  },
]

// 工作經驗
const workExperience: WorkExperience = {
  company: '國立臺北商業大學資訊與網路中心',
  position: '程式設計師',
  period: 'Jul. 2024 - 至今',
  summary: '負責學校資訊系統的開發與維護，專注於提升系統效能和用戶體驗，同時參與重要的技術決策。',
  responsibilities: [
    '負責學校主要網站的開發與維護',
    '優化網站效能，提升使用者體驗',
    '參與網站資安設計與改進',
    '帶領團隊完成多項重要專案',
    '建立開發流程標準化制度',
    '規劃並實施系統架構升級計畫',
    '指導新進人員，協助團隊技術成長',
  ],
  technologies: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
}

// 動畫控制
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// 選中的技能
const selectedSkill = ref<Skill | null>(null)

// 顯示技能詳情的方法
const showSkillDetails = (skill: Skill) => {
  selectedSkill.value = skill
}

// 關閉技能詳情的方法
const closeSkillDetails = () => {
  selectedSkill.value = null
}

// 熟練度等級定義
const getSkillLevel = (level: number | undefined) => {
  if (!level) return { text: '入門', color: 'text-red-400' }
  if (level >= 90) return { text: '精通', color: 'text-green-400' }
  if (level >= 80) return { text: '熟練', color: 'text-blue-400' }
  if (level >= 70) return { text: '掌握', color: 'text-violet-400' }
  if (level >= 60) return { text: '基礎', color: 'text-yellow-400' }
  return { text: '入門', color: 'text-red-400' }
}
</script>

<template>
  <main class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8">
    <div class="max-w-7xl mx-auto px-4 transition-all duration-1000 mb-16"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">

      <!-- 頁面標題 -->
      <h1 class="text-6xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text
        text-transparent mb-12 hover:scale-105 transition-all duration-300 animate-fadeIn">
        關於我
      </h1>

      <!-- 主要內容區塊 -->
      <div class="bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20
        hover:shadow-violet-500/30 p-10 transition-all duration-500">

        <!-- 個人簡介 -->
        <section class="mb-16 animate-fadeIn" style="animation-delay: 0.2s">
          <h2 class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8">
            個人簡介
          </h2>
          <div class="space-y-6 mb-12">
            <p class="text-slate-300 text-lg leading-relaxed">
              我是一位充滿熱情的全端工程師，擁有豐富的網站開發經驗。專注於打造高效能、易維護的網站應用程式，
              並且熱衷於探索新技術，持續提升自己的專業能力。
            </p>
            <p class="text-slate-300 text-lg leading-relaxed">
              在工作中，我特別重視團隊協作和知識分享，相信良好的溝通能帶來更好的專案成果。
              同時，我也致力於程式碼品質和系統架構的優化，確保產品的可擴展性和維護性。
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="info in basicInfos" :key="info.label" class="flex items-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50
                transform hover:-translate-y-1 transition-all duration-300">
              <span class="text-2xl w-10">{{ info.icon }}</span>
              <span class="text-violet-400 font-medium w-32">{{ info.label }}</span>
              <span class="text-slate-300">{{ info.value }}</span>
            </div>
          </div>
        </section>

        <!-- 個人特質 -->
        <section class="mb-16 animate-fadeIn" style="animation-delay: 0.3s">
          <h2 class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8">
            個人特質
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trait in personalTraits" :key="trait.title"
              class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transform hover:-translate-y-1 transition-all duration-300">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-2xl">{{ trait.icon }}</span>
                <h3 class="text-xl font-medium text-violet-400">{{ trait.title }}</h3>
              </div>
              <p class="text-slate-300">{{ trait.description }}</p>
            </div>
          </div>
        </section>

        <!-- 教育背景 -->
        <section class="mb-16 animate-fadeIn" style="animation-delay: 0.4s">
          <h2 class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8">
            教育背景
          </h2>
          <div class="space-y-6">
            <div v-for="edu in education" :key="edu.school" class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50
                transform hover:-translate-y-1 transition-all duration-300">
              <h3 class="text-2xl font-medium text-violet-400 mb-2">{{ edu.school }}</h3>
              <p class="text-slate-300 mb-4">{{ edu.department }} | {{ edu.period }}</p>
              <ul v-if="edu.achievements?.length" class="list-disc list-inside text-slate-300 space-y-2">
                <li v-for="achievement in edu.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 工作經驗 -->
        <section class="mb-16 animate-fadeIn" style="animation-delay: 0.6s">
          <h2 class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8">
            工作經驗
          </h2>
          <div class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50
            transform hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-2xl font-medium text-violet-400 mb-2">{{ workExperience.company }}</h3>
            <p class="text-slate-300 mb-4">{{ workExperience.position }} | {{ workExperience.period }}</p>
            <p class="text-slate-300 mb-6 italic">{{ workExperience.summary }}</p>

            <div class="mb-6">
              <h4 class="text-slate-200 font-medium mb-4">主要職責：</h4>
              <ul class="list-disc list-inside space-y-2">
                <li v-for="item in workExperience.responsibilities" :key="item" class="text-slate-300">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="tech in workExperience.technologies" :key="tech"
                class="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full hover:bg-violet-500/30 transition-colors duration-300">
                {{ tech }}
              </span>
            </div>
          </div>
        </section>

        <!-- 專案經驗 -->
        <section class="mb-16 animate-fadeIn" style="animation-delay: 0.7s">
          <h2 class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8">
            專案經驗
          </h2>
          <div class="space-y-6">
            <div v-for="project in projectsStore.projects" :key="project.title"
              class="p-6 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transform hover:-translate-y-1 transition-all duration-300">
              <h3 class="text-2xl font-medium text-violet-400 mb-3">{{ project.title }}</h3>
              <p class="text-slate-300 mb-4">{{ project.description }}</p>

              <div class="flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag"
                  class="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full hover:bg-violet-500/30 transition-colors duration-300">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 專業技能 -->
        <section class="animate-fadeIn" style="animation-delay: 0.8s">
          <h2 class="text-3xl font-semibold text-violet-300 pb-4 border-b-2 border-violet-500/30 mb-8">
            專業技能
          </h2>
          <div class="space-y-8">
            <div v-for="category in skillCategories" :key="category.key">
              <h3 class="text-2xl font-medium text-violet-400 mb-4">{{ category.title }}</h3>
              <div class="grid md:grid-cols-4 gap-4">
                <div v-for="skill in skillsStore.skills.filter(s => s.category === category.key)" :key="skill.name"
                  class="p-4 bg-slate-700/30 rounded-xl group transition-all duration-500 border-2
                    border-violet-500/30 hover:scale-105 cursor-pointer" @click="showSkillDetails(skill)">
                  <div class="flex items-center gap-3">
                    <img :src="`https://skillicons.dev/icons?i=${skill.icon}`" :alt="skill.name"
                      class="h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                    <span class="text-slate-300 group-hover:text-violet-300 transition-colors duration-300">
                      {{ skill.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 技能詳情對話框 -->
    <div v-if="selectedSkill"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]"
      @click.self="closeSkillDetails" @keydown.esc="closeSkillDetails">
      <div class="bg-slate-800 rounded-xl p-6 max-w-lg w-full mx-4 transform transition-all
        animate-fadeIn" style="animation-delay: 0.1s">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <img :src="`https://skillicons.dev/icons?i=${selectedSkill.icon}`" :alt="selectedSkill.name"
              class="h-12 object-contain" />
            <h3 class="text-2xl font-medium text-violet-400">{{ selectedSkill.name }}</h3>
          </div>
          <button @click="closeSkillDetails" class="text-slate-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <!-- 熟練度 -->
          <div>
            <h4 class="text-slate-300 font-medium mb-2">熟練度</h4>
            <div class="flex items-center gap-2">
              <span :class="[
                'px-4 py-2 rounded-lg text-base font-medium',
                getSkillLevel(selectedSkill.level).color,
                'bg-slate-700/50 border border-slate-600'
              ]">
                {{ getSkillLevel(selectedSkill.level).text }}
              </span>
              <span class="text-slate-400">
                {{ {
                  '精通': '能夠獨立解決複雜問題，並指導他人',
                  '熟練': '具備豐富實戰經驗，可處理大多數情況',
                  '掌握': '能夠獨立完成一般任務',
                  '基礎': '了解基本概念和使用方法',
                  '入門': '正在學習和探索中'
                }[getSkillLevel(selectedSkill.level).text] }}
              </span>
            </div>
          </div>

          <!-- 使用經驗 -->
          <div v-if="selectedSkill.experience">
            <h4 class="text-slate-300 font-medium mb-2">使用經驗</h4>
            <p class="text-slate-400">{{ selectedSkill.experience }}</p>
          </div>

          <!-- 描述 (有資料才顯示) -->
          <div v-if="selectedSkill.description">
            <h4 class="text-slate-300 font-medium mb-2">技能描述</h4>
            <p class="text-slate-400">{{ selectedSkill.description }}</p>
          </div>

          <!-- 相關專案 -->
          <div v-if="skillsStore.getSkillProjects(selectedSkill.name).length">
            <h4 class="text-slate-300 font-medium mb-2">相關專案</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="project in skillsStore.getSkillProjects(selectedSkill.name)" :key="project"
                class="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                {{ project }}
              </span>
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
    transform: translateY(20px);
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
