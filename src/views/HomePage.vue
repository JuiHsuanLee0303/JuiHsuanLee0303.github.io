<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSkillsStore } from '@/stores/skills'
import { useProjectsStore } from '@/stores/projects'

// state management
const isVisible = ref(false)
const titleText = ref('')
const skillsStore = useSkillsStore()
const projectsStore = useProjectsStore()

// 添加滾動動畫控制
const isInViewport = ref<{
  skills: boolean
  about: boolean
  projects: boolean
}>({
  skills: false,
  about: false,
  projects: false,
})

// lifecycle hook
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
    typeText('歡迎來到我的個人網站')
  }, 100)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute(
            'data-section',
          ) as keyof typeof isInViewport.value
          if (section) isInViewport.value[section] = true
        }
      })
    },
    { threshold: 0.2 },
  )

  // 觀察各個區塊
  document.querySelectorAll('[data-section]').forEach((el) => {
    observer.observe(el)
  })
})

// 獲取最新的3個專案
const LATEST_PROJECTS = projectsStore.projects.slice(0, 3)

// 網站導覽
const SITE_SECTIONS = [
  {
    icon: '📚',
    title: '學習歷程',
    description: '探索我的技術成長之路',
    link: '/about',
    bgColor: 'bg-blue-100',
    hoverBgColor: 'hover:bg-blue-200',
  },
  {
    icon: '💼',
    title: '作品集',
    description: '查看我完成的專案',
    link: '/portfolio',
    bgColor: 'bg-emerald-100',
    hoverBgColor: 'hover:bg-emerald-200',
  },
  {
    icon: '✍️',
    title: '技術部落格',
    description: '分享學習心得與技術文章',
    link: '/blog',
    bgColor: 'bg-amber-100',
    hoverBgColor: 'hover:bg-amber-200',
  },
]

// 技能數據
const SKILLS = skillsStore.categories.map((category) => ({
  icon: category.icon,
  title: category.title,
  description: skillsStore.skills
    .filter((skill) => skill.category === category.name)
    .map((skill) => skill.name)
    .join(', '),
  bgColor:
    {
      frontend: 'bg-violet-100',
      backend: 'bg-teal-100',
      database: 'bg-purple-100',
      ai: 'bg-fuchsia-100',
      tools: 'bg-rose-100',
      data: 'bg-cyan-100',
    }[category.name] || 'bg-slate-100',
  hoverBgColor:
    {
      frontend: 'hover:bg-violet-200',
      backend: 'hover:bg-teal-200',
      database: 'hover:bg-purple-200',
      ai: 'hover:bg-fuchsia-200',
      tools: 'hover:bg-rose-200',
      data: 'hover:bg-cyan-200',
    }[category.name] || 'hover:bg-slate-200',
}))

// 打字機效果函數
const typeText = async (text: string) => {
  for (let i = 0; i < text.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    titleText.value = text.slice(0, i + 1)
  }
}
</script>

<template>
  <main class="bg-gradient-to-b from-slate-900 to-slate-800 mt-16 pt-8 min-h-[calc(100vh-64px)]">
    <div
      class="max-w-4xl mx-auto px-4 transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <!-- 標題區塊 -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold mb-6 animate-fadeIn" style="animation-delay: 0.3s">
          <span
            class="text-violet-200 hover:text-violet-300 transition-colors duration-300 inline-flex"
          >
            {{ titleText }}<span class="animate-blink">|</span>
          </span>
        </h1>
        <p
          class="text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeIn"
          style="animation-delay: 0.5s"
        >
          這裡是我的個人技術空間，您可以了解我的技術背景、查看專案作品，以及閱讀我的技術文章。
        </p>
      </div>

      <!-- 網站導覽 -->
      <div class="mb-16 animate-fadeIn" style="animation-delay: 0.6s">
        <div class="grid md:grid-cols-3 gap-6">
          <router-link
            v-for="section in SITE_SECTIONS"
            :key="section.title"
            :to="section.link"
            class="group perspective"
          >
            <div
              class="bg-slate-800/90 p-6 rounded-xl shadow-lg shadow-violet-500/20 transition-all duration-300 transform group-hover:shadow-xl group-hover:shadow-violet-500/30 group-hover:-translate-y-1 group-hover:rotate-2"
            >
              <div
                :class="[section.bgColor, section.hoverBgColor]"
                class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300"
              >
                <span class="text-2xl">{{ section.icon }}</span>
              </div>
              <h3 class="font-medium text-violet-400 mb-2 text-center">{{ section.title }}</h3>
              <p class="text-slate-300 text-sm text-center">{{ section.description }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 簡介區塊 -->
      <div
        class="grid md:grid-cols-2 gap-8 mb-16"
        data-section="about"
        :class="isInViewport.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
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
            包括Vue.js、Node.js等。同時，我對人工智慧領域有濃厚的興趣，並且在業餘時間進行相關的學習和實踐。
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
            <li v-for="project in LATEST_PROJECTS" :key="project.title" class="group">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <span class="w-2 h-2 bg-violet-400 rounded-full mr-3"></span>
                  <div>
                    <h3
                      class="text-slate-300 group-hover:text-violet-400 transition-colors duration-300 font-medium"
                    >
                      {{ project.title }}
                    </h3>
                    <p class="text-slate-400 text-sm mt-1">{{ project.tags.join(', ') }}</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <a
                    v-if="project.demo && project.demoLink !== '#'"
                    :href="project.demoLink"
                    target="_blank"
                    class="text-violet-400 hover:text-violet-300 transition-colors duration-300 text-sm"
                  >
                    Demo
                  </a>
                  <a
                    v-if="project.source && project.sourceLink !== '#'"
                    :href="project.sourceLink"
                    target="_blank"
                    class="text-violet-400 hover:text-violet-300 transition-colors duration-300 text-sm"
                  >
                    Source
                  </a>
                </div>
              </div>
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
        class="bg-slate-800/90 p-10 rounded-xl shadow-lg shadow-violet-500/20 transition-all duration-700 mb-16 backdrop-blur-sm"
        data-section="skills"
        :class="[
          isInViewport.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          'hover:shadow-xl hover:shadow-violet-500/30',
        ]"
      >
        <h2
          class="text-2xl font-semibold text-violet-400 mb-8 text-center flex items-center justify-center gap-2"
        >
          <span class="text-3xl">🎯</span>
          專業技能
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="skill in SKILLS"
            :key="skill.title"
            class="group relative bg-slate-800/50 p-6 rounded-xl transition-all duration-300 hover:bg-slate-800/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <div
              :class="[skill.bgColor, skill.hoverBgColor]"
              class="w-16 h-16 rounded-full mx-auto mb-4 transition-all duration-300 shadow-lg shadow-violet-500/10 transform group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center"
            >
              <span
                class="text-2xl transform transition-transform duration-300 group-hover:scale-110"
                >{{ skill.icon }}</span
              >
            </div>
            <h3
              class="font-medium text-violet-400 mb-4 transition-colors duration-300 group-hover:text-violet-300 text-center"
            >
              {{ skill.title }}
            </h3>
            <div class="flex flex-wrap gap-2 justify-center">
              <span
                v-for="(item, index) in skill.description.split(', ')"
                :key="index"
                :class="[skill.bgColor, skill.hoverBgColor]"
                class="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md cursor-default opacity-90 hover:opacity-100"
              >
                {{ item }}
              </span>
            </div>
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

/* 添加打字機效果 */
.typewriter {
  overflow: hidden;
  animation: fadeIn 1s ease-out forwards;
}

/* 添加3D效果 */
.perspective {
  perspective: 1000px;
}

/* 優化過渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

/* 統一動畫延遲 */
[style*='animation-delay'] {
  opacity: 0;
}
</style>
