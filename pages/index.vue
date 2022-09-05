<script setup lang="ts">
import { useAsyncData } from '#imports';

const langs = await useAsyncData('langs', () => $fetch('/api/github/langs'));
const contribs = await useAsyncData('contribs', () =>
    $fetch('/api/github/contributions/2022'),
);
</script>

<template>
    <div>
        <h1>2022 Contributions</h1>
        {{ contribs }}
        <h1>Language Stats</h1>
        <pre>
            {{ langs }}
        </pre>
    </div>
</template>
