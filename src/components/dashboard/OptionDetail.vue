<script setup lang="ts">
// import AppTeleport from '../AppTeleport.vue';
import { ref } from 'vue';
import type { PropType } from 'vue';

import AppButton from '../AppButton.vue';
import ConfirmTeleport from './ConfirmTeleport.vue';

import { useAuthStore } from '../../stores/auth';
import type { User } from '../../types/user';

const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    },
    lastRow: {
        type: Boolean,
        required: true
    }
});

const authStore = useAuthStore();
const confirm = ref<boolean>(false);


const handleDeleteController = (id: number) => {
    console.log(id);
    confirm.value = false;
};

const InfoRoute = (id: number): any => {
    return { name: 'UserDetail', params: { id: id } };
};

const EditRoute = (id: number): any => {
    if (authStore.getRole === 'admin')
        return { name: 'AdminEditUser', params: { id: id } };
    return { name: 'ManagerEditUser', params: { id: id } };;
};

</script>

<template>
    <div v-show="props.show" class="absolute right-[60%] z-50 border border-primary rounded-xl text-primary bg-white"
        :class="{ 'top-[50%]': !props.lastRow, 'top-[-90%]': props.lastRow }">
        <ul v-if="authStore.getRole === 'manager' || authStore.getRole === 'admin'">
            <li class="rounded-t-xl hover:bg-highlight hover:text-white cursor-pointer duration-150 ">
                <router-link :to="InfoRoute(props.user.id)" class="block w-full h-full py-2 px-5">details
                </router-link>
            </li>
            <li class="hover:bg-highlight hover:text-white cursor-pointer duration-150"
                :class="{ 'rounded-b-xl': authStore.getRole === 'manager' }">
                <router-link :to="EditRoute(props.user.id)" class="block w-full h-full py-2 px-5"> edit
                </router-link>
            </li>
            <li v-if="authStore.getRole === 'admin'"
                class="py-2 px-5 rounded-b-xl hover:bg-highlight hover:text-white cursor-pointer duration-150"
                @click="confirm = true">
                delete
            </li>
        </ul>

        <ConfirmTeleport :show="confirm">
            <div class="flex flex-col">
                <span class="text-primary text-xl">
                    Are you sure, want delete this user?
                </span>
                <h4 class="underline"> userinfo </h4>
                <p>name: {{ props.user.name }}</p>
                <p>email: {{ props.user.email }}</p>
                <p>role: {{ props.user.role }}</p>
                <div class="flex items-center justify-end gap-4 mt-8">
                    <AppButton class="w-4/12" @click="handleDeleteController(props.user.id)">
                        confirm
                    </AppButton>
                    <AppButton class="w-4/12" @click="confirm = false">
                        cancel
                    </AppButton>
                </div>
            </div>
        </ConfirmTeleport>
    </div>
</template>