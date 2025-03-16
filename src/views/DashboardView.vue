<script setup lang="ts">
import AppNavbar from "../components/AppNavbar.vue";
import AppFooter from "../components/AppFooter.vue";
import UserTable from "../components/dashboard/UserTable.vue";
import FilterComponent from "../components/dashboard/Filter.vue";
import { ref } from "vue";
import type { User } from "../types/user";
import { useUserStore } from "../stores/users";

const userStore = useUserStore();

const filteredArray = ref<User[]>([]); // Initially empty
</script>

<template>
    <AppNavbar />
    <div class="px-4 sm:px-8 mt-4">
        <h1 class="w-fit font-bold text-xl text-primary capitalize pb-2 border-b-4 border-b-primary rounded-r-lg">
            <i class="fa-solid fa-street-view"></i> Users List
            <span class="text-xs text-highlight">({{ userStore.users.length }})</span>
        </h1>

        <!-- Update filteredArray when FilterComponent emits data -->
        <FilterComponent @update:filteredArray="(val) => filteredArray = val" />

        <UserTable :users="filteredArray" />
    </div>
    <AppFooter />
</template>

<style scoped>
.custom-style {
    background-color: red;
}
</style>
