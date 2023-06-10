<template>
    <!-- FOOTER START -->
    <div
        class="transition-opacity duration-500 footer-block sticky bg-base-100 pb-1 z-30"
        :class="{
            'opacity-0': !visible,
        }">
        <div class="mx-5 mb-6">
            <div class="w-full h-2 bg-neutral rounded-lg" />
            <div class="grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_20px]">
                <div
                    class="rounded-bl-lg rounded-br-lg col-start-5 col-end-6 bg-neutral pt-5">
                    &nbsp;
                </div>
            </div>
        </div>
        <div
            class="grid grid-cols-3 bg-neutral rounded-lg px-6 py-9 mb-5 mx-5 text-2xl font-mono text-white flex-grow">
            <div class="col-span-2">
                <p>
                    {{ $t('ryanMulready') }}
                    <nuxt-img
                        class="inline align-bottom"
                        src="icon.svg"
                        width="25px"
                        height="25px" />
                </p>
            </div>
            <div class="flex justify-end items-center">
                <label
                    for="modal-about"
                    class="cursor-pointer text-white hover:text-accent transition-colors duration-200 mr-5 text-2xl">
                    {{ $t('cv') }}
                </label>
                <label
                    for="modal-contact"
                    class="cursor-pointer">
                    <font-awesome-icon
                        class="text-white hover:text-accent transition-colors duration-200"
                        icon="fa-regular fa-envelope" />
                </label>
            </div>
        </div>
    </div>
    <!-- FOOTER END -->
</template>
<script lang="ts" setup>
defineProps({
    visible: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>
<style scoped lang="scss">
.footer-block {
    bottom: 0;
}
</style>
