<template>
    <nav class="sticky top-0 z-40 border-b border-terminal-green/20 bg-black/80 backdrop-blur-md px-4 py-3 font-mono shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div class="container mx-auto flex justify-between items-center gap-4">
            <!-- Logo/Brand Name -->
            <div class="flex items-center">
                <router-link to="/" class="terminal-link rounded-2xl px-3 py-2 hover:bg-terminal-green/8">
                    <div class="terminal-prompt text-[11px] md:text-xs">
                        <span class="prompt-symbol">$</span>
                        <span class="text-terminal-green">whoami</span>
                        <span class="cursor-blink ml-1">_</span>
                    </div>
                    <div class="text-terminal-green text-lg md:text-xl mt-1 ml-6 tracking-[0.08em]">
                        Jui-Hsuan Lee
                    </div>
                </router-link>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-3">
                <!-- 導航項目 -->
                <router-link 
                    v-for="item in navItems" 
                    :key="item.path"
                    :to="item.path"
                    class="terminal-nav-item rounded-full px-4 py-2"
                    active-class="active"
                >
                    <span class="flex items-center gap-2 text-terminal-green/70 hover:text-terminal-green transition-colors">
                        <span class="text-terminal-green/35 text-xs">{{ item.shortcut }}</span>
                        [{{ item.name }}]
                    </span>
                </router-link>
                <!-- 關機按鈕 -->
                <button 
                    @click="handleShutdown"
                    class="terminal-nav-item rounded-full px-4 py-2 text-terminal-green/70 hover:text-terminal-green transition-colors"
                    title="Shutdown"
                >
                    <span>[Shutdown]</span>
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden flex items-center">
                <button
                    @click="toggleMobileMenu"
                    :aria-expanded="isMobileMenuOpen"
                    aria-label="切換選單"
                    class="rounded-2xl border border-terminal-green/30 bg-terminal-green/5 p-2 text-terminal-green"
                >
                    <span v-if="!isMobileMenuOpen" class="text-2xl">☰</span>
                    <span v-else class="text-2xl">✕</span>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-fade">
            <div v-show="isMobileMenuOpen" class="md:hidden mt-4 absolute w-full left-0 z-20 border-y border-terminal-green/25 bg-black/95 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <div class="container mx-auto flex flex-col items-stretch gap-2 px-4 py-4">
                    <router-link 
                        v-for="item in navItems" 
                        :key="item.path"
                        :to="item.path" 
                        class="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-terminal-green/70 hover:text-terminal-green hover:border-terminal-green/25 hover:bg-terminal-green/10 transition-colors"
                        @click="toggleMobileMenu"
                    >
                        <span>[{{ item.name }}]</span>
                        <span class="text-terminal-green/35 text-xs">{{ item.shortcut }}</span>
                    </router-link>
                    <!-- 關機按鈕（行動版） -->
                    <button 
                        @click="handleShutdown"
                        class="rounded-xl px-4 py-3 text-left text-terminal-green/70 hover:text-terminal-green hover:bg-terminal-green/10 transition-colors"
                    >
                        [Shutdown]
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
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

watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false
  }
)
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
  border: 1px solid transparent;
  background: transparent;
}

.terminal-nav-item.active span,
.terminal-nav-item.router-link-active span {
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

.terminal-nav-item.active,
.terminal-nav-item.router-link-active {
  border-color: rgba(57, 255, 20, 0.3);
  background: rgba(57, 255, 20, 0.08);
  box-shadow: inset 0 0 0 1px rgba(57, 255, 20, 0.08), 0 0 18px rgba(57, 255, 20, 0.08);
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
