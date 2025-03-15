<script setup lang="ts">
import AppInput from "../AppInput.vue";

import { watch, ref, defineEmits } from "vue";
import type { User } from "../../types/user";

const searchText = ref<string>("");
const searchStatus = ref<boolean>(false);
const selectedRole = ref<string>("");
const selectedStatus = ref<string>("");

// Props & emits
const props = defineProps<{ users: User[] }>();
const emit = defineEmits(["update:filteredArray"]);

const filterUsers = () => {
    let filterResults = props.users;

    if (searchText.value) {
        filterResults = filterResults.filter(
            (item) =>
                item.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
                item.email.toLowerCase().includes(searchText.value.toLowerCase())
        );
    }
    if (selectedRole.value) {
        filterResults = filterResults.filter((item) => item.role === selectedRole.value);
    }
    if (selectedStatus.value) {
        filterResults = filterResults.filter((item) => item.status === selectedStatus.value);
    }

    emit("update:filteredArray", filterResults);
};

// Watchers to trigger filtering
watch([searchText, selectedRole, selectedStatus], () => {
    searchStatus.value = true;
    setTimeout(() => {
        searchStatus.value = false;
        filterUsers();
    }, 500);
});
</script>

<template>
    <div class="bg-gray-100 shadow-2xl w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-2 p-4 mt-6 rounded-xl">
        <div class="relative col-span-2">
            <AppInput type="text" name="search" placeholder="Search by name, email..." :optional="true"
                v-model="searchText" />
            <i v-if="!searchStatus"
                class="fa-solid fa-magnifying-glass text-sm sm:text-md text-highlight absolute left-[2%] sm:left-[1%] top-[30%]"></i>
            <Loading v-else class="absolute left-[1%] top-[35%]" />
        </div>
        <AppInput name="sortRole" type="select" optionsType="Sort by role..." :options="['admin', 'manager', 'viewer']"
            v-model:modelValue="selectedRole" class="col-span-2 sm:col-span-1" />


        <AppInput name="sortState" type="select" optionsType="Sort by status..." :options="['active', 'not active']"
            v-model:modelValue="selectedStatus" class="col-span-2 sm:col-span-1" />
    </div>
</template>
<style scoped>
:deep(input) {
    padding-left: 2rem;
}

@media (max-width:536px) {

    :deep(input) {
        padding-left: 1.5rem;
    }
}
</style>