<template>
    <transition name="fade">
        <div
            v-if="!ready || visible"
            class="fixed top-0 left-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black bg-opacity-50 flex flex-col items-center justify-center"
            :class="{
                'cursor-pointer': !loading,
                'cursor-not-allowed': loading,
            }"
            @click="dismiss">
            <nuxt-img
                class="logo"
                :class="{
                    loading,
                }"
                src="images/logo.svg"
                width="180px"
                height="180px" />
            <div
                class="fixed bottom-0 left-0 w-full z-50 h-40 overflow-hidden bg-black grid grid-cols-[1fr_50px]">
                <div class="flex flex-col justify-center pl-5">
                    <div class="text-xl text-secondary">
                        {{
                            $t('loadingTitle', {
                                name: 'Ryan Mulready',
                                title: $t('companyPosition'),
                            })
                        }}
                    </div>
                    <div class="text-xl text-primary">
                        <span class="text-white">@</span>{{ $t('companyName') }}
                    </div>
                </div>
                <div class="flex flex-col justify-center items-end pr-5">
                    <font-awesome-icon
                        class="text-accent"
                        icon="fa-solid fa-right-to-bracket"
                        size="lg" />
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    loading: {
        type: Boolean,
        required: true,
        default: true,
    },
    ready: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const visible = ref(true);
const dismiss = () => {
    if (props.ready) {
        visible.value = false;
        document.body.classList.remove('overflow-hidden');
    }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.logo.loading {
    animation: pulse 0.6s ease-in infinite alternate;
}
@keyframes pulse {
    from {
        transform: scale(0.96);
    }

    to {
        transform: scale(1);
    }
}
</style>
