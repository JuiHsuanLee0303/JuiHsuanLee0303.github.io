import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ResearchPage from '../views/ResearchPage.vue'
import ExperiencePage from '../views/ExperiencePage.vue'
import TerminalPage from '../views/TerminalPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/research', component: ResearchPage },
  { path: '/experience', component: ExperiencePage },
  { path: '/terminal', component: TerminalPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
