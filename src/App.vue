<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageNavibar from '@/components/PageNavibar.vue'
</script>

<template>
  <div class="bg-gray-50 min-h-[100vh] flex flex-col">
    <PageNavibar />
    <RouterView />
  </div>
</template>

<style scoped></style>
