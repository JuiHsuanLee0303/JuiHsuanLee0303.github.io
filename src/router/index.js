import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomePage.vue'),
    meta: {
      title: '首頁',
      description: 'Jui-Hsuan Lee 的個人網站，聚焦 AI 應用、全端開發、資訊安全與研究成果。'
    }
  },
  {
    path: '/research',
    component: () => import('../views/ResearchPage.vue'),
    meta: {
      title: '學術研究',
      description: '瀏覽研討會參與、論文發表、研究主題與 PDF 資源整理。'
    }
  },
  {
    path: '/experience',
    component: () => import('../views/ExperiencePage.vue'),
    meta: {
      title: '工作經歷',
      description: '查看 Jui-Hsuan Lee 的工作經歷、職責與技術關鍵字。'
    }
  },
  {
    path: '/terminal',
    component: () => import('../views/TerminalPage.vue'),
    meta: {
      title: '終端機',
      description: '以互動終端機形式探索個人網站內容、研究與工作資訊。'
    }
  },
  {
    path: '/notes',
    component: () => import('../views/NotesPage.vue'),
    meta: {
      title: '筆記文章',
      description: '以部落格形式整理 Markdown 筆記、圖片與附件，集中展示技術文章與個人知識庫。'
    }
  },
  {
    path: '/notes/:slug',
    component: () => import('../views/NoteDetailPage.vue'),
    meta: {
      title: '筆記文章',
      description: '閱讀單篇筆記文章與附帶資源。'
    }
  },
]

const siteTitle = 'Jui-Hsuan Lee'
const defaultDescription = '個人網站，聚焦 AI 應用、全端開發、資訊安全與學術研究。'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const pageTitle = to.meta?.title ? `${to.meta.title} | ${siteTitle}` : siteTitle
  const pageDescription = to.meta?.description || defaultDescription

  document.title = pageTitle

  const ensureMetaTag = (selector, attributes) => {
    let element = document.head.querySelector(selector)

    if (!element) {
      element = document.createElement('meta')
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
      document.head.appendChild(element)
    }

    return element
  }

  ensureMetaTag('meta[name="description"]', { name: 'description' }).setAttribute('content', pageDescription)
  ensureMetaTag('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', pageTitle)
  ensureMetaTag('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', pageDescription)
  ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', pageTitle)
  ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', pageDescription)
})

export default router
