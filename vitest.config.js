import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,ts}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,vue}'],
    },
  },
})
