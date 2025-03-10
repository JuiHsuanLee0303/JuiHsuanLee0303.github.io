<script setup lang="ts">
import { ref } from 'vue'
import { useRoutesStore } from '@/stores/routes'

const routesStore = useRoutesStore()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm shadow-md transition-all duration-300 animate-slideDown">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/"
          class="text-2xl font-bold text-gray-100 hover:text-blue-400 transition-all duration-300 no-underline transform hover:scale-105 hover:-translate-y-0.5 animate-fadeIn">
          <span
            class="text-2xl font-bold tracking-wider bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:from-indigo-400 hover:via-purple-400 hover:to-rose-400 transition-all duration-500 animate-gradient">李睿軒
            Jui-Hsuan Lee</span>
        </router-link>

        <div class="hidden lg:flex items-center gap-4">
          <router-link v-for="(route, index) in routesStore.routes" :key="route.path" :to="route.path"
            class="text-gray-300 font-medium hover:text-blue-400 transition-all duration-300 no-underline relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 animate-fadeIn"
            :style="{ animationDelay: `${0.1 * (index + 1)}s` }">
            {{ route.name }}
          </router-link>
        </div>

        <button
          class="p-2.5 lg:hidden rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fadeIn"
          @click="toggleMenu" aria-label="選單">
          <div class="w-6 h-0.5 bg-gray-300 relative">
            <div class="absolute w-full h-full bg-gray-300 transition-all duration-300 origin-center"
              :class="isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'"></div>
            <div class="absolute w-full h-full bg-gray-300 transition-all duration-300 origin-center"
              :class="isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'"></div>
          </div>
        </button>
      </div>

      <div class="lg:block transition-all duration-300 ease-in-out overflow-hidden" :class="[
        isMenuOpen
          ? 'block max-h-[500px] opacity-100'
          : 'hidden max-h-0 opacity-0 lg:opacity-100',
      ]">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-end lg:space-x-8 mt-6 lg:mt-0">
          <router-link v-for="(route, index) in routesStore.routes" :key="route.path" :to="route.path"
            class="py-3 lg:py-2 px-4 text-gray-300 font-medium hover:text-blue-400 hover:bg-slate-800/80 lg:hover:bg-transparent rounded-lg transition-all duration-300 no-underline transform hover:translate-x-1 lg:hover:translate-x-0 lg:hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 animate-fadeIn"
            :style="{ animationDelay: `${0.1 * (index + 1)}s` }" @click="isMenuOpen = false">
            {{ route.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply text-blue-400 font-semibold;
}

.router-link-active::after {
  @apply scale-x-100;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.animate-slideDown {
  animation: slideDown 0.5s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 1s ease infinite;
}
</style>
