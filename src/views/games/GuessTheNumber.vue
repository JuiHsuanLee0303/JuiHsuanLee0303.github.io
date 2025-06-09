<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 flex items-center justify-center p-4">
        
        <div class="w-full max-w-lg">
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-glow-pulse">
                <div class="relative z-10 text-center">
                    
                    <h1 class="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">猜數字遊戲</h1>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">我已經想好了一個 1 到 100 之間的數字，你來猜猜看！</p>
                    
                    <div class="game-container flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <input 
                            type="number" 
                            v-model.number="guess" 
                            @keyup.enter="checkGuess" 
                            :disabled="gameOver"
                            placeholder="輸入你的猜測"
                            class="w-full sm:w-auto flex-grow bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-center text-lg px-4 py-3 rounded-full border-2 border-transparent focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition"
                        >
                        <button @click="checkGuess" :disabled="gameOver" class="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none">
                            猜！
                        </button>
                    </div>

                    <div v-if="message" class="message rounded-lg p-4 mb-6 text-sm font-medium" :class="messageClass">
                        <p>{{ message }}</p>
                    </div>

                    <div class="flex items-center justify-between text-gray-600 dark:text-gray-400">
                        <div class="attempts text-sm">
                            <p>已猜次數：<span class="font-bold text-lg text-blue-600 dark:text-blue-400">{{ attempts }}</span></p>
                        </div>
                        <button @click="resetGame" class="px-6 py-2 rounded-full font-semibold text-sm text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-all duration-300 transform hover:scale-105">
                            重新開始
                        </button>
                    </div>
                </div>
            </div>
             <div class="text-center mt-6">
                <router-link to="/games" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-2 justify-center group-hover:gap-3 transition-all duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    返回遊戲列表
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const targetNumber = ref(generateRandomNumber());
const guess = ref('');
const message = ref('');
const messageType = ref(''); // 'success', 'error', 'info', 'warning'
const attempts = ref(0);
const gameOver = ref(false);

const messageClass = computed(() => {
    switch (messageType.value) {
        case 'success': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
        case 'error': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
        case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
        default: return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
    }
});

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    if (guess.value === '' || guess.value < 1 || guess.value > 100) {
        message.value = '請輸入 1 到 100 之間的有效數字。';
        messageType.value = 'warning';
        return;
    }

    attempts.value++;
    
    if (guess.value === targetNumber.value) {
        message.value = `恭喜你！猜對了！答案就是 ${targetNumber.value}。你總共猜了 ${attempts.value} 次。`;
        messageType.value = 'success';
        gameOver.value = true;
    } else if (guess.value < targetNumber.value) {
        message.value = '太小了，再試試！';
        messageType.value = 'error';
    } else {
        message.value = '太大了，再試試！';
        messageType.value = 'error';
    }
    guess.value = '';
}

function resetGame() {
    targetNumber.value = generateRandomNumber();
    guess.value = '';
    message.value = '新遊戲開始！請猜一個 1 到 100 的數字。';
    messageType.value = 'info';
    attempts.value = 0;
    gameOver.value = false;
}

// Initialize the game message
resetGame();
message.value = '請猜一個 1 到 100 的數字。';
</script>

<style scoped>
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.2), 0 0 10px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2), 0 0 40px rgba(59, 130, 246, 0.1);
  }
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* 讓數字輸入框在 webkit 瀏覽器中隱藏上下箭頭 */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] {
  -moz-appearance: textfield; /* Firefox */
}
</style> 