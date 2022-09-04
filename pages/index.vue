<script setup lang="ts">
import { useAsyncData } from '#imports';

// hello world component is auto imported
const title = 'Hello World';
const { data } = await useAsyncData('/api/hello', () =>
    $fetch('/api/github', {
        params: {
            name: 'world',
        },
    }),
);
</script>

<template>
    <div>
        {{ title }}
        {{ data }}
    </div>
</template>
