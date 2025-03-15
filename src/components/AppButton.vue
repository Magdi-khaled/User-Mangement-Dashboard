<script setup lang="ts">
const disabled = defineModel<boolean>('disabled', { default: false });

</script>

<template>
    <button :class="{ disabled: disabled }" class="cursor-pointer py-3 px-[6px] text-sm sm:text-md bg-primary text-white whitespace-nowrap font-medium 
    capitalize rounded-md border-[1px] border-primary
            hover:bg-highlight transition duration-150 ease-in-out">
        <slot />
    </button>
</template>

<style scoped>
.disabled {
    background-color: rgba(85, 84, 84, 0.445);
    color: gray;
    border: transparent;
    /* Example color for disabled state */
    cursor: auto;
    opacity: 0.6;
}
</style>