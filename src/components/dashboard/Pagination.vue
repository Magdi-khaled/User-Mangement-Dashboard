<script setup lang="ts">
defineProps<{
    currentPage: number;
    totalPages: number;
    nextPage: () => void;
    prevPage: () => void;
    show?: boolean; // Optional prop
}>();
</script>

<template>
    <div class="flex justify-center items-center my-4" v-show="show">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="hover:text-customPink cursor-pointer transition-all w-10 h-10 flex items-center justify-center">
            <i class="fa-solid fa-chevron-left sm:text-lg text-sm"></i>
        </button>
        <span class="text-primary mx-4 sm:text-xl">{{ currentPage }} to {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="hover:text-customPink cursor-pointer transition-all w-10 h-10 flex items-center justify-center">
            <i class="fa-solid fa-chevron-right sm:text-lg text-sm"></i>
        </button>
    </div>
</template>


<style scoped>
@import url("../../assets/custom-style.css");
</style>
