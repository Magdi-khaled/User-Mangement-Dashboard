<script setup lang="ts">
import AppNavbar from '../../components/AppNavbar.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppInput from '../../components/AppInput.vue';
import AppButton from '../../components/AppButton.vue';

import { ref } from 'vue';
import { useUsersStore } from '../../stores/users';
import { users } from '../../composables/useUsers';

// data 
const usersStore = useUsersStore();
const roles = ref<string[]>(["admin", "manager", "viewer"]);
const states = ref<string[]>(["active", "not active"]);

const id = ref<number | null>(users.length + 1);
const name = ref<string | null>("");
const email = ref<string | null>("");
const password = ref<string | null>("");
const role = ref<string | null>("");
const status = ref<string | null>("");
// 
const addUser = async () => {
    try {
        await usersStore.addUser({
            id: id.value,
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
            status: status.value
        });
        router.push({ name: 'Login' });
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
            <i class="fa-solid fa-user-plus"></i> add user form
        </h1>

        <form @submit.prevent="addUser" class="w-full sm:w-8/12 p-3 sm:p-6 border border-primary rounded-2xl">
            <AppInput label="user name" name="name" type="text" placeholder="Enter User Name"
                v-model:modelValue="name" />
            <AppInput label="email address" name="email" type="email" placeholder="Enter email address"
                v-model:modelValue="email" />
            <AppInput label="Password" name="password" type="password" placeholder="Enter Password"
                v-model:modelValue="password" />
            <AppInput name="role" type="select" optionsType="Choose role" :options="roles" v-model:modelValue="role" />
            <AppInput name="status" type="select" optionsType="Choose status" :options="states"
                v-model:modelValue="status" />

            <div class="flex justify-end">
                <AppButton @click="addUser" class="w-4/12 sm:w-3/12">
                    add user
                </AppButton>
            </div>
        </form>
    </main>
    <AppFooter />
</template>
