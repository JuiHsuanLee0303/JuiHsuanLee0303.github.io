import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [
      {
        title: 'Auto Commit Bot',
        category: '人工智慧',
        description:
          '使用大型語言模型（LLM）自動生成 Git Commit 內容的 Python 工具包。支援多種 LLM 提供商，遵循 Conventional Commits 格式，具備自動分析 git diff 並生成結構化提交訊息的功能。',
        image:
          'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Python', 'PyTorch', 'LLM', 'Git', 'CLI'],
        demo: false,
        demoLink: '#',
        source: true,
        sourceLink: 'https://github.com/JuiHsuanLee0303/auto-commit-bot',
      },
      {
        title: 'py-mail-me',
        category: '工具',
        description:
          'py-mail-me 是一款輕量級 Python 套件，可在程式執行結束後自動發送 Email 通知。支援附加 log 檔與錯誤資訊，適用於模型訓練、資料處理等長時間任務。可透過裝飾器或 context manager 快速整合，並支援環境變數或動態設定，讓你不必再手動查看執行狀態。',
        image:
          'https://plus.unsplash.com/premium_photo-1661375025352-d5a4d633999b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: ['Python', 'Email', 'Logging'],
        demo: false,
        demoLink: '#',
        source: true,
        sourceLink: 'https://github.com/JuiHsuanLee0303/py-mail-me',
      },
      {
        title: '線上題庫測驗系統',
        category: '網頁前端',
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
        category: '工具',
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
        category: '網頁全端',
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
        category: '人工智慧',
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
        category: '網頁前端',
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
