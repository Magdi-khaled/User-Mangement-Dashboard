<script setup lang="ts">
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import AppInput from '../components/AppInput.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { users } from '../composables/useUsers';

const route = useRoute();
const userId = +route.params.id;


const currentUser = computed(() => {
    return users.find(user => user.id === userId);
})

</script>

<template>
    <AppNavbar />
    <main class="px-4 sm:px-8 flex flex-col items-center gap-4 my-6">
        <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-3xl capitalize text-primary">
            <i class="fa-solid fa-user"></i> user information form
        </h1>
        <form @submit.prevent="" class="w-full sm:w-8/12 p-3 sm:p-6 border border-primary rounded-2xl">
            <AppInput label="user name" name="name" type="text" :hide="true" placeholder="Enter User Name"
                v-model:modelValue="currentUser.name" />
            <AppInput label="email address" name="email" type="email" :hide="true" placeholder="Enter email address"
                v-model:modelValue="currentUser.email" />
            <AppInput label="Password" name="password" type="text" :hide="true" placeholder="Enter Password"
                v-model:modelValue="currentUser.password" />
            <AppInput name="role" type="text" :hide="true" v-model:modelValue="currentUser.role" />
            <AppInput name="status" type="text" :hide="true" v-model:modelValue="currentUser.status" />
        </form>
    </main>
    <AppFooter />
</template>
