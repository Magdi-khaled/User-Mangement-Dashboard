<script setup lang="ts">
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
    <AppNavbar />
    <main class="text-secondary w-full px-4 sm:px-8 py-12 h-[85vh] flex flex-col items-center">
        <div>
            <h1 class="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                Welcome to UM system
            </h1>
            <p class="mt-4 text-lg text-primary max-w-2xl">
                The User Management Dashboard (UM System) is a powerful tool that enables administrators to efficiently
                manage user accounts. It provides features such as real-time search, filtering by role and status,
                user editing, and secure authentication. With an intuitive interface, role-based access control, and
                seamless data management, UM System streamlines user administration and enhances security.
            </p>
        </div>
    </main>

    <AppFooter />
</template>

<style scoped>
main {
    background-image: linear-gradient(#444df744,
            rgba(0, 0, 0, 0.059)), url('../assets/media/bg.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>