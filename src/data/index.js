// 統一匯入所有資料檔案
import homeData from './home.json'
import researchData from './research.json'
import experienceData from './experience.json'
import navigationData from './navigation.json'

// 匯出所有資料
export {
  homeData,
  researchData,
  experienceData,
  navigationData
}

// 也可以匯出個別資料
export const typewriterTexts = homeData.typewriterTexts
export const skills = homeData.skills
export const homeProjects = homeData.projects
export const conferences = researchData.conferences
export const publications = researchData.publications
export const experiences = experienceData.experiences
export const navItems = navigationData.navItems
export const darkModeIcons = navigationData.darkModeIcons
export const darkModeText = navigationData.darkModeText 