<template>
    <!-- FOOTER START -->
    <div class="footer-block sticky bg-base-100 pt-3 pb-5">
        <div
            class="grid grid-cols-2 bg-neutral rounded-lg px-5 py-7 text-xl mx-5 font-mono text-white">
            <p>
                Ryan Mulready
                <nuxt-img
                    class="inline align-bottom"
                    src="images/logo.svg"
                    width="25px"
                    height="25px" />
            </p>
            <div class="flex flex-col justify-center items-end pr-5">
                <font-awesome-icon
                    class="text-white"
                    icon="fa-regular fa-envelope"
                    size="lg" />
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
