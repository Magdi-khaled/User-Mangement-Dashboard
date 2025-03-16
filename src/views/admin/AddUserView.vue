<script setup lang="ts">
import AppNavbar from '../../components/AppNavbar.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppInput from '../../components/AppInput.vue';
import AppTeleport from '../../components/AppTeleport.vue';
import AppButton from '../../components/AppButton.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/users';
import { navigateDashboard } from '../../composables/useNavigate';

// data 
const userStore = useUserStore();
const router = useRouter();
const roles = ref<string[]>(["admin", "manager", "viewer"]);
const states = ref<string[]>(["active", "not active"]);
const failed = ref<boolean>(false);
const success = ref<boolean>(false);
const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const role = ref<string>("");
const status = ref<string>("");

const validateName = () => {
    if (!name.value) return 'Name is required.';
    return null;
};
const validateEmail = () => {
    if (!email.value) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Invalid email format.';
    return null;
};
const validatePassword = () => {
    if (!password.value) return 'Password is required.';
    if (password.value.length > 6) return 'Password length must greater than 6 characters.';
};
const validateStatus = () => {
    if (!status.value) return 'field status is required.';
};
const validateRole = () => {
    if (!role.value) return 'field role is required.';
};
// 
const createUser = async () => {
    try {
        if (name.value && email.value && password.value && status.value && role.value) {
            await userStore.createUser({
                name: name.value,
                email: email.value,
                password: password.value,
                role: role.value,
                status: status.value
            });
            success.value = true;
            await setTimeout(() => { success.value = false }, 2000);
            await setTimeout(() => {
                router.push(navigateDashboard());
            }, 1000);
        }
        else {
            failed.value = true;
            setTimeout(() => { failed.value = false }, 2000);
        }
    }
    catch (err) {
        console.error('Add User Error', err);
    }
}
</script>

<template>
    <AppNavbar />
    <AppTeleport :show="success" :state="true">
        <i class="fa-solid fa-check-double"></i> User Add Successfully
    </AppTeleport>
    <AppTeleport :show="failed" :state="false">
        <i class="fa-solid fa-circle-exclamation"></i> All Fields Required
    </AppTeleport>
    <main class="px-4 sm:px-8 flex flex-col items-center gap-4 my-6">
        <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-3xl capitalize text-primary">
            <i class="fa-solid fa-user-plus"></i> add user form
        </h1>

        <form @submit.prevent="createUser" class="w-full sm:w-8/12 p-3 sm:p-6 border border-primary rounded-2xl">
            <AppInput label="user name" name="name" type="text" placeholder="Enter User Name" v-model:modelValue="name"
                :validator="validateName" />
            <AppInput label="email address" name="email" type="email" placeholder="Enter email address"
                v-model:modelValue="email" :validator="validateEmail" />
            <AppInput label="Password" name="password" type="password" placeholder="Enter Password"
                v-model:modelValue="password" :validator="validatePassword" />
            <AppInput name="role" type="select" optionsType="Choose role" :options="roles" v-model:modelValue="role"
                :validator="validateRole" />
            <AppInput name="status" type="select" optionsType="Choose status" :options="states"
                v-model:modelValue="status" :validator="validateStatus" />

            <div class="flex justify-end">
                <AppButton @click="createUser" class="w-4/12 sm:w-3/12">
                    add user
                </AppButton>
            </div>
        </form>
    </main>
    <AppFooter />
</template>
