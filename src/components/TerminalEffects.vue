<template>
  <div class="terminal-effects">
    <!-- 終端機光標閃爍效果 -->
    <span v-if="showCursor" class="cursor-blink">_</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  showCursor: {
    type: Boolean,
    default: true
  },
  blinkSpeed: {
    type: Number,
    default: 1000
  }
})

const isVisible = ref(true)

let blinkInterval = null

onMounted(() => {
  if (props.showCursor) {
    blinkInterval = setInterval(() => {
      isVisible.value = !isVisible.value
    }, props.blinkSpeed)
  }
})

onUnmounted(() => {
  if (blinkInterval) {
    clearInterval(blinkInterval)
  }
})
</script>

<style scoped>
.cursor-blink {
  color: var(--terminal-green, #00ff00);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>

