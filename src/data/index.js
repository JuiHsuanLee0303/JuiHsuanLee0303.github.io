// 統一匯入所有資料檔案
import homeData from './home.json'
import portfolioData from './portfolio.json'
import blogData from './blog.json'
import gamesData from './games.json'
import navigationData from './navigation.json'

// 匯出所有資料
export {
  homeData,
  portfolioData,
  blogData,
  gamesData,
  navigationData
}

// 也可以匯出個別資料
export const typewriterTexts = homeData.typewriterTexts
export const skills = homeData.skills
export const homeProjects = homeData.projects
export const portfolioProjects = portfolioData.projects
export const categories = portfolioData.categories
export const blogPosts = blogData.posts
export const games = gamesData.games
export const navItems = navigationData.navItems
export const darkModeIcons = navigationData.darkModeIcons
export const darkModeText = navigationData.darkModeText 