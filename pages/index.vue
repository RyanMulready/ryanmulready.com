<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGitHubStore } from '@/stores/github';

// init our pinia store
const ghStore = useGitHubStore();

// load page first then trigger fetch to fill data
onMounted(async () => {
    await ghStore.fetchLanguages();
    await ghStore.fetchContributions();
});

// Last 5 Years
const now = new Date();
const thisYear = now.getFullYear();
const years = 4; // number of years prior to this year
const selectedYear = ref(thisYear); // v-model
const lastYears = [thisYear, ...Array(years)].map((_, i) => thisYear - i);

// Methods
async function updateYear($event) {
    if ($event.target.value) {
        await ghStore.fetchContributions($event.target.value);
    }
}
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
            v-model="selectedYear"
            class="select select-info w-full max-w-xs"
            @change="updateYear">
            <option
                v-for="year in lastYears"
                :key="year">
                {{ year }}
            </option>
        </select>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <h1>{{ selectedYear }} Contributions</h1>
                <div class="mockup-code">
                    <pre>
                        <code>
                            {{ ghStore.getContributions }}
                        </code>
                    </pre>
                </div>
            </div>
            <div>
                <h1>Language Stats All Time</h1>
                <div class="mockup-code">
                    <pre>
                        <code>
                            {{ ghStore.getLanguages }}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>
