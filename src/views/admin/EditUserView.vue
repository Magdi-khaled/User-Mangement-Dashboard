<script setup lang="ts">
import AppNavbar from '../../components/AppNavbar.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppInput from '../../components/AppInput.vue';
import AppButton from '../../components/AppButton.vue';

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/users';
import { useAuthStore } from '../../stores/auth';
import { users } from '../../composables/useUsers';
import { navigateDashboard } from '../../composables/useNavigate';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
console.log(route.params.id);

// data 
const userStore = useUserStore();
const roles = ref<string[]>(["admin", "manager", "viewer"]);
const states = ref<string[]>(["active", "not active"]);
const userId = +route.params.id;

const currentUser = computed((): User => {
    return users.find(user => user.id === userId);
});
const id = ref<number>(+route.params.id);
const name = ref<string>(currentUser.value.name);
const role = ref<string>(currentUser.value.role);
const status = ref<string>(currentUser.value.status);

// 
const editUser = async () => {
    try {
        await userStore.editUser(id.value, name.value, role.value, status.value);
        router.push(navigateDashboard());
    }
    catch (err) {
        console.error('Add User Error', err);
    }
}
</script>

<template>
    <AppNavbar />
    <main class="px-4 sm:px-8 flex flex-col items-center gap-4 my-6">
        <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-3xl capitalize text-primary">
            <i class="fa-solid fa-user"></i> edit user form
        </h1>

        <form @submit.prevent="editUser" class="w-full sm:w-8/12 p-3 sm:p-6 border border-primary rounded-2xl">
            <AppInput label="user name" name="name" type="text" placeholder="Enter User Name"
                v-model:modelValue="name" />
            <AppInput label="email address" :hide="true" name="email" type="email" placeholder="Enter email address"
                v-model:modelValue="currentUser.email" />
            <AppInput label="Password" name="password" :hide="true" type="password" placeholder="Enter Password"
                v-model:modelValue="currentUser.password" />
            <AppInput name="role" type="select" optionsType="Choose role" :options="roles" v-model:modelValue="role" />
            <AppInput name="status" type="select" optionsType="Choose status" :options="states"
                v-model:modelValue="status" />

            <div class="flex justify-end">
                <AppButton @click="editUser" class="w-3/12 sm:w-4/12">
                    update user data
                </AppButton>
            </div>
        </form>
    </main>
    <AppFooter />
</template>