import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
// import SkillsPage from '@/views/SkillsPage.vue'
import PortfolioPage from '@/views/PortfolioPage.vue'
import BlogPage from '@/views/BlogPage.vue'
// import ContactPage from '@/views/ContactPage.vue'
// import CertificationsPage from '@/views/CertificationsPage.vue'
// import NewsPage from '@/views/NewsPage.vue'
// import FaqPage from '@/views/FaqPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/about',
      component: AboutPage,
    },
    // {
    //   path: '/skills',
    //   component: SkillsPage,
    // },
    {
      path: '/portfolio',
      component: PortfolioPage,
    },
    {
      path: '/blog',
      component: BlogPage,
    },
    {
      path: '/blog/:id',
      name: 'BlogArticle',
      component: () => import('@/views/BlogArticle.vue'),
    },
    // {
    //   path: '/contact',
    //   component: ContactPage,
    // },
    // {
    //   path: '/certifications',
    //   component: CertificationsPage,
    // },
    // {
    //   path: '/news',
    //   component: NewsPage,
    // },
    // {
    //   path: '/faq',
    //   component: FaqPage,
    // },
  ],
})

export default router
