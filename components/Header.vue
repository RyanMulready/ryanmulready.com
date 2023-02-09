<template>
    <!-- HEADER START -->
    <div class="header-block sticky bg-base-100 py-2">
        <div
            class="grid grid-cols-3 bg-neutral text-neutral-content rounded-lg px-5 py-3 mb-2 mx-5 font-mono">
            <div>
                <h1 class="mb-3 font-weight-normal text-base font-normal">
                    Code Contributions
                </h1>
                <div class="gradient-scale rounded-md" />
                <div class="grid grid-cols-2 leading-4">
                    <div>more</div>
                    <div class="text-right">less</div>
                </div>
            </div>
            <div class="pl-3">
                <!-- The button to open modal -->
                <label
                    for="my-modal-6"
                    class="btn btn-primary btn-xs">
                    Filters
                </label>

                <Filters />
            </div>
            <div class="flex items-center justify-end text-primary text-3xl">
                {{ visibleYear }}
            </div>
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
    top: 0;
    z-index: 2;
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
