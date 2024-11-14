<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface FaqItem {
  question: string
  answer: string
  isOpen: boolean
}

const isVisible = ref(false)

const faqList = ref<FaqItem[]>([
  {
    question: '如何使用此系統？',
    answer: '請參考使用者手冊進行操作，如有疑問可聯絡客服人員。',
    isOpen: false,
  },
  {
    question: '忘記密碼怎麼辦？',
    answer: '您可以透過「忘記密碼」功能重設密碼，或聯絡管理員協助處理。',
    isOpen: false,
  },
  {
    question: '系統支援哪些瀏覽器？',
    answer: '建議使用 Chrome、Firefox、Safari 等主流瀏覽器的最新版本。',
    isOpen: false,
  },
])

const toggleAnswer = (index: number) => {
  faqList.value[index].isOpen = !faqList.value[index].isOpen
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <main
    class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[calc(100vh-64px)] mt-16 pt-8"
  >
    <div
      class="container mx-auto px-4 transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <h1
        class="text-6xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-12 hover:scale-105 transition-all duration-300 animate-fadeIn"
      >
        常見問題
      </h1>

      <div class="max-w-3xl mx-auto">
        <div
          v-for="(item, index) in faqList"
          :key="index"
          class="mb-6 animate-fadeIn"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div
            class="bg-slate-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-500"
          >
            <div
              @click="toggleAnswer(index)"
              class="p-6 flex justify-between items-center cursor-pointer hover:bg-slate-700/50 transition-colors duration-300"
            >
              <span class="font-medium text-violet-300 text-lg">{{ item.question }}</span>
              <svg
                class="w-6 h-6 text-violet-400 transform transition-transform duration-300"
                :class="{ 'rotate-180': item.isOpen }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-show="item.isOpen"
              class="p-6 text-slate-300 border-t border-slate-700/50 transition-all duration-300"
            >
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}
</style>
