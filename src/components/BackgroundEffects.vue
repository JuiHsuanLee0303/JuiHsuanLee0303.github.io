<template>
  <div class="background-effects">
    <!-- 波浪背景效果 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg class="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path class="wave-path-1" d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" 
              fill="url(#wave-gradient-1)"/>
        <path class="wave-path-2" d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z" 
              fill="url(#wave-gradient-2)"/>
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgba(59,130,246,0.1);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(168,85,247,0.1);stop-opacity:1" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgba(34,197,94,0.1);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(59,130,246,0.1);stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <!-- 幾何圖形背景 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-300/20 dark:border-blue-500/20 rotate-45 animate-spin-slow"></div>
      <div class="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-purple-300/20 dark:border-purple-500/20 rotate-12 animate-pulse-slow"></div>
      <div class="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-pink-300/10 to-yellow-300/10 dark:from-pink-500/10 dark:to-yellow-500/10 rounded-full animate-bounce-slow"></div>
    </div>

    <!-- 增強粒子背景效果 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-10">
      <div class="particles-container">
        <div v-for="n in 80" :key="n" 
             :class="`particle particle-${n}`"
             :style="{ 
               '--delay': `${Math.random() * 20}s`,
               '--duration': `${15 + Math.random() * 10}s`,
               '--size': `${2 + Math.random() * 6}px`,
               '--color': getRandomParticleColor()
             }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

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

onMounted(() => {
  // 波浪動畫
  const wavePaths = document.querySelectorAll('.wave-path-1, .wave-path-2')
  wavePaths.forEach((path, index) => {
    path.style.animation = `wave-animation ${3 + index}s ease-in-out infinite`
  })
})
</script>

<style scoped>
/* 動畫定義 */
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

/* 動畫類別 */
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
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
</style> 