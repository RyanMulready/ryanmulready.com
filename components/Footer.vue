<template>
    <!-- FOOTER START -->
    <div class="footer-block sticky bg-base-100 pt-3 pb-5 z-30">
        <div
            class="grid grid-cols-3 bg-neutral rounded-lg px-5 py-7 text-xl mx-5 font-mono text-white flex-grow">
            <div class="col-span-2">
                <label
                    for="modal-about"
                    class="cursor-pointer">
                    Ryan Mulready
                    <nuxt-img
                        class="inline align-bottom"
                        src="images/logo.svg"
                        width="25px"
                        height="25px" />
                </label>
            </div>
            <div class="flex flex-col justify-center items-end pr-5">
                <label
                    for="modal-contact"
                    class="cursor-pointer">
                    <font-awesome-icon
                        class="text-white"
                        icon="fa-regular fa-envelope"
                        size="lg" />
                </label>
            </div>
        </div>
    </div>
    <!-- FOOTER END -->
</template>
<style scoped lang="scss">
.footer-block {
    bottom: 0;
}
</style>
