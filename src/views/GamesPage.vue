<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <main class="container mx-auto px-6 py-12">
            <header class="text-center mb-16 animate-fadeInUp">
                <h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
                    小遊戲
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    一些有趣的互動小遊戲，放鬆一下吧！
                </p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(game, index) in games" :key="game.id"
                    :class="`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 dark:border-gray-700 relative ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`">
                    
                    <div class="h-48 relative overflow-hidden">
                        <img :src="game.image" :alt="game.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                        <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                    </div>

                    <div class="p-6 flex flex-col flex-grow">
                        <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{{ game.name }}</h2>
                        <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{{ game.description }}</p>
                        
                        <div class="mt-auto">
                           <router-link v-if="game.link" :to="game.link"
                                class="inline-block w-full text-center magnetic-button bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                                <span class="relative z-10">開始玩</span>
                            </router-link>
                            <span v-else
                                class="inline-block w-full text-center bg-gray-400 dark:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold cursor-not-allowed">
                                敬請期待
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const games = ref([
    {
        id: 1,
        name: '猜數字',
        description: '一個簡單的猜數字遊戲，測試你的運氣和邏輯。',
        image: 'https://placehold.co/400x300/42b983/FFFFFF?text=Guess+Number&font=raleway',
        link: '/games/guess-the-number'
    },
    {
        id: 2,
        name: '圈圈叉叉',
        description: '經典的井字遊戲，挑戰你的策略思維。即將推出！',
        image: 'https://placehold.co/400x300/3498db/FFFFFF?text=Tic-Tac-Toe&font=raleway',
        link: null // '/games/tic-tac-toe'
    },
    {
        id: 3,
        name: '幾A幾B',
        description: '經典的猜數字解謎遊戲，挑戰你的邏輯推理能力。',
        image: 'https://placehold.co/400x300/8e44ad/FFFFFF?text=Bulls+and+Cows&font=raleway',
        link: '/games/bulls-and-cows'
    },
    {
        id: 4,
        name: '殭屍射擊',
        description: '在無盡的屍潮中生存下來！一款刺激的 2D 俯視角射擊遊戲。',
        image: 'https://placehold.co/400x300/c0392b/FFFFFF?text=Zombie+Shooter&font=raleway',
        link: '/games/zombie-shooter'
    },
    {
        id: 5,
        name: '星際戰機',
        description: '駕駛你的戰機，在槍林彈雨中殺出一條血路！經典的垂直捲軸射擊遊戲。',
        image: 'https://placehold.co/400x300/2980b9/FFFFFF?text=Aircraft+Shooter&font=raleway',
        link: '/games/aircraft-shooter'
    }
]);
</script>

<style>
/* Animation classes for fade-in effect, matching HomePage.vue */
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

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-300 { 
  animation-delay: 0.3s; 
}

/* Ensure animation is paused until it's ready to be shown */
.animate-fadeInUp {
  opacity: 0;
}
</style>