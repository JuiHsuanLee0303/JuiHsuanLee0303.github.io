// 統一匯入所有資料檔案
import homeData from './home.json'
import researchData from './research.json'
import experienceData from './experience.json'
import navigationData from './navigation.json'
import commonData from './common.json'
import terminalData from './terminal.json'
import uiData from './ui.json'

// 匯出所有資料
export {
  homeData,
  researchData,
  experienceData,
  navigationData,
  commonData,
  terminalData,
  uiData
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

// 共同資料
export const personalInfo = commonData.personalInfo
export const asciiArt = commonData.asciiArt
export const aboutText = commonData.aboutText
export const quickLinks = commonData.quickLinks

// 終端機資料
export const terminalWelcomeMessages = terminalData.welcomeMessages
export const terminalHelpCommand = terminalData.helpCommand
export const terminalCommandOutputs = terminalData.commandOutputs
export const terminalFileContents = terminalData.fileContents
export const terminalLsOutputs = terminalData.lsOutputs
export const terminalErrorMessages = terminalData.errorMessages

// UI 資料
export const researchFilters = uiData.researchFilters
export const bootAnimationData = uiData.bootAnimation 