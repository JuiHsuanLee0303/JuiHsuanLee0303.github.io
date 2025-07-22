import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import PortfolioPage from '../views/PortfolioPage.vue'
import BlogPage from '../views/BlogPage.vue'
import BlogPostPage from '../views/BlogPostPage.vue'
import GamesPage from '../views/GamesPage.vue'
import GuessTheNumber from '../views/games/GuessTheNumber.vue'
import BullsAndCows from '../views/games/BullsAndCows.vue'
import ZombieShooter from '../views/games/ZombieShooter.vue'
import AircraftShooter from '../views/games/AircraftShooter.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/portfolio', component: PortfolioPage },
  { path: '/blog', component: BlogPage },
  { path: '/blog/:slug', component: BlogPostPage },
  { path: '/games', component: GamesPage },
  { path: '/games/guess-the-number', component: GuessTheNumber },
  { path: '/games/bulls-and-cows', component: BullsAndCows },
  { path: '/games/zombie-shooter', component: ZombieShooter },
  { path: '/games/aircraft-shooter', component: AircraftShooter },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
