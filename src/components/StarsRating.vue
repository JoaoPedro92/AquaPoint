<template>
    <span v-for="n in 5" :key="n">
        <i :class="n <= rating ? 'bi bi-star-fill text-warning ms-1' : 'bi bi-star ms-1'"></i>
    </span>
</template>

<script setup>
    defineProps({
        rating: {
            type: Number,
            default: 0
        }
    })
</script>