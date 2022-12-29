<template>
    <div class="container mx-auto">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { useHead } from '#imports';

useHead({
    bodyAttrs: {
        class: 'prose min-w-full',
    },
});
</script>
