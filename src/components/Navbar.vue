<template>
    <nav class="bg-white dark:bg-gray-900 shadow-md py-4 transition-colors duration-300 px-6 relative">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo/Brand Name -->
            <div class="flex items-center">
                <a href="/">
                    <h1 class="text-xl font-bold dark:text-white handwriting-animation">
                        <span v-for="(char, index) in nameChars" 
                              :key="index" 
                              :style="{ animationDelay: `${index * 0.1}s` }"
                              class="inline-block opacity-0 animate-handwrite">
                            {{ char === ' ' ? '\u00A0' : char }}
                        </span>
                    </h1>
                </a>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-4">
                <!-- Home -->
                <a href="/">
                    <DynamicButton :isToggle="true" trueTitle="首頁" falseTitle="首頁">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </DynamicButton>
                </a>
                <!-- 作品集 -->
                <a href="/portfolio">
                    <DynamicButton :isToggle="true" trueTitle="作品集" falseTitle="作品集">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M26,27H6c-1.1,0-2-0.9-2-2V12c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v13C28,26.1,27.1,27,26,27z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22.6,18H9.4c-3,0-5.4-2.4-5.4-5.4V12c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v0.6C28,15.6,25.6,18,22.6,18z"/>
                            <line stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10" y1="20" x2="10" y2="18"/>
                            <line stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="22" y1="20" x2="22" y2="18"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3,10c0.9-2.9,3.5-5,6.7-5c3.2,0,5.8,2.1,6.7,5"/>
                        </svg>
                    </DynamicButton>
                </a>
                <!-- 部落格 -->
                <a href="/blog">
                    <DynamicButton :isToggle="true" trueTitle="部落格" falseTitle="部落格">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </DynamicButton>
                </a>
                <!-- 小遊戲 -->
                <a href="/games">
                    <DynamicButton :isToggle="true" trueTitle="小遊戲" falseTitle="小遊戲">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                    </DynamicButton>
                </a>
                <!-- 切換亮暗模式 -->
                <DynamicButton @click="handleToggleDarkMode" :isToggle="isDark" trueTitle="切換為淺色模式" falseTitle="切換為深色模式">
                    <!-- 太陽圖示 (淺色模式) -->
                    <svg 
                        v-show="!isDark"
                        class="w-6 h-6 transform transition-all duration-300"
                        :class="{ 'rotate-180 scale-110': !isDark }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                        />
                    </svg>
                    
                    <!-- 月亮圖示 (深色模式) -->
                    <svg 
                        v-show="isDark"
                        class="w-6 h-6 transform transition-all duration-300"
                        :class="{ 'rotate-0 scale-110': isDark }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                        />
                    </svg>
                </DynamicButton>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center">
                <button @click="toggleMobileMenu" class="text-gray-800 dark:text-white focus:outline-none p-2">
                    <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <div v-show="isMobileMenuOpen" class="md:hidden mt-4 absolute w-full left-0 z-20">
                <div class="flex flex-col items-stretch gap-2 bg-white dark:bg-gray-800 p-4 shadow-lg">
                    <a href="/" class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span>首頁</span>
                    </a>
                    <a href="/portfolio" class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 32 32"><path d="M26,27H6c-1.1,0-2-0.9-2-2V12c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v13C28,26.1,27.1,27,26,27z"/><path d="M22.6,18H9.4c-3,0-5.4-2.4-5.4-5.4V12c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v0.6C28,15.6,25.6,18,22.6,18z"/><line x1="10" y1="20" x2="10" y2="18"/><line x1="22" y1="20" x2="22" y2="18"/><path d="M9.3,10c0.9-2.9,3.5-5,6.7-5c3.2,0,5.8,2.1,6.7,5"/></svg>
                        <span>作品集</span>
                    </a>
                    <a href="/blog" class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        <span>部落格</span>
                    </a>
                    <a href="/games" class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                        <span>小遊戲</span>
                    </a>
                    <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <button @click="handleToggleDarkMode" class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full">
                        <svg v-show="!isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        <svg v-show="isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        <span v-if="isDark">切換為淺色模式</span>
                        <span v-else>切換為深色模式</span>
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DynamicButton from './DynamicButton.vue'

// Props
const props = defineProps({
    isDark: {
        type: Boolean,
        default: false
    }
})

// Emits
const emit = defineEmits(['toggle-dark-mode'])

// 手寫動畫相關
const nameChars = ref([])
const fullName = 'Jui-Hsuan Lee'

// RWD
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
    nameChars.value = fullName.split('')
})

// 切換暗色模式
const handleToggleDarkMode = () => {
    emit('toggle-dark-mode')
}
</script>

<style scoped>
/* 手寫動畫 */
@keyframes handwrite {
    0% {
        opacity: 0;
        transform: translateY(10px) rotate(-2deg);
    }
    50% {
        opacity: 0.7;
        transform: translateY(-2px) rotate(1deg);
    }
    100% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
    }
}

.animate-handwrite {
    animation: handwrite 0.6s ease-out forwards;
}

.handwriting-animation {
    font-family: 'Edu NSW ACT Cursive', cursive;
}

/* 為手寫效果添加一些微妙的變化 */
.animate-handwrite:nth-child(even) {
    animation-timing-function: ease-in-out;
}

.animate-handwrite:nth-child(3n) {
    animation-duration: 0.7s;
}

/* 按鈕懸停效果 */
button:hover svg {
    animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) rotate(0deg) scale(1.05);
    }
    40% {
        transform: translateY(-4px) rotate(-5deg) scale(1.1);
    }
    60% {
        transform: translateY(-2px) rotate(5deg) scale(1.08);
    }
}

/* Mobile Menu Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>