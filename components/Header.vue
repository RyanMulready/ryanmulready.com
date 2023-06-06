<template>
    <!-- HEADER START -->
    <div class="header-block sticky bg-base-100 pt-3 top-0 z-20">
        <div
            class="grid grid-cols-2 bg-neutral rounded-lg px-5 py-3 mb-2 mx-5 font-mono">
            <div class="max-w-sm">
                <h1
                    class="mb-3 font-weight-normal font-normal whitespace-nowrap">
                    Code Contributions
                </h1>
                <div class="gradient-scale rounded-md" />
                <div class="grid grid-cols-2 leading-4">
                    <div>more</div>
                    <div class="text-right">less</div>
                </div>
            </div>
            <div class="flex items-center justify-end text-primary text-3xl">
                {{ visibleYear }}
            </div>
        </div>
        <div class="filter-block pt-2 mx-5">
            <div class="flex justify-center items-center">
                <div
                    class="rounded-tl-lg rounded-tr-lg bg-neutral px-4 pt-3 pb-2">
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
            <div class="filter-block-footer w-full h-2 bg-neutral rounded-lg" />
        </div>
    </div>
    <!-- HEADER END -->
</template>

<script lang="ts" setup>
defineProps({
    visibleYear: {
        type: Number,
        required: false,
        default: null,
    },
});
</script>

<style scoped lang="scss">
.header-block {
    .gradient-scale {
        height: 0.25rem;
        background: linear-gradient(
            90deg,
            rgba(189, 48, 57) 0%,
            rgba(189, 48, 57, 0.75) 25%,
            rgba(189, 48, 57, 0.5) 50%,
            rgba(189, 48, 57, 0.25) 75%,
            rgba(31, 26, 28, 0.8)
        );
    }
}
</style>
