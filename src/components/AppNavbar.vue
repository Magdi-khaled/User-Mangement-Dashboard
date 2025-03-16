<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '../components/AppButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { navigateDashboard } from '../composables/useNavigate';

const router = useRouter();
const authStore = useAuthStore();
const isMenuOpen = ref(false);

const logout = async () => {
    try {
        await authStore.logout();
        router.push({ name: 'Login' });
    }
    catch (err) {
        console.error('Error Logout', err);
    }
}

</script>

<template>
    <div class="flex items-center justify-between px-4 sm:px-8 py-2 border-b-2 border-highlight">
        <!-- Logo -->
        <div class="w-2/12 text-primary flex items-center gap-4">
            <i class="fa-solid fa-screwdriver-wrench text-3xl"></i>
            <p class="capitalize text-xl font-semibold">{{ authStore.getRole }}</p>
        </div>
        <!-- Links -->
        <nav :class="[
            `z-60 absolute md:relative top-[50px] md:top-0 left-0 md:left-auto w-full md:w-6/12 lg:w-5/12 bg-white md:bg-transparent
            shadow-md md:shadow-none md:flex md:items-center md:gap-8 px-4 md:px-0`,
            isMenuOpen ? 'block h-full ' : 'hidden md:block'
        ]">
            <ul class="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
                <li class="text-primary capitalize font-semibold hover:text-highlight duration-100">
                    <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-2">home</routerLink>
                </li>
                <li v-if="authStore.isLoggedIn"
                    class="text-primary capitalize font-semibold hover:text-highlight duration-100">
                    <routerLink :to="navigateDashboard()" class="block w-full h-full py-2"> users </routerLink>
                </li>
                <li v-if="authStore.isLoggedIn && authStore.getRole === 'admin'"
                    class="text-primary capitalize font-semibold hover:text-highlight duration-100">
                    <routerLink :to="{ name: 'AddUser' }" class="block w-full h-full py-2 whitespace-nowrap">add
                        user</routerLink>
                </li>
                <li class="text-primary capitalize font-semibold hover:text-highlight duration-100">
                    <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-2">contact</routerLink>
                </li>
                <li class="text-primary capitalize font-semibold hover:text-highlight duration-100">
                    <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-2">about</routerLink>
                </li>
                <li class="text-primary capitalize font-semibold hover:text-highlight duration-100">
                    <routerLink :to="{ name: 'Home' }" class="block w-full h-full py-2">support</routerLink>
                </li>
            </ul>
            <!-- Sign In Button -->
            <div v-if="!authStore.isLoggedIn" class="block md:hidden w-full text-center">
                <AppButton @click="router.push({ name: 'Login' })" class="py-[4px]">sign in</AppButton>
            </div>
            <!-- Sign Out Button -->
            <div v-else class="block md:hidden w-full text-center">
                <AppButton @click="logout" class="py-[4px]">Log out</AppButton>
            </div>
        </nav>
        <!-- Toggle Menu Button -->
        <button @click="isMenuOpen = !isMenuOpen" class="text-primary md:hidden cursor-pointer">
            <i class="fa-solid fa-bars-staggered text-2xl"></i>
        </button>

        <!-- Sign In Button -->
        <div v-if="!authStore.isLoggedIn" class="hidden md:block">
            <AppButton @click="router.push({ name: 'Login' })" class="py-[4px]">sign in</AppButton>
        </div>

        <!-- Sign Out Button -->
        <div v-else class="hidden md:block">
            <AppButton @click="logout" class="py-[4px]">Log out</AppButton>
        </div>
    </div>
</template>
