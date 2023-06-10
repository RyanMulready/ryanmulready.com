<template>
    <!-- HEADER START -->
    <div
        :class="{
            'opacity-0': !visible,
        }"
        class="transition-opacity duration-500 header-block sticky bg-base-100 pt-4 top-0 z-20">
        <div
            class="flex bg-neutral rounded-lg px-6 pt-5 pb-7 mb-2 mx-5 font-mono">
            <div class="flex-grow pr-16 max-w-xl">
                <h1
                    class="mb-2 font-weight-normal font-normal whitespace-nowrap text-2xl">
                    Code Contributions
                </h1>
                <div class="flex items-center">
                    <div class="pr-2">more</div>
                    <div
                        :class="{
                            light: isEven,
                        }"
                        class="flex-grow gradient-scale rounded-md mt-[.3rem]" />
                    <div class="pl-2">less</div>
                </div>
            </div>
            <div
                :class="{
                    'text-primary': !isEven,
                    'text-white': isEven,
                }"
                class="flex flex-grow items-center justify-end align-self-end text-3xl transition-colors duration-500">
                {{ visibleYear }}
            </div>
        </div>
        <div class="pt-4 mx-5">
            <div class="grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_20px]">
                <div
                    class="rounded-tl-lg rounded-tr-lg col-start-5 col-end-6 bg-neutral pt-5">
                    &nbsp;
                </div>
                <div class="flex col-start-8 items-center justify-end">
                    <label
                        for="modal-filters"
                        class="cursor-pointer">
                        <font-awesome-icon
                            class="hover:text-accent transition-colors duration-200"
                            icon="fa-solid fa-sliders"
                            size="lg" />
                    </label>
                </div>
            </div>
            <div class="w-full h-2 bg-neutral rounded-lg" />
        </div>
    </div>
    <!-- HEADER END -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    visibleYear: {
        type: Number,
        required: false,
        default: null,
    },
    visible: {
        type: Boolean,
        required: false,
        default: false,
    },
});
const isEven = computed(() => props.visibleYear % 2 === 0);
</script>

<style scoped lang="scss">
.header-block {
    .gradient-scale {
        height: 0.25rem;
        position: relative;
        background: linear-gradient(
            90deg,
            rgba(189, 48, 57) 0%,
            rgba(189, 48, 57, 0.75) 25%,
            rgba(189, 48, 57, 0.5) 50%,
            rgba(189, 48, 57, 0.25) 75%,
            rgba(31, 26, 28, 0.8)
        );

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                rgba(255, 255, 255) 0%,
                rgba(255, 255, 255, 0.75) 25%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0.25) 75%,
                rgba(31, 26, 28, 0.8)
            );
            opacity: 0;
            transition: opacity 0.5s;
        }

        &.light:before {
            opacity: 1;
        }
    }
}
</style>
