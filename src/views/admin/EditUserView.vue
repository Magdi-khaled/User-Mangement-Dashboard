<script setup lang="ts">
import AppNavbar from '../../components/AppNavbar.vue';
import AppFooter from '../../components/AppFooter.vue';
import AppInput from '../../components/AppInput.vue';
import AppTeleport from '../../components/AppTeleport.vue';
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

const success = ref<boolean>(false);
const failed = ref<boolean>(false);
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
        if (name.value && status.value && role.value) {
            await userStore.editUser(id.value, name.value, role.value, status.value);
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
const validateName = () => {
    if (!name.value) return 'Name is required.';
    return null;
};
const validateStatus = () => {
    if (!status.value) return 'field status is required.';
};
const validateRole = () => {
    if (!role.value) return 'field role is required.';
};
</script>

<template>
    <AppNavbar />
    <AppTeleport :show="success" :state="true">
        <i class="fa-solid fa-check-double"></i> User Updated Successfully
    </AppTeleport>
    <AppTeleport :show="failed" :state="false">
        <i class="fa-solid fa-circle-exclamation"></i> All Fields Required
    </AppTeleport>
    <main class="px-4 sm:px-8 flex flex-col items-center gap-4 my-6">
        <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-3xl capitalize text-primary">
            <i class="fa-solid fa-user"></i> edit user form
        </h1>

        <form @submit.prevent="editUser" class="w-full sm:w-8/12 p-3 sm:p-6 border border-primary rounded-2xl">
            <AppInput label="user name" name="name" type="text" placeholder="Enter User Name" v-model:modelValue="name"
                :validator="validateName" />
            <AppInput label="email address" :hide="true" name="email" type="email" placeholder="Enter email address"
                v-model:modelValue="currentUser.email" />
            <AppInput label="Password" name="password" :hide="true" type="password" placeholder="Enter Password"
                v-model:modelValue="currentUser.password" />
            <AppInput name="role" type="select" optionsType="Choose role" :options="roles" v-model:modelValue="role"
                :validator="validateRole" />
            <AppInput name="status" type="select" optionsType="Choose status" :options="states"
                v-model:modelValue="status" :validator="validateStatus" />

            <div class="flex justify-end">
                <AppButton @click="editUser" class="w-3/12 sm:w-4/12">
                    update user data
                </AppButton>
            </div>
        </form>
    </main>
    <AppFooter />
</template>