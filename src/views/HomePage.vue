<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 overflow-hidden">
    <!-- 粒子背景效果 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="particles-container">
        <div v-for="n in 50" :key="n" 
             :class="`particle particle-${n}`"
             :style="{ 
               '--delay': `${Math.random() * 20}s`,
               '--duration': `${15 + Math.random() * 10}s`,
               '--size': `${2 + Math.random() * 4}px`
             }"></div>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <main class="container mx-auto px-6 py-12 relative z-10">
      <!-- 英雄區域 -->
      <section class="text-center mb-16">
        <div class="relative">
          <!-- 背景裝飾 -->
          <div class="absolute inset-0 -z-10">
            <div class="absolute top-20 left-1/4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-blob animate-pulse-slow"></div>
            <div class="absolute top-20 right-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-blob animation-delay-2000 animate-pulse-slow"></div>
            <div class="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-30 animate-blob animation-delay-4000 animate-pulse-slow"></div>
            <!-- 新增更多動態元素 -->
            <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-200 dark:bg-cyan-800 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-2xl opacity-20 animate-spin-slow"></div>
            <div class="absolute top-10 right-10 w-32 h-32 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-lg opacity-40 animate-bounce-slow"></div>
          </div>
          
          <!-- 個人頭像 -->
          <div class="mb-8">
            <div class="relative inline-block animate-float">
              <div class="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 p-1 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 animate-gradient-x">
                <div class="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-20 h-20 text-gray-400 dark:text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21Z M20 10H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10Z"/>
                  </svg>
                </div>
              </div>
              <!-- 狀態指示器 -->
              <div class="absolute bottom-2 right-2 w-8 h-8 bg-green-400 dark:bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse">
                <div class="w-full h-full rounded-full bg-green-400 dark:bg-green-500 animate-ping opacity-75"></div>
              </div>
              <!-- 光環效果 -->
              <div class="absolute inset-0 rounded-full border-2 border-blue-300 dark:border-blue-600 animate-ping opacity-30"></div>
              <div class="absolute inset-0 rounded-full border border-purple-300 dark:border-purple-600 animate-ping opacity-20 animation-delay-1000"></div>
            </div>
          </div>
          
          <!-- 主標題 -->
          <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-fadeInUp animate-gradient-x hover:animate-text-glow">
            <span class="inline-block hover:animate-bounce">J</span>
            <span class="inline-block hover:animate-bounce animation-delay-100">u</span>
            <span class="inline-block hover:animate-bounce animation-delay-200">i</span>
            <span class="inline-block hover:animate-bounce animation-delay-300">-</span>
            <span class="inline-block hover:animate-bounce animation-delay-400">H</span>
            <span class="inline-block hover:animate-bounce animation-delay-500">s</span>
            <span class="inline-block hover:animate-bounce animation-delay-600">u</span>
            <span class="inline-block hover:animate-bounce animation-delay-700">a</span>
            <span class="inline-block hover:animate-bounce animation-delay-800">n</span>
            <span class="inline-block hover:animate-bounce animation-delay-900">&nbsp;</span>
            <span class="inline-block hover:animate-bounce animation-delay-1000">L</span>
            <span class="inline-block hover:animate-bounce animation-delay-1100">e</span>
            <span class="inline-block hover:animate-bounce animation-delay-1200">e</span>
          </h1>
          
          <!-- 副標題 -->
          <div class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 animate-fadeInUp animation-delay-300">
            <span class="typewriter-text">{{ displayText }}</span>
            <span class="animate-blink">|</span>
          </div>
          
          <!-- 描述 -->
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-fadeInUp animation-delay-600">
            熱愛創新技術的全端開發者，專注於美觀實用的數位體驗。<br>
            擅長前後端開發與雲端部署，並結合 AI 技術如機器學習與大型語言模型，打造智慧化與高效能的應用系統。
          </p>
          
          <!-- 行動按鈕 -->
          <div class="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-900">
            <button class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              查看作品集
            </button>
            <button class="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              聯絡我
            </button>
          </div>
        </div>
      </section>

      <!-- 技能區域 -->
      <section class="mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          技術專長
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 前端開發 -->
          <div class="skill-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-100 dark:border-gray-700 group relative overflow-hidden">
            <!-- 光效背景 -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <svg class="w-8 h-8 text-white transition-all duration-300 group-hover:animate-spin" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">前端開發</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              精通現代前端技術，創造響應式且互動性強的使用者介面
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">Vue.js</span>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">React</span>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">TypeScript</span>
            </div>
          </div>

          <!-- 後端開發 -->
          <div class="skill-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-100 dark:border-gray-700 group relative overflow-hidden">
            <!-- 光效背景 -->
            <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <svg class="w-8 h-8 text-white transition-all duration-300 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">後端開發</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              建構穩定可靠的伺服器端應用程式與API服務
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">Node.js</span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">Python</span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">Express</span>
            </div>
          </div>

          <!-- 雲端服務 -->
          <div class="skill-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-100 dark:border-gray-700 group relative overflow-hidden">
            <!-- 光效背景 -->
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10">
              <svg class="w-8 h-8 text-white transition-all duration-300 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.5,20Q4.22,20 2.61,18.43Q1,16.85 1,14.58Q1,12.63 2.17,11.1Q3.35,9.57 5.25,9.15Q5.88,6.85 7.75,5.43Q9.63,4 12,4Q14.93,4 16.96,6.04Q19,8.07 19,11Q20.73,11.2 21.86,12.5Q23,13.78 23,15.5Q23,17.38 21.69,18.69Q20.38,20 18.5,20H6.5M6.5,18H18.5Q19.75,18 20.38,17.38Q21,16.75 21,15.5Q21,14.25 20.38,13.63Q19.75,13 18.5,13H17V11Q17,8.79 15.61,7.39Q14.21,6 12,6Q9.79,6 8.39,7.39Q7,8.79 7,11H6.5Q5.08,11 4.04,12.04Q3,13.08 3,14.5Q3,15.92 4.04,16.96Q5.08,18 6.5,18Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">雲端服務</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              熟悉雲端平台部署與DevOps實務，確保應用程式高可用性
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">AWS</span>
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">Docker</span>
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">GitHub Actions</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 特色專案區域 -->
      <section class="mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
          精選專案
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 專案卡片 1 -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105 border border-gray-100 dark:border-gray-700 relative">
            <div class="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <!-- 動態光線效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">電商平台開發</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                全功能電商平台，包含購物車、付款系統、訂單管理等完整功能
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">Vue.js</span>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">Node.js</span>
                <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-sm">MongoDB</span>
              </div>
              <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                查看詳情
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 專案卡片 2 -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:-rotate-1 hover:scale-105 border border-gray-100 dark:border-gray-700 relative">
            <div class="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <!-- 動態光線效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">任務管理系統</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                團隊協作任務管理工具，支援即時通知、進度追蹤與檔案分享
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">React</span>
                <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm">Express</span>
                <span class="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm">Redis</span>
              </div>
              <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                查看詳情
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 聯絡資訊區域 -->
      <section class="text-center">
        <div class="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-glow-pulse">
          <!-- 背景動畫效果 -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            讓我們一起創造amazing的東西
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            有任何專案想法或合作機會嗎？歡迎隨時與我聯絡，讓我們一起把創意變成現實！
          </p>
          
          <!-- 社群媒體連結 -->
          <div class="flex justify-center gap-6 mb-8">
            <a href="#" class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float animation-delay-100">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
              </svg>
            </a>
            <a href="#" class="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float animation-delay-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/>
              </svg>
            </a>
            <a href="#" class="w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float animation-delay-500">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </a>
          </div>
          
          <!-- 聯絡按鈕 -->
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            開始對話
          </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 打字機效果
const displayText = ref('AI 工程師')
const fullTexts = [
  '全端開發者',
  'AI 工程師',
  '資安研究者',
  '資料科學愛好者',
  '創新應用開發者',
  '技術內容創作者',
  '自動化工具開發者'
]

const currentTextIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)
const typeSpeed = ref(100)

const typeWriter = () => {
  const currentText = fullTexts[currentTextIndex.value]
  
  if (isDeleting.value) {
    displayText.value = currentText.substring(0, currentCharIndex.value - 1)
    currentCharIndex.value--
    typeSpeed.value = 50
  } else {
    displayText.value = currentText.substring(0, currentCharIndex.value + 1)
    currentCharIndex.value++
    typeSpeed.value = 100
  }
  
  if (!isDeleting.value && currentCharIndex.value === currentText.length) {
    // 完成打字，等待一段時間後開始刪除
    typeSpeed.value = 2000
    isDeleting.value = true
  } else if (isDeleting.value && currentCharIndex.value === 0) {
    // 完成刪除，切換到下一個文字
    isDeleting.value = false
    currentTextIndex.value = (currentTextIndex.value + 1) % fullTexts.length
    typeSpeed.value = 500
  }
  
  // 設置下一次執行
  setTimeout(typeWriter, typeSpeed.value)
}

let typeTimeout

onMounted(() => {
  // 開始打字機效果
  setTimeout(typeWriter, 1000)
})

onUnmounted(() => {
  if (typeTimeout) {
    clearTimeout(typeTimeout)
  }
})
</script>

<style scoped>
/* 動畫定義 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 新增酷炫動畫 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

@keyframes text-glow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce-slow {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes particle-float {
  0% {
    transform: translateY(100vh) translateX(0px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes matrix-rain {
  0% {
    transform: translateY(-100vh);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.2), 0 0 10px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1);
  }
}

/* 動畫類別 */
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-blink {
  animation: blink 1s infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-text-glow {
  animation: text-glow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* 粒子動畫 */
.particles-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.2) 70%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  animation: particle-float var(--duration) linear infinite;
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
  left: calc(var(--random) * 100%);
}

/* 為每個粒子設置隨機位置 */
.particle-1 { --random: 0.1; }
.particle-2 { --random: 0.2; }
.particle-3 { --random: 0.3; }
.particle-4 { --random: 0.4; }
.particle-5 { --random: 0.5; }
.particle-6 { --random: 0.6; }
.particle-7 { --random: 0.7; }
.particle-8 { --random: 0.8; }
.particle-9 { --random: 0.9; }
.particle-10 { --random: 0.15; }
.particle-11 { --random: 0.25; }
.particle-12 { --random: 0.35; }
.particle-13 { --random: 0.45; }
.particle-14 { --random: 0.55; }
.particle-15 { --random: 0.65; }
.particle-16 { --random: 0.75; }
.particle-17 { --random: 0.85; }
.particle-18 { --random: 0.95; }
.particle-19 { --random: 0.05; }
.particle-20 { --random: 0.12; }
.particle-21 { --random: 0.22; }
.particle-22 { --random: 0.32; }
.particle-23 { --random: 0.42; }
.particle-24 { --random: 0.52; }
.particle-25 { --random: 0.62; }
.particle-26 { --random: 0.72; }
.particle-27 { --random: 0.82; }
.particle-28 { --random: 0.92; }
.particle-29 { --random: 0.17; }
.particle-30 { --random: 0.27; }
.particle-31 { --random: 0.37; }
.particle-32 { --random: 0.47; }
.particle-33 { --random: 0.57; }
.particle-34 { --random: 0.67; }
.particle-35 { --random: 0.77; }
.particle-36 { --random: 0.87; }
.particle-37 { --random: 0.97; }
.particle-38 { --random: 0.07; }
.particle-39 { --random: 0.19; }
.particle-40 { --random: 0.29; }
.particle-41 { --random: 0.39; }
.particle-42 { --random: 0.49; }
.particle-43 { --random: 0.59; }
.particle-44 { --random: 0.69; }
.particle-45 { --random: 0.79; }
.particle-46 { --random: 0.89; }
.particle-47 { --random: 0.99; }
.particle-48 { --random: 0.13; }
.particle-49 { --random: 0.23; }
.particle-50 { --random: 0.33; }

/* 技能卡片特效 */
.skill-card {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.skill-card:hover {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 延遲動畫 */
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-700 { animation-delay: 0.7s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-900 { animation-delay: 0.9s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-1100 { animation-delay: 1.1s; }
.animation-delay-1200 { animation-delay: 1.2s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* 響應式設計 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
