<script setup lang="ts">
import { ref, computed } from 'vue';
import OptionDetail from './OptionDetail.vue';
import Pagination from './Pagination.vue';
import AppButton from '../AppButton.vue';

import type { User } from '../../types/user';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const showInfo = ref<number | null>(null);
const currentPage = ref<number>(1);
const pageSize = ref<number>(6);
const tableBody = ref<HTMLElement | null>(null);


const props = defineProps<{ users: User[] }>();

const totalPages = computed(() => {
    return Math.ceil(props.users.length / pageSize.value);
});

const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return props.users.slice(startIndex, endIndex);
});

const toggleShowInfo = (index: number | null) => {
    showInfo.value = showInfo.value === index ? null : index;
};


const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
const islastRow = () => {
    return showInfo.value === paginatedItems.value.length - 1 || showInfo.value === paginatedItems.value.length - 2
        && showInfo.value != 0;
}
</script>


<template>
    <div class="overflow-auto">
        <div v-if="!paginatedItems.length" class="m-auto">
            <table class="w-full my-6 text-sm md:text-lg">
                <thead class="text-white bg-primary capitalize">
                    <th class="sm:py-4 sm:px-4 px-6 py-2 rounded-tl-2xl">
                        Index </th>
                    <th class="sm:py-4 sm:px-4 px-6 py-2">name</th>
                    <th class="sm:py-4 sm:px-4 px-6 py-2">email</th>
                    <th class="sm:py-4 sm:px-4 px-6 py-2">role</th>
                    <th class="sm:py-4 sm:px-4 px-6 py-2">status</th>
                    <th class="sm:py-4 sm:px-4 px-6 py-2 rounded-tr-2xl">
                        details</th>
                </thead>
            </table>
            <p class="text-center m-5 mt-10 p-5 text-primary font-bold text-lg md:text-xl lg:text-2xl capitalize">no
                users found...
            </p>
        </div>
        <table v-else class="w-full my-6 text-sm md:text-lg">
            <thead class="text-white bg-primary capitalize">
                <th class="sm:py-4 sm:px-4 px-6 py-2 rounded-tl-2xl">
                    Index </th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">name</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">email</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">role</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2">status</th>
                <th class="sm:py-4 sm:px-4 px-6 py-2 rounded-tr-2xl">
                    details
                </th>
            </thead>
            <tbody class="text-center relative text-primary" ref="tableBody">
                <tr v-for="(item, index) in paginatedItems" :key="index" class="h-20 odd:bg-white even:bg-gray-100">
                    <td class="py-2 px-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td class="py-2 px-4 capitalize">{{ item.name }}</td>
                    <td class="py-2 px-4">{{ item.email }}</td>
                    <td class="py-2 px-4 capitalize">{{ item.role }}</td>
                    <td class="py-2 px-4 capitalize"
                        :class="{ 'text-green-600': item.status === 'active', 'text-red-600': item.status === 'not active' }">
                        {{ item.status }}
                    </td>
                    <td class="py-2 px-4 relative">
                        <div v-if="authStore.getRole === 'admin' || authStore.getRole === 'manager'">
                            <button @click="toggleShowInfo(index)" class="m-auto cursor-pointer"
                                :class="{ active: showInfo === index }">
                                <i class="fa-solid fa-list-ul cursor-pointer font-extralight text-lg sm:text-2xl"></i>
                            </button>
                            <div class="bg-white" v-if="showInfo === index">
                                <OptionDetail :show="showInfo >= 0" :user="item" :lastRow="islastRow()" />
                            </div>
                        </div>
                        <div v-else>
                            <AppButton @click="router.push({ name: 'UserDetail', params: { id: item.id } })"
                                class="m-auto cursor-pointer">
                                details
                            </AppButton>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Pagination :show="users.length > 6" :currentPage="currentPage" :totalPages="totalPages" :nextPage="nextPage"
        :prevPage="prevPage" />
</template>