<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 overflow-hidden custom-cursor" ref="mainContainer">

    <!-- 主要內容區域 -->
    <main class="container mx-auto px-6 py-12 relative z-10">
      <!-- 英雄區域 -->
      <section class="text-center mb-16">
        <div class="relative">
          <!-- 個人頭像 -->
          <div class="mb-8">
            <div 
              class="relative inline-block animate-float avatar-container group cursor-pointer"
              @click="openAvatarModal"
              title="點擊查看大圖"
            >
              <div class="w-40 h-40 avatar-mobile mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 p-1 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 animate-gradient-x">
                <div class="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center backdrop-blur-sm overflow-hidden relative pointer-events-none">
                  <!-- 載入狀態 -->
                  <div 
                    v-if="avatarLoading" 
                    class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full avatar-loading"
                  >
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                  
                  <!-- 錯誤狀態 -->
                  <div 
                    v-else-if="avatarError" 
                    class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    <svg class="w-16 h-16 text-gray-400 dark:text-gray-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21Z M20 10H4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10Z"/>
                    </svg>
                  </div>
                  
                  <!-- 頭像圖片 -->
                  <img 
                    :src="avatarSrc" 
                    alt="Jui-Hsuan Lee 的頭像" 
                    class="w-full h-full rounded-full object-cover object-center transition-all duration-500 avatar-image"
                    :class="{ 
                      'opacity-0': avatarLoading || avatarError, 
                      'opacity-100': !avatarLoading && !avatarError,
                      'filter brightness-110 contrast-110': !avatarLoading && !avatarError,
                      'hover:brightness-125': !avatarLoading && !avatarError
                    }"
                    @load="onAvatarLoad"
                    @error="onAvatarError"
                    loading="lazy"
                  >
                </div>
              </div>
              <!-- 狀態指示器 -->
              <div class="absolute bottom-2 right-2 w-8 h-8 bg-green-400 dark:bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse pointer-events-none">
                <div class="w-full h-full rounded-full bg-green-400 dark:bg-green-500 animate-ping opacity-75"></div>
              </div>
              
              <!-- 點擊提示圖標 -->
              <div class="absolute top-2 right-2 w-6 h-6 bg-blue-500 bg-opacity-80 dark:bg-blue-600 dark:bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </div>
              <!-- 光環效果 -->
              <div class="absolute inset-0 rounded-full border-2 border-blue-300 dark:border-blue-600 animate-ping opacity-30 pointer-events-none"></div>
              <div class="absolute inset-0 rounded-full border border-purple-300 dark:border-purple-600 animate-ping opacity-20 animation-delay-1000 pointer-events-none"></div>
            </div>
          </div>
          
          <!-- 主標題 - 霓虹燈效果 -->
          <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-fadeInUp animate-gradient-x neon-text-effect relative">
            <span class="inline-block hover:animate-bounce hover:neon-glow transition-all duration-300">J</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-100 transition-all duration-300">u</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-200 transition-all duration-300">i</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-300 transition-all duration-300">-</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-400 transition-all duration-300">H</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-500 transition-all duration-300">s</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-600 transition-all duration-300">u</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-700 transition-all duration-300">a</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-800 transition-all duration-300">n</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-900 transition-all duration-300">&nbsp;</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-1000 transition-all duration-300">L</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-1100 transition-all duration-300">e</span>
            <span class="inline-block hover:animate-bounce hover:neon-glow animation-delay-1200 transition-all duration-300">e</span>
            <!-- 閃爍光點效果 -->
            <div class="absolute -top-4 -right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div class="absolute -bottom-2 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
            <div class="absolute top-1/2 -left-2 w-1 h-1 bg-pink-400 rounded-full animate-ping animation-delay-2000"></div>
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
          
          <!-- 行動按鈕 - 磁力效果 -->
          <div class="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-900">
            <button class="magnetic-button bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
              <span class="relative z-10">查看作品集</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <button class="magnetic-button border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
              <span class="relative z-10">聯絡我</span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
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
          <!-- 技能卡片 - 使用 v-for -->
          <div 
            v-for="skill in skills" 
            :key="skill.id"
            class="skill-card-3d group perspective-1000"
          >
            <div class="skill-card-inner transform-gpu transition-all duration-700 preserve-3d group-hover:rotate-y-180">
              <!-- 前面 -->
              <div class="skill-card-front absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 backface-hidden overflow-hidden">
                <!-- 光效背景 -->
                <div :class="`absolute inset-0 bg-gradient-to-r ${skill.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out`"></div>
                <div :class="`w-16 h-16 bg-gradient-to-r ${skill.gradient} rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10`">
                  <svg class="w-8 h-8 text-white transition-all duration-300 group-hover:animate-spin" fill="currentColor" viewBox="0 0 24 24">
                    <path :d="skill.icon"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{{ skill.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  {{ skill.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tech in skill.technologies" 
                    :key="tech.name"
                    :class="`px-3 py-1 bg-${tech.color}-100 dark:bg-${tech.color}-900 text-${tech.color}-800 dark:text-${tech.color}-200 rounded-full text-sm`"
                  >
                    {{ tech.name }}
                  </span>
                </div>
              </div>
              <!-- 背面 - 技能進度條 -->
              <div :class="`skill-card-back absolute inset-0 bg-gradient-to-br ${skill.gradient.replace('500', '600')} rounded-2xl p-8 shadow-xl backface-hidden rotate-y-180 text-white`">
                <h3 class="text-xl font-bold mb-6 text-center">技能熟練度</h3>
                <div class="space-y-4">
                  <div 
                    v-for="(skillLevel, index) in skill.skillLevels" 
                    :key="skillLevel.name"
                    class="skill-progress-item"
                  >
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium">{{ skillLevel.name }}</span>
                      <span class="text-sm">{{ skillLevel.level }}%</span>
                    </div>
                    <div class="w-full bg-white/20 rounded-full h-2">
                      <div 
                        class="skill-progress-bar bg-white h-2 rounded-full transition-all duration-2000 ease-out" 
                        :class="`animation-delay-${index * 300}`"
                        :style="`width: ${skillLevel.level}%`"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
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
          <!-- 專案卡片 -->
          <div 
            v-for="(project, index) in projects" 
            :key="project.id"
            :class="`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700 relative ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`"
          >
            <div :class="`h-48 bg-gradient-to-r ${project.gradient} relative overflow-hidden`">
              <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <!-- 動態光線效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <div class="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path :d="project.icon"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech.name"
                  :class="`px-2 py-1 bg-${tech.color}-100 dark:bg-${tech.color}-900 text-${tech.color}-800 dark:text-${tech.color}-200 rounded text-sm`"
                >
                  {{ tech.name }}
                </span>
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

    <!-- 頭像放大模態框 -->
    <div 
      v-if="showAvatarModal"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 modal-backdrop animate-modalEnter"
      @click="closeAvatarModal"
      @mousemove="handleModalMouseMove"
      @mouseleave="handleModalMouseLeave"
      style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;"
    >
      <!-- 動態背景效果 -->
      <div class="absolute inset-0 modal-bg-effect">
        <div 
          v-for="n in 8" 
          :key="n" 
          class="modal-particle"
          :style="{ 
            '--delay': `${Math.random() * 4}s`,
            '--duration': `${8 + Math.random() * 4}s`,
            '--size': `${2 + Math.random() * 3}px`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`
          }"
        ></div>
      </div>

      <div class="relative max-w-4xl max-h-full modal-content-container">
        <!-- 工具欄 -->
        <div class="absolute -top-16 left-0 right-0 flex justify-between items-center z-20">
          <!-- 控制按鈕 -->
          <div class="flex items-center gap-2">
            <button 
              @click.stop="rotateImage(-1)"
              class="modal-control-btn"
              title="向左旋轉 (←)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
              </svg>
            </button>
            <button 
              @click.stop="rotateImage(1)"
              class="modal-control-btn"
              title="向右旋轉 (→)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <button 
              @click.stop="resetImageTransform"
              class="modal-control-btn"
              title="重置 (0)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
          
          <!-- 關閉按鈕 -->
          <button 
            @click="closeAvatarModal"
            class="modal-control-btn bg-red-500/80 hover:bg-red-600/90"
            title="關閉 (ESC)"
          >
            <span class="text-sm hidden sm:inline mr-2">關閉</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- 放大圖片容器 -->
        <div 
          ref="imageContainer"
          class="image-container perspective-1000"
          @click.stop
          @wheel="handleImageWheel"
          @dblclick="handleImageDoubleClick"
          :style="{
            transform: `
              rotateX(${modalTiltEffect.x}deg) 
              rotateY(${modalTiltEffect.y}deg)
              scale(1.02)
            `
          }"
        >
          <!-- 載入狀態覆蓋層 -->
          <div 
            v-if="modalImageLoading"
            class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-xl z-10 modal-loading"
          >
            <div class="flex flex-col items-center gap-4">
              <div class="loading-spinner"></div>
              <p class="text-white text-sm font-medium animate-pulse">載入絕美瞬間...</p>
              <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <!-- 放大圖片 -->
          <div class="image-wrapper">
            <img 
              :src="avatarSrc"
              alt="Jui-Hsuan Lee 的頭像 - 放大檢視"
              class="modal-image"
              :style="{
                transform: `
                  scale(${modalImageScale}) 
                  rotate(${modalImageRotate}deg)
                  translate(${modalImagePosition.x}px, ${modalImagePosition.y}px)
                `,
                opacity: modalImageLoading ? 0 : 1
              }"
              @load="onModalImageLoad"
              @error="onModalImageError"
            >
            
                         <!-- 圖片裝飾效果 -->
             <div 
               class="image-decorations"
               :class="{ 'opacity-0': modalImageLoading, 'opacity-100': !modalImageLoading }"
             >
               <!-- 光暈效果 -->
               <div class="image-glow-1"></div>
               <div class="image-glow-2"></div>
               
               <!-- 邊框裝飾 -->
               <div class="image-border-decoration">
                 <div class="corner corner-tl"></div>
                 <div class="corner corner-tr"></div>
                 <div class="corner corner-bl"></div>
                 <div class="corner corner-br"></div>
               </div>
             </div>
          </div>
          
          <!-- 圖片信息 -->
          <div 
            class="image-info"
            :class="{ 'opacity-0 translate-y-4': modalImageLoading, 'opacity-100 translate-y-0': !modalImageLoading }"
          >
            <div class="info-content">
              <h3 class="info-title">Jui-Hsuan Lee</h3>
              <p class="info-subtitle">全端開發者 / AI 工程師</p>
                             <div class="info-stats">
                 <span class="stat-item">縮放: {{ modalImageScale.toFixed(1) }}×</span>
                 <span class="stat-item">旋轉: {{ modalImageRotate }}°</span>
               </div>
            </div>
          </div>
        </div>

        <!-- 操作提示 -->
        <!-- <div class="modal-hints">
          <div class="hint-group">
            <p class="hint-text">🎮 互動提示</p>
            <div class="hint-details">
              <span>滾輪縮放</span>
              <span>雙擊重置</span>
              <span>鍵盤控制 (R旋轉, ±縮放, 0重置)</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import avatarImage from '../assets/avatar.png'

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

// DOM 引用
const mainContainer = ref(null)

// 頭像相關狀態
const avatarSrc = ref(avatarImage)
const avatarLoading = ref(true)
const avatarError = ref(false)
const showAvatarModal = ref(false)
const modalImageLoading = ref(false)

// 模態框互動狀態
const modalImageScale = ref(1)
const modalImageRotate = ref(0)
const modalImagePosition = ref({ x: 0, y: 0 })
const isModalImageDragging = ref(false)
const modalMousePosition = ref({ x: 0, y: 0 })
const modalTiltEffect = ref({ x: 0, y: 0 })
const imageContainer = ref(null)

// 技能數據
const skills = ref([
  {
    id: 1,
    title: '前端開發',
    description: '精通現代前端技術，創造響應式且互動性強的使用者介面',
    gradient: 'from-blue-500 to-cyan-500',
    icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z',
    technologies: [
      { name: 'Vue.js', color: 'blue' },
      { name: 'React', color: 'blue' },
      { name: 'TypeScript', color: 'blue' }
    ],
    skillLevels: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 88 }
    ]
  },
  {
    id: 2,
    title: '後端開發',
    description: '建構穩定可靠的伺服器端應用程式與API服務',
    gradient: 'from-green-500 to-emerald-500',
    icon: 'M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z',
    technologies: [
      { name: 'Node.js', color: 'green' },
      { name: 'Python', color: 'green' },
      { name: 'Express', color: 'green' }
    ],
    skillLevels: [
      { name: 'Node.js', level: 92 },
      { name: 'Python', level: 89 },
      { name: 'Express', level: 94 }
    ]
  },
  {
    id: 3,
    title: '雲端服務',
    description: '熟悉雲端平台部署與DevOps實務，確保應用程式高可用性',
    gradient: 'from-purple-500 to-pink-500',
    icon: 'M6.5,20Q4.22,20 2.61,18.43Q1,16.85 1,14.58Q1,12.63 2.17,11.1Q3.35,9.57 5.25,9.15Q5.88,6.85 7.75,5.43Q9.63,4 12,4Q14.93,4 16.96,6.04Q19,8.07 19,11Q20.73,11.2 21.86,12.5Q23,13.78 23,15.5Q23,17.38 21.69,18.69Q20.38,20 18.5,20H6.5M6.5,18H18.5Q19.75,18 20.38,17.38Q21,16.75 21,15.5Q21,14.25 20.38,13.63Q19.75,13 18.5,13H17V11Q17,8.79 15.61,7.39Q14.21,6 12,6Q9.79,6 8.39,7.39Q7,8.79 7,11H6.5Q5.08,11 4.04,12.04Q3,13.08 3,14.5Q3,15.92 4.04,16.96Q5.08,18 6.5,18Z',
    technologies: [
      { name: 'AWS', color: 'purple' },
      { name: 'Docker', color: 'purple' },
      { name: 'GitHub Actions', color: 'purple' }
    ],
    skillLevels: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'CI/CD', level: 87 }
    ]
  }
])

// 專案數據
const projects = ref([
  {
    id: 1,
    title: '電商平台開發',
    description: '全功能電商平台，包含購物車、付款系統、訂單管理等完整功能',
    gradient: 'from-blue-400 to-purple-500',
    technologies: [
      { name: 'Vue.js', color: 'blue' },
      { name: 'Node.js', color: 'green' },
      { name: 'MongoDB', color: 'yellow' }
    ],
    icon: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
  },
  {
    id: 2,
    title: '任務管理系統',
    description: '團隊協作任務管理工具，支援即時通知、進度追蹤與檔案分享',
    gradient: 'from-green-400 to-blue-500',
    technologies: [
      { name: 'React', color: 'blue' },
      { name: 'Express', color: 'purple' },
      { name: 'Redis', color: 'red' }
    ],
    icon: 'M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z'
  },
  {
    id: 3,
    title: 'AI 智能聊天機器人',
    description: '基於大型語言模型的智能客服系統，支援多語言對話與情感分析',
    gradient: 'from-purple-400 to-pink-500',
    technologies: [
      { name: 'Python', color: 'blue' },
      { name: 'FastAPI', color: 'green' },
      { name: 'OpenAI', color: 'purple' }
    ],
    icon: 'M12,2C13.65,2 15,3.35 15,5C15,6.65 13.65,8 12,8C10.35,8 9,6.65 9,5C9,3.35 10.35,2 12,2M21,9V7L15,1V3H9V1L3,7V9H21M21,10H3V18H21V10Z'
  },
  {
    id: 4,
    title: '數據可視化儀表板',
    description: '企業級數據分析平台，提供即時數據監控與多維度報表生成',
    gradient: 'from-cyan-400 to-blue-500',
    technologies: [
      { name: 'D3.js', color: 'blue' },
      { name: 'Python', color: 'yellow' },
      { name: 'PostgreSQL', color: 'green' }
    ],
    icon: 'M3,3H21C21.53,3 22,3.47 22,4V20C22,20.53 21.53,21 21,21H3C2.47,21 2,20.53 2,20V4C2,3.47 2.47,3 3,3M4,5V19H20V5H4M6,7H18V9H6V7M6,11H14V13H6V11M6,15H16V17H6V15Z'
  }
])

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

// 隨機粒子顏色
const getRandomParticleColor = () => {
  const colors = [
    'rgba(59, 130, 246, 0.8)',    // blue
    'rgba(168, 85, 247, 0.8)',    // purple
    'rgba(236, 72, 153, 0.8)',    // pink
    'rgba(34, 197, 94, 0.8)',     // green
    'rgba(251, 191, 36, 0.8)'     // yellow
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// 頭像處理方法
const onAvatarLoad = () => {
  avatarLoading.value = false
  avatarError.value = false
}

const onAvatarError = () => {
  avatarLoading.value = false
  avatarError.value = true
  console.warn('頭像圖片載入失敗，使用預設圖標')
  
  // 可以嘗試載入備用圖片
  if (avatarSrc.value === avatarImage) {
    // 如果主要圖片失敗，可以嘗試網路頭像或使用預設圖標
    console.log('使用預設 SVG 圖標作為備用')
  }
}

// 頭像預覽功能
const openAvatarModal = () => {
  if (!avatarError.value && !avatarLoading.value) {
    showAvatarModal.value = true
    modalImageLoading.value = true
    resetImageTransform()
    // 鎖定背景滾動
    document.body.style.overflow = 'hidden'
    
    // 設置超時，避免永久載入狀態
    setTimeout(() => {
      if (modalImageLoading.value) {
        console.log('圖片載入超時，強制結束載入狀態')
        modalImageLoading.value = false
      }
    }, 5000) // 5秒超時
  }
}

const closeAvatarModal = () => {
  showAvatarModal.value = false
  modalImageLoading.value = false
  resetImageTransform()
  // 恢復背景滾動
  document.body.style.overflow = 'auto'
}

const onModalImageLoad = () => {
  console.log('模態框圖片載入成功')
  modalImageLoading.value = false
}

const onModalImageError = () => {
  console.warn('模態框圖片載入失敗')
  modalImageLoading.value = false
}

// 模態框互動功能
const resetImageTransform = () => {
  modalImageScale.value = 1
  modalImageRotate.value = 0
  modalImagePosition.value = { x: 0, y: 0 }
  modalTiltEffect.value = { x: 0, y: 0 }
}

let mouseMoveThrottle = null

const handleModalMouseMove = (event) => {
  if (!imageContainer.value) return
  
  // 節流處理，減少計算頻率
  if (mouseMoveThrottle) return
  mouseMoveThrottle = setTimeout(() => {
    mouseMoveThrottle = null
  }, 16) // 約60fps
  
  const rect = imageContainer.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // 計算相對位置 (-1 到 1)
  const relativeX = (event.clientX - centerX) / (rect.width / 2)
  const relativeY = (event.clientY - centerY) / (rect.height / 2)
  
  // 更新傾斜效果（減少角度）
  modalTiltEffect.value = {
    x: relativeY * 4, // 減少傾斜角度
    y: -relativeX * 4
  }
  
  modalMousePosition.value = { x: event.clientX, y: event.clientY }
}

const handleModalMouseLeave = () => {
  modalTiltEffect.value = { x: 0, y: 0 }
}

const handleImageWheel = (event) => {
  event.preventDefault()
  const scaleDelta = event.deltaY > 0 ? -0.1 : 0.1
  const newScale = Math.max(0.5, Math.min(3, modalImageScale.value + scaleDelta))
  modalImageScale.value = newScale
}

const handleImageDoubleClick = () => {
  // 雙擊重置變換
  resetImageTransform()
}

const rotateImage = (direction) => {
  modalImageRotate.value += direction * 90
}

// 鍵盤事件處理
const handleKeyDown = (event) => {
  if (!showAvatarModal.value) return
  
  switch (event.key) {
    case 'Escape':
      closeAvatarModal()
      break
    case 'r':
    case 'R':
      rotateImage(1)
      break
    case 'ArrowLeft':
      rotateImage(-1)
      break
    case 'ArrowRight':
      rotateImage(1)
      break
    case '=':
    case '+':
      modalImageScale.value = Math.min(3, modalImageScale.value + 0.2)
      break
    case '-':
      modalImageScale.value = Math.max(0.5, modalImageScale.value - 0.2)
      break
    case '0':
      resetImageTransform()
      break
  }
}



// 滾動動畫效果
const handleScroll = () => {
  const skillCards = document.querySelectorAll('.skill-card-3d')
  const projectCards = document.querySelectorAll('.group')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp')
      }
    })
  }, { threshold: 0.1 })
  
  skillCards.forEach(card => observer.observe(card))
  projectCards.forEach(card => observer.observe(card))
}

onMounted(() => {
  // 開始打字機效果
  setTimeout(typeWriter, 1000)
  
  // 設置滾動動畫
  handleScroll()
  
  // 波浪動畫
  const wavePaths = document.querySelectorAll('.wave-path-1, .wave-path-2')
  wavePaths.forEach((path, index) => {
    path.style.animation = `wave-animation ${3 + index}s ease-in-out infinite`
  })
  
  // 添加鍵盤事件監聽
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  if (typeTimeout) {
    clearTimeout(typeTimeout)
  }
  
  // 移除鍵盤事件監聽
  document.removeEventListener('keydown', handleKeyDown)
  
  // 確保頁面滾動恢復正常
  document.body.style.overflow = 'auto'
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

/* 3D 效果 */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.skill-card-3d {
  height: 320px;
  position: relative;
}

.skill-card-inner {
  width: 100%;
  height: 100%;
  position: relative;
}

.skill-card-front,
.skill-card-back {
  width: 100%;
  height: 100%;
}

/* 霓虹燈文字效果 */
.neon-text-effect {
  position: relative;
}

.neon-glow {
  text-shadow: 
    0 0 5px currentColor,
    0 0 10px currentColor,
    0 0 15px currentColor,
    0 0 20px #3b82f6,
    0 0 35px #3b82f6,
    0 0 40px #3b82f6,
    0 0 50px #3b82f6,
    0 0 75px #3b82f6;
  animation: neon-flicker 1.5s infinite alternate;
}

@keyframes neon-flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px #3b82f6,
      0 0 35px #3b82f6,
      0 0 40px #3b82f6,
      0 0 50px #3b82f6,
      0 0 75px #3b82f6;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}

/* 波浪動畫 */
@keyframes wave-animation {
  0%, 100% {
    d: path("M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z");
  }
  50% {
    d: path("M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,120 L0,120 Z");
  }
}

/* 增強粒子動畫 */
.particles-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, var(--color) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: particle-float var(--duration) linear infinite;
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
  left: calc(var(--random) * 100%);
  filter: blur(0.5px);
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
.particle-51 { --random: 0.43; }
.particle-52 { --random: 0.53; }
.particle-53 { --random: 0.63; }
.particle-54 { --random: 0.73; }
.particle-55 { --random: 0.83; }
.particle-56 { --random: 0.93; }
.particle-57 { --random: 0.03; }
.particle-58 { --random: 0.14; }
.particle-59 { --random: 0.24; }
.particle-60 { --random: 0.34; }
.particle-61 { --random: 0.44; }
.particle-62 { --random: 0.54; }
.particle-63 { --random: 0.64; }
.particle-64 { --random: 0.74; }
.particle-65 { --random: 0.84; }
.particle-66 { --random: 0.94; }
.particle-67 { --random: 0.04; }
.particle-68 { --random: 0.16; }
.particle-69 { --random: 0.26; }
.particle-70 { --random: 0.36; }
.particle-71 { --random: 0.46; }
.particle-72 { --random: 0.56; }
.particle-73 { --random: 0.66; }
.particle-74 { --random: 0.76; }
.particle-75 { --random: 0.86; }
.particle-76 { --random: 0.96; }
.particle-77 { --random: 0.06; }
.particle-78 { --random: 0.18; }
.particle-79 { --random: 0.28; }
.particle-80 { --random: 0.38; }



/* 技能進度條動畫 */
.skill-progress-bar {
  width: 0;
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .skill-progress-bar {
  width: var(--width) !important;
}

/* 閃爍光點動畫 */
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.sparkle {
  animation: sparkle 2s infinite;
}



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

/* 頭像圖片優化 */
.avatar-image {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
}

.avatar-container:hover .avatar-image {
  transform: scale(1.05);
}

/* 加載狀態動畫 */
@keyframes avatar-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

.avatar-loading {
  animation: avatar-pulse 1.5s ease-in-out infinite;
}

/* 模態框動畫 */
@keyframes modalEnter {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(12px);
  }
}

@keyframes modalContentEnter {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0) rotateX(0deg);
  }
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate(var(--x), var(--y)) scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: translate(calc(var(--x) + 20px), calc(var(--y) - 30px)) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes loadingSpinner {
  0% {
    transform: rotate(0deg) scale(1);
    border-color: #3b82f6 transparent transparent transparent;
  }
  25% {
    border-color: #8b5cf6 transparent transparent transparent;
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    border-color: #ec4899 transparent transparent transparent;
  }
  75% {
    border-color: #10b981 transparent transparent transparent;
  }
  100% {
    transform: rotate(360deg) scale(1);
    border-color: #3b82f6 transparent transparent transparent;
  }
}

@keyframes loadingDots {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes cornerSpin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(360deg) scale(1.1);
  }
}

/* 模態框樣式 */
.modal-backdrop {
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(59, 130, 246, 0.15) 0%, 
              rgba(0, 0, 0, 0.7) 50%, 
              rgba(0, 0, 0, 0.9) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.animate-modalEnter {
  animation: modalEnter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.modal-content-container {
  animation: modalContentEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

/* 背景粒子效果 */
.modal-bg-effect {
  pointer-events: none;
}

.modal-particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  animation: particleFloat var(--duration) ease-in-out var(--delay) infinite;
  filter: blur(1px);
}

/* 控制按鈕樣式 */
.modal-control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 9999px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: scale(1);
}

.modal-control-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.modal-control-btn:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

/* 圖片容器樣式 */
.image-container {
  position: relative;
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  will-change: transform;
}

.image-wrapper {
  position: relative;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
  border-radius: 1.5rem;
  padding: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  min-width: 300px;
  min-height: 300px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 1rem;
  transition: all 0.3s ease-out;
  transform-origin: center;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
  will-change: transform;
}

/* 圖片裝飾效果 */
.image-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

.image-glow-1 {
  position: absolute;
  inset: -1rem;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: glowPulse 4s ease-in-out infinite;
  will-change: transform, opacity;
}

.image-glow-2 {
  position: absolute;
  inset: -0.5rem;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%);
  border-radius: 50%;
  animation: glowPulse 5s ease-in-out infinite reverse;
  will-change: transform, opacity;
}

.image-border-decoration {
  position: absolute;
  inset: 0.5rem;
  border-radius: 1rem;
}

.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(59, 130, 246, 0.6);
}

.corner-tl {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 6px;
  animation: cornerSpin 12s linear infinite;
  will-change: transform;
}

.corner-tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
  border-top-right-radius: 6px;
  animation: cornerSpin 12s linear infinite reverse;
  will-change: transform;
}

.corner-bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
  border-bottom-left-radius: 6px;
  animation: cornerSpin 12s linear infinite reverse;
  will-change: transform;
}

.corner-br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 6px;
  animation: cornerSpin 12s linear infinite;
  will-change: transform;
}

/* 載入動畫 */
.modal-loading {
  border-radius: 1.5rem;
  backdrop-filter: blur(20px);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid transparent;
  border-radius: 50%;
  animation: loadingSpinner 2s linear infinite;
}

.loading-dots {
  display: flex;
  gap: 8px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: rgba(59, 130, 246, 0.8);
  border-radius: 50%;
  animation: loadingDots 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }
.loading-dots span:nth-child(3) { animation-delay: 0s; }

/* 圖片信息樣式 */
.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  border-radius: 0 0 1.5rem 1.5rem;
}

.info-content {
  padding: 1.5rem;
}

.info-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.info-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.info-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.stat-item {
  color: rgba(59, 130, 246, 0.9);
  background: rgba(59, 130, 246, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

/* 操作提示樣式 */
.modal-hints {
  position: absolute;
  bottom: -4rem;
  left: 0;
  right: 0;
  text-align: center;
}

.hint-group {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hint-text {
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.hint-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.hint-details span {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .modal-control-btn span {
    display: none;
  }
  
  .hint-details {
    flex-direction: column;
    align-items: center;
  }
  
  .info-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* 頭像懸停效果增強 */
.avatar-image:hover {
  filter: brightness(1.1) contrast(1.1);
  transform: scale(1.02);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* 行動裝置上的頭像調整 */
  .avatar-mobile {
    width: 120px !important;
    height: 120px !important;
  }
}
</style>
