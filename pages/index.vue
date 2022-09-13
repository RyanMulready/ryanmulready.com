<script setup lang="ts">
import { onMounted } from 'vue';
import { useGitHubStore } from '@/stores/github';

// init our pinia store
const ghStore = useGitHubStore();

// load page first then trigger fetch to fill data
onMounted(async () => {
    await ghStore.fetchLanguages();
    await ghStore.fetchContributions();
});
</script>

<template>
    <div>
        <label
            for="years"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Select A Year
        </label>
        <select
            id="years"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>2022</option>
        </select>

        <h1>Language Stats</h1>
        <pre>
            {{ ghStore.getLanguages }}
        </pre>
        <h1>2022 Contributions</h1>
        <pre>
            {{ ghStore.getContributions }}
        </pre>
    </div>
</template>
