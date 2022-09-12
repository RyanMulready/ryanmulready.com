<script setup lang="ts">
import { useAsyncData } from '#imports';
import { useGitHubStore } from '@/stores/github';

const ghStore = useGitHubStore();
console.log(ghStore);

const langs = await useAsyncData('langs', () => $fetch('/api/github/langs'));
const contribs = {};
await ghStore.fetchContributions();
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
