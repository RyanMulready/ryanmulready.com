<script setup lang="ts">
import { useGitHubStore } from '@/stores/github';

const ghStore = useGitHubStore();

await ghStore.fetchLanguages();
await ghStore.fetchContributions();

const contribs = ghStore.getContributions;
const langs = ghStore.getLanguages;
</script>

<template>
    <div>
        <h1>Language Stats</h1>
        <pre>
            {{ langs }}
        </pre>
        <h1>2022 Contributions</h1>
        <pre>
            {{ contribs }}
        </pre>
    </div>
</template>
