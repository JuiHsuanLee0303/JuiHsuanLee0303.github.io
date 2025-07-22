<template>
    <nav class="bg-white dark:bg-gray-900 shadow-md py-4 transition-colors duration-300 px-6 relative">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo/Brand Name -->
            <div class="flex items-center">
                <router-link to="/">
                    <h1 class="text-xl font-bold dark:text-white handwriting-animation">
                        <span v-for="(char, index) in nameChars" 
                              :key="index" 
                              :style="{ animationDelay: `${index * 0.1}s` }"
                              class="inline-block opacity-0 animate-handwrite">
                            {{ char === ' ' ? '\u00A0' : char }}
                        </span>
                    </h1>
                </router-link>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-4">
                <!-- 導航項目 -->
                <router-link 
                    v-for="item in navItems" 
                    :key="item.path"
                    :to="item.path"
                >
                    <DynamicButton :isToggle="true" :trueTitle="item.name" :falseTitle="item.name">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                        </svg>
                    </DynamicButton>
                </router-link>
                
                <!-- 切換亮暗模式 -->
                <DynamicButton 
                    @click="handleToggleDarkMode" 
                    :isToggle="isDark" 
                    :trueTitle="darkModeText.dark" 
                    :falseTitle="darkModeText.light"
                >
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
                            :d="darkModeIcons.light" 
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
                            :d="darkModeIcons.dark" 
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
                    <router-link 
                        v-for="item in navItems" 
                        :key="item.path"
                        :to="item.path" 
                        class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                        </svg>
                        <span>{{ item.name }}</span>
                    </router-link>
                    <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <button @click="handleToggleDarkMode" class="flex items-center gap-4 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full">
                        <svg v-show="!isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="darkModeIcons.light" />
                        </svg>
                        <svg v-show="isDark" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="darkModeIcons.dark" />
                        </svg>
                        <span>{{ isDark ? darkModeText.dark : darkModeText.light }}</span>
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DynamicButton from './DynamicButton.vue'
import { navItems, darkModeIcons, darkModeText } from '../data'

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