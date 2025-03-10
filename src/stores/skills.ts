import { defineStore } from 'pinia'

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    categories: [
      {
        name: 'frontend',
        title: '前端開發',
        icon: '💻',
      },
      {
        name: 'backend',
        title: '後端開發',
        icon: '⚙️',
      },
      {
        name: 'database',
        title: '資料庫',
        icon: '💾',
      },
      {
        name: 'ai',
        title: '人工智慧',
        icon: '🤖',
      },
      {
        name: 'tools',
        title: '開發工具',
        icon: '🔍',
      },
      {
        name: 'data',
        title: '資料科學',
        icon: '📊',
      },
    ],
    skills: [
      {
        name: 'Vue.js',
        icon: 'vue',
        category: 'frontend',
      },
      {
        name: 'TypeScript',
        icon: 'ts',
        category: 'frontend',
      },
      {
        name: 'Tailwind CSS',
        icon: 'tailwind',
        category: 'frontend',
      },
      {
        name: 'Node.js',
        icon: 'nodejs',
        category: 'backend',
      },
      {
        name: 'Python',
        icon: 'python',
        category: 'backend',
      },
      {
        name: 'Express',
        icon: 'express',
        category: 'backend',
      },
      {
        name: 'PostgreSQL',
        icon: 'postgres',
        category: 'database',
      },
      {
        name: 'MySQL',
        icon: 'mysql',
        category: 'database',
      },
      {
        name: 'MongoDB',
        icon: 'mongodb',
        category: 'database',
      },
      {
        name: 'Git',
        icon: 'git',
        category: 'tools',
      },
      {
        name: 'GitHub',
        icon: 'github',
        category: 'tools',
      },
      {
        name: 'Docker',
        icon: 'docker',
        category: 'tools',
      },
      {
        name: 'PyTorch',
        icon: 'pytorch',
        category: 'ai',
      },
      {
        name: 'TensorFlow',
        icon: 'tensorflow',
        category: 'ai',
      },
      {
        name: 'Scikit-learn',
        icon: 'sklearn',
        category: 'ai',
      },
      {
        name: 'Pandas',
        icon: 'pandas',
        category: 'data',
      },
      {
        name: 'NumPy',
        icon: 'numpy',
        category: 'data',
      },
      {
        name: 'Matplotlib',
        icon: 'matplotlib',
        category: 'data',
      },
      {
        name: 'Seaborn',
        icon: 'seaborn',
        category: 'data',
      },
    ],
  }),
})
