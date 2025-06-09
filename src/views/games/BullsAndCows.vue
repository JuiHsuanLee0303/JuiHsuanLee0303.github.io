<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 flex items-center justify-center p-4">
        
        <div class="w-full max-w-lg">
            <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-glow-pulse">
                <div v-if="isWin" class="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div v-for="p in confettiParticles" :key="p.id" class="confetti-particle" :style="p.style"></div>
                </div>
                <div class="relative z-10 text-center">
                    
                    <h1 class="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">幾A幾B 遊戲</h1>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">猜一個四位不重複的數字。</p>
                    
                    <form v-if="!isWin" @submit.prevent="handleGuess">
                        <div class="flex justify-center gap-2 sm:gap-4 mb-6" :class="{ 'shake': isShaking }">
                            <input 
                                v-for="i in 4"
                                :key="i"
                                :ref="el => { if (el) guessInputs[i-1] = el }"
                                type="text"
                                maxlength="1"
                                v-model="guess[i-1]"
                                @input="handleDigitInput($event, i-1)"
                                @keydown.backspace="handleBackspace($event, i-1)"
                                @paste="handlePaste"
                                :disabled="gameOver"
                                class="w-14 h-16 sm:w-16 sm:h-20 text-3xl sm:text-4xl font-bold text-center rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-transparent focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition"
                            >
                        </div>
                        <button type="submit" :disabled="gameOver || guess.join('').length !== 4" class="w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none">
                            猜！
                        </button>
                    </form>

                    <div v-if="message" class="message rounded-lg p-4 my-6 text-sm font-medium transition-all duration-300" :class="messageClass">
                        <p>{{ message }}</p>
                    </div>

                    <div v-if="history.length > 0" class="max-h-60 overflow-y-auto my-6 pr-2 custom-scrollbar">
                        <TransitionGroup name="list" tag="div" class="space-y-3">
                             <div v-for="(item, index) in history" :key="item.guess + index" class="list-item bg-white dark:bg-gray-800/60 p-3 rounded-lg flex justify-between items-center border border-gray-200 dark:border-gray-700">
                                <div class="flex items-center gap-4">
                                    <span class="flex-shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400 w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">{{ history.length - index }}</span>
                                    <span class="text-2xl font-mono tracking-widest text-gray-800 dark:text-gray-200">{{ item.guess }}</span>
                                </div>
                                <div class="text-lg">
                                    <span class="text-green-500 font-bold">{{ item.bulls }}A</span>
                                    <span class="text-blue-500 font-bold ml-2">{{ item.cows }}B</span>
                                </div>
                            </div>
                        </TransitionGroup>
                    </div>
                    
                    <div class="flex items-center justify-end text-gray-600 dark:text-gray-400">
                        <button @click="resetGame" :class="isWin ? 'w-full py-4 text-lg' : 'px-6 py-2 text-sm'" class="rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                            {{ isWin ? '太厲害了！再來一局' : '新遊戲' }}
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
import { ref, computed, watch, onMounted } from 'vue';

const secretNumber = ref(generateSecretNumber());
const guess = ref(['', '', '', '']);
const guessInputs = ref([]);
const history = ref([]);
const message = ref('');
const messageType = ref('info'); // 'success', 'error', 'info', 'warning'
const gameOver = ref(false);
const confettiParticles = ref([]);
const isShaking = ref(false);

const isWin = computed(() => gameOver.value && messageType.value === 'success');

const messageClass = computed(() => {
    switch (messageType.value) {
        case 'success': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 scale-105';
        case 'error': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
        case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
        default: return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
    }
});

watch(isWin, (newVal) => {
    if (newVal) {
        generateConfetti();
    }
});

function generateSecretNumber() {
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * digits.length);
        result += digits.splice(index, 1)[0];
    }
    // console.log(`New secret number: ${result}`);
    return result;
}

function handleDigitInput(event, index) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    guess.value[index] = value;
    if (value && index < 3) {
        guessInputs.value[index + 1].focus();
    }
}

function handleBackspace(event, index) {
    if (index > 0 && !guess.value[index]) {
        guessInputs.value[index - 1].focus();
    }
}

function handlePaste(event) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
    pastedData.split('').forEach((char, index) => {
        if (index < 4) {
            guess.value[index] = char;
        }
    });
    const focusIndex = Math.min(3, pastedData.length -1);
    if(focusIndex >= 0) guessInputs.value[focusIndex].focus();
}

function validateGuess(input) {
    if (input.length !== 4) {
        message.value = '請輸入完整的四位數字。';
        messageType.value = 'warning';
        isShaking.value = true;
        setTimeout(() => { isShaking.value = false }, 820);
        return false;
    }
    if (new Set(input).size !== 4) {
        message.value = '請確保四位數字皆不重複。';
        messageType.value = 'warning';
        isShaking.value = true;
        setTimeout(() => { isShaking.value = false }, 820);
        return false;
    }
    return true;
}

function handleGuess() {
    const currentGuess = guess.value.join('');
    if (gameOver.value || !validateGuess(currentGuess)) {
        return;
    }

    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
        if (currentGuess[i] === secretNumber.value[i]) {
            bulls++;
        } else if (secretNumber.value.includes(currentGuess[i])) {
            cows++;
        }
    }
    
    history.value.unshift({ guess: currentGuess, bulls, cows });
    
    if (bulls === 4) {
        message.value = `恭喜！答案就是 ${secretNumber.value}，你總共猜了 ${history.value.length} 次。`;
        messageType.value = 'success';
        gameOver.value = true;
    } else {
        message.value = `結果: ${bulls}A${cows}B。繼續猜！`;
        messageType.value = 'info';
    }

    guess.value = ['', '', '', ''];
    guessInputs.value[0].focus();
}

function resetGame() {
    secretNumber.value = generateSecretNumber();
    guess.value = ['', '', '', ''];
    history.value = [];
    message.value = '新遊戲開始！請猜一個四位不重複的數字。';
    messageType.value = 'info';
    gameOver.value = false;
    confettiParticles.value = [];
    if(guessInputs.value[0]) {
       guessInputs.value[0].focus();
    }
}

function generateConfetti() {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            id: i,
            style: {
                '--color': colors[Math.floor(Math.random() * colors.length)],
                left: Math.random() * 100 + '%',
                animation: `confetti-fall ${3 + Math.random() * 2}s ${Math.random() * 4}s linear infinite`,
                width: (6 + Math.random() * 8) + 'px',
                height: (6 + Math.random() * 8) + 'px',
            }
        });
    }
    confettiParticles.value = particles;
}

onMounted(() => {
    resetGame();
});
</script>

<style scoped>
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(168, 85, 247, 0.2), 0 0 10px rgba(168, 85, 247, 0.1);
  }
  50% {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.2), 0 0 40px rgba(168, 85, 247, 0.1);
  }
}

.animate-glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

.list-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.list-leave-active {
  transition: all 0.3s ease-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(139, 92, 246, 0.5);
  border-radius: 20px;
  border: 3px solid transparent;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-10vh) rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotateZ(720deg);
    opacity: 0;
  }
}

.confetti-particle {
  position: absolute;
  top: -20px;
  background-color: var(--color);
  border-radius: 50%;
  z-index: 100;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}
</style> 