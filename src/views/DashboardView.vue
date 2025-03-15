<script setup lang="ts">
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import UserTable from '../components/dashboard/UserTable.vue';
import FilterComponent from '../components/dashboard/Filter.vue';
import { ref } from 'vue';
import type { User } from "../types/user";
import { users } from '../composables/useUsers.ts';

const filteredArray = ref<User[]>(users);
</script>

<template>
    <AppNavbar />
    <div class="px-4 sm:px-8 mt-4">
        <h1 class="w-fit font-bold text-xl text-primary capitalize pb-2 border-b-4 border-b-primary rounded-r-lg">
            <i class="fa-solid fa-street-view"></i> Users List
            <span class="text-xs text-highlight">({{ users.length }})</span>
        </h1>

        <FilterComponent :filteredArray="filteredArray" :users="users"
            @update:filteredArray="(val) => filteredArray = val" />

        <UserTable :users="filteredArray" />
    </div>
    <AppFooter />
</template>

<style scoped>
.custom-style {
    background-color: red;
}
</style>
