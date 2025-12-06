<template>
    <nav class="bg-black border-b border-terminal-green/30 py-3 px-6 relative font-mono">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo/Brand Name -->
            <div class="flex items-center">
                <router-link to="/" class="terminal-link">
                    <div class="terminal-prompt text-xs">
                        <span class="prompt-symbol">$</span>
                        <span class="text-terminal-green">whoami</span>
                        <span class="cursor-blink ml-1">_</span>
                    </div>
                    <div class="text-terminal-green text-xl mt-1 ml-6">
                        Jui-Hsuan Lee
                    </div>
                </router-link>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-6">
                <!-- 導航項目 -->
                <router-link 
                    v-for="item in navItems" 
                    :key="item.path"
                    :to="item.path"
                    class="terminal-nav-item"
                    active-class="active"
                >
                    <span class="text-terminal-green/70 hover:text-terminal-green transition-colors">
                        [{{ item.name }}]
                    </span>
                </router-link>
                <!-- 關機按鈕 -->
                <button 
                    @click="handleShutdown"
                    class="terminal-nav-item text-terminal-green/70 hover:text-terminal-green transition-colors"
                    title="Shutdown"
                >
                    <span>[Shutdown]</span>
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center">
                <button @click="toggleMobileMenu" class="text-terminal-green focus:outline-none p-2">
                    <span v-if="!isMobileMenuOpen" class="text-2xl">☰</span>
                    <span v-else class="text-2xl">✕</span>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <div v-show="isMobileMenuOpen" class="md:hidden mt-4 absolute w-full left-0 z-20 bg-black border border-terminal-green/30">
                <div class="flex flex-col items-stretch gap-2 p-4">
                    <router-link 
                        v-for="item in navItems" 
                        :key="item.path"
                        :to="item.path" 
                        class="px-4 py-2 text-terminal-green/70 hover:text-terminal-green hover:bg-terminal-green/10 transition-colors"
                        @click="toggleMobileMenu"
                    >
                        [{{ item.name }}]
                    </router-link>
                    <!-- 關機按鈕（行動版） -->
                    <button 
                        @click="handleShutdown"
                        class="px-4 py-2 text-left text-terminal-green/70 hover:text-terminal-green hover:bg-terminal-green/10 transition-colors"
                    >
                        [Shutdown]
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { navItems } from '../data'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const shutdown = inject('shutdown')

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleShutdown = () => {
    if (shutdown) {
        shutdown()
    }
    // 關閉行動版選單
    isMobileMenuOpen.value = false
}
</script>

<style scoped>
.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt-symbol {
  color: #00ff00;
  font-weight: bold;
}

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.terminal-link {
  text-decoration: none;
}

.terminal-nav-item {
  position: relative;
  text-decoration: none;
}

.terminal-nav-item.active span,
.terminal-nav-item.router-link-active span {
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

.terminal-nav-item:hover span {
  color: #00ff00;
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