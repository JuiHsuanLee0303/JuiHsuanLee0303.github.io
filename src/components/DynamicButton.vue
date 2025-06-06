<template>
    <button 
        @click="handleClick"
        class="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
        :title="isToggle ? trueTitle : falseTitle"
    >
        <slot></slot>
    </button>
</template>

<script setup>
import { onMounted } from 'vue'
const emit = defineEmits(['click'])

const props = defineProps({
    isToggle: {
        type: Boolean,
        default: false
    },
    trueTitle: {
        type: String,
    },
    falseTitle: {
        type: String,
    }
})

const handleClick = () => {
    emit('click')
}

onMounted(() => {
    console.log(props.isToggle)
})
</script>