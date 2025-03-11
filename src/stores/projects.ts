import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [
      {
        title: '線上題庫測驗系統',
        description:
          '使用 Vue 3 和 TypeScript 開發的線上題庫測驗系統，具備題目匯入與管理、測驗管理等功能。',
        image:
          'https://images.unsplash.com/photo-1585432959449-b1c9c8cc49ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Pinia'],
        demo: true,
        demoLink: 'https://juihsuanlee0303.github.io/question-practice-frontend/',
        source: true,
        sourceLink: 'https://github.com/JuiHsuanLee0303/question-practice',
      },
      {
        title: 'HackMD CLI',
        description:
          '使用 JavaScript 開發的 HackMD CLI，具備使用命令行操作 HackMD 與本地、遠端同步的功能。',
        image:
          'https://plus.unsplash.com/premium_photo-1726754457459-d2dfa2e3a434?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['JavaScript', 'Node.js'],
        demo: false,
        demoLink: '#',
        source: true,
        sourceLink: 'https://github.com/JuiHsuanLee0303/hackmd-cli',
      },
      {
        title: '大學學雜費減免系統',
        description:
          '使用 Vue 3 和 Node.js 開發的大學學雜費減免系統，具備申請管理、審核流程等功能。',
        image:
          'https://plus.unsplash.com/premium_photo-1671796330300-71ca39909fb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Vue.js', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
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
        description:
          '使用 Vue 3 和 TypeScript 開發的個人作品展示網站，具備響應式設計和流暢動畫效果。',
        image:
          'https://plus.unsplash.com/premium_photo-1661288470388-c5006797bdff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
        demo: true,
        demoLink: '#',
        source: true,
        sourceLink: 'https://github.com/JuiHsuanLee0303/JuiHsuanLee0303.github.io',
      },
    ],
  }),
})
