<script setup lang="ts">
import AppInput from "../AppInput.vue";
import { watch, ref, defineEmits } from "vue";
import { useUserStore } from "../../stores/users";
import type { User } from "../../types/user";
import type { getUserRole } from "../../composables/useAuth";
const userStore = useUserStore();

let filterResults = ref<User[]>([]);
const searchText = ref<string>("");
const selectedRole = ref<string>("");
const selectedStatus = ref<string>("");
const searchLoading = ref<boolean>(false);


let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const emit = defineEmits(["update:filteredArray"]);

emit("update:filteredArray", filterResults.value);
const filterUsers = async () => {
    if (searchText.value) {
        filterResults.value = await userStore.fetchUsers(searchText.value);
    }
    if (selectedRole.value) {
        filterResults.value = filterResults.value.filter((item) => item.role === selectedRole.value);
    }
    if (selectedStatus.value) {
        filterResults.value = filterResults.value.filter((item) => item.status === selectedStatus.value);
    }
    emit("update:filteredArray", filterResults.value);
};

watch([searchText, selectedRole, selectedStatus], () => {
    searchLoading.value = true;
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        searchLoading.value = false;
        filterUsers();
    }, 1000);
});

</script>

<template>
    <div class="bg-gray-100 shadow-2xl w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-2 p-4 mt-6 rounded-xl">
        <div class="relative col-span-2">
            <AppInput type="text" name="search" placeholder="Search by name, email..." :optional="true"
                v-model="searchText" />
            <i v-if="!searchLoading"
                class="fa-solid fa-magnifying-glass text-sm sm:text-md text-highlight absolute left-[2%] sm:left-[1%] top-[30%]"></i>
            <Loading v-else class="absolute left-[0.5%] top-[25%]" />
        </div>

        <AppInput name="sortRole" type="select" optionsType="Sort by role..." :options="['admin', 'manager', 'viewer']"
            v-model="selectedRole"
            :class="{ 'col-span-2': getUserRole === 'viewer', 'col-span-2 sm:col-span-1': getUserRole != 'viewer' }" />

        <AppInput name="sortState" type="select" optionsType="Sort by status..." :options="[' active', 'not active']"
            v-model="selectedStatus" class="col-span-2 sm:col-span-1" v-permission />
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