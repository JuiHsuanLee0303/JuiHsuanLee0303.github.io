import { defineStore } from 'pinia'

export const useRoutesStore = defineStore('routes', {
  state: () => ({
    routes: [
      { path: '/about', name: '關於我' },
      { path: '/resume', name: '履歷' },
      // { path: '/skills', name: '技能展示' },
      { path: '/portfolio', name: '專案作品' },
      // { path: '/blog', name: '部落格' },
      { path: '/contact', name: '聯絡我' },
      // { path: '/certifications', name: '認證與獎項' },
      // { path: '/news', name: '最新動態' },
      // { path: '/faq', name: '常見問題' },
    ],
  }),
})
