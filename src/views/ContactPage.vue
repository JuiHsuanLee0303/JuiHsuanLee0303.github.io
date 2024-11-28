<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 表單相關狀態
interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const formData = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)

// 動畫相關狀態
const isVisible = ref(false)

// 頁面載入時的動畫效果
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// 聯絡資訊
interface ContactInfo {
  type: string
  value: string
  link: string
  icon: string
}

const contactInfos: ContactInfo[] = [
  {
    type: '電子郵件',
    value: 'juihsuanlee0303@gmail.com',
    link: 'mailto:juihsuanlee0303@gmail.com',
    icon: `<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>`,
  },
  {
    type: 'LinkedIn',
    value: 'linkedin.com/in/juihsuanlee',
    link: 'https://linkedin.com/in/juihsuanlee',
    icon: `<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>`,
  },
  {
    type: 'GitHub',
    value: 'github.com/JuiHsuanLee0303',
    link: 'https://github.com/JuiHsuanLee0303',
    icon: `<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>`,
  },
]

// 表單提交處理
const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    // 將表單內容透過電子郵件發送
    await fetch('https://your-backend-api.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        subject: formData.value.subject,
        message: formData.value.message,
      }),
    })
    // 成功處理後清空表單
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  } catch (error) {
    console.error('表單提交失敗:', error)
  } finally {
    isSubmitting.value = false
  }
}
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
        class="text-6xl font-bold text-center bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-12 hover:scale-105 transition-all duration-300"
      >
        聯絡我
      </h1>

      <div
        class="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-violet-500/20 hover:shadow-violet-500/30 p-8 transition-all duration-500"
      >
        <form @submit.prevent="handleSubmit" class="max-w-2xl mx-auto space-y-8">
          <div class="transform hover:-translate-y-1 transition-transform duration-300">
            <label for="name" class="block text-violet-300 font-medium mb-2">姓名</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="w-full px-4 py-3 border border-violet-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 bg-slate-700/50 text-violet-100 hover:border-violet-300"
              placeholder="請輸入您的姓名"
            />
          </div>

          <div class="transform hover:-translate-y-1 transition-transform duration-300">
            <label for="email" class="block text-violet-300 font-medium mb-2">電子郵件</label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="w-full px-4 py-3 border border-violet-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 bg-slate-700/50 text-violet-100 hover:border-violet-300"
              placeholder="請輸入您的電子郵件"
            />
          </div>

          <div class="transform hover:-translate-y-1 transition-transform duration-300">
            <label for="subject" class="block text-violet-300 font-medium mb-2">主旨</label>
            <input
              v-model="formData.subject"
              type="text"
              id="subject"
              class="w-full px-4 py-3 border border-violet-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 bg-slate-700/50 text-violet-100 hover:border-violet-300"
              placeholder="請輸入主旨"
            />
          </div>

          <div class="transform hover:-translate-y-1 transition-transform duration-300">
            <label for="message" class="block text-violet-300 font-medium mb-2">訊息內容</label>
            <textarea
              v-model="formData.message"
              id="message"
              rows="6"
              class="w-full px-4 py-3 border border-violet-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none bg-slate-700/50 text-violet-100 hover:border-violet-300"
              placeholder="請輸入您的訊息"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-violet-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg shadow-lg shadow-violet-500/30"
          >
            <span class="flex items-center justify-center">
              <svg
                v-if="isSubmitting"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isSubmitting ? '傳送中...' : '送出訊息' }}
            </span>
          </button>
        </form>

        <div class="mt-16 border-t border-violet-500/30 pt-8">
          <h2 class="text-2xl font-semibold text-violet-300 mb-6">其他聯絡方式</h2>
          <div class="space-y-6">
            <div
              v-for="info in contactInfos"
              :key="info.type"
              class="flex items-center transform hover:-translate-x-2 transition-transform duration-300 group"
            >
              <span class="text-violet-300 font-medium w-28 group-hover:text-violet-400"
                >{{ info.type }}：</span
              >
              <a
                :href="info.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-violet-400 hover:text-violet-300 hover:underline transition-colors duration-300 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  v-html="info.icon"
                ></svg>
                {{ info.value }}
              </a>
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
