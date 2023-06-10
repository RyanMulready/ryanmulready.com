<template>
    <transition name="fade">
        <div
            v-if="!ready || visible"
            class="fixed top-0 left-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black bg-opacity-50 flex flex-col items-center justify-center"
            :class="{
                'cursor-pointer': ready,
                'cursor-not-allowed': !ready,
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
            <div class="fixed bottom-0 left-0 w-full z-50 h-40 overflow-hidden">
                <div class="container mx-auto flex h-full">
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
                            <span class="text-white">
                                <!-- eslint-disable -->
                                @
                                <!-- eslint-enable -->
                            </span>
                            {{ $t('companyName') }}
                        </div>
                    </div>
                    <div
                        class="flex flex-col flex-grow items-end justify-center pr-8">
                        <font-awesome-icon
                            class="text-accent"
                            icon="fa-solid fa-right-to-bracket"
                            size="xl" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

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

const emit = defineEmits(['dismissed']);

const visible = ref(true);
const dismiss = () => {
    if (props.ready) {
        visible.value = false;
        emit('dismissed');
        document.body.classList.remove('overflow-hidden');
    }
};
// When loading is finished dismiss the overlay
watch(
    () => props.loading,
    (newLoading) => {
        if (!newLoading) {
            dismiss();
        }
    },
);
</script>

<style scoped lang="scss">
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
