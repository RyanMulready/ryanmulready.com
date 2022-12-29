<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useGitHubStore } from '@/stores/github';
import { contributionWeeks, contributionDays } from '@/types';

// init our pinia store
const ghStore = useGitHubStore();

// Get all years returned by github
const years = computed(() =>
    // Sort years in descending order
    // Order can not be assured due to nature of Promise.all
    Object.keys(ghStore.getContributions)?.sort()?.reverse(),
);

// Reverse weeks to order desc; a bit cleaner than inline
function sortWeeks(weeksArray: contributionWeeks[]) {
    return weeksArray || [];
}

// TODO: Come up with an origonal method to calculating color scale
const colorMapping = {
    '#ebedf0': '#1f1a1c',
    '#9be9a8': 'rgba(189, 48, 57, 0.25)',
    '#40c463': 'rgba(189, 48, 57, 0.5)',
    '#30a14e': 'rgba(189, 48, 57, 0.75)',
    '#216e39': 'rgba(189, 48, 57)',
};
// Normalize week data
// We can't ensure a week always has 7 data points due year start and end
function normalizeWeek(week: contributionWeeks) {
    return [...new Array(7)].map((empty, index) => {
        const weekData =
            week?.contributionDays.find((day) => day.weekday === index) ||
            ({} as contributionDays);
        return {
            // realColor: weekData.color,
            color: weekData?.color
                ? colorMapping[weekData.color as keyof object]
                : colorMapping['#ebedf0'],
            count: weekData?.contributionCount || 0,
            date: weekData?.date || '',
            index,
        };
    });
}

// load page first then trigger fetch to fill data
onMounted(async () => {
    await ghStore.fetchContributions();
});
</script>

<template>
    <div class="m-5">
        <div
            class="grid grid-cols-2 bg-neutral text-neutral-content rounded-lg px-5 py-3 mb-2 font-mono">
            <div class="">
                <h1 class="mb-3 font-weight-normal text-base font-normal">
                    Code Contributions
                </h1>
                <div class="gradient-scale rounded-md" />
                <div class="grid grid-cols-2 leading-4">
                    <div>more</div>
                    <div class="text-right">less</div>
                </div>
            </div>
            <div
                class="flex items-center justify-end text-primary text-lg"
                :class="{
                    loading: !years.length,
                }">
                {{ years[0] }}
            </div>
        </div>
        <div>
            <div
                v-for="year in years"
                :key="year">
                <h1>{{ year }}</h1>
                <div class="grid grid-cols-7 gap-1">
                    <template
                        v-for="(week, index) in sortWeeks(
                            ghStore.getContributions[year].weeks,
                        )"
                        :key="`${year}-${index}`">
                        <div
                            v-for="day in normalizeWeek(week)"
                            :key="day.date"
                            class="rounded-sm text-center"
                            :style="`background-color: ${day.color}`">
                            {{ day.count }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.gradient-scale {
    height: 0.25rem;
    background: linear-gradient(
        90deg,
        rgba(189, 48, 57) 0%,
        rgba(189, 48, 57, 0.75) 25%,
        rgba(189, 48, 57, 0.5) 50%,
        rgba(189, 48, 57, 0.25) 75%,
        #1f1a1c
    );
}
.loading:after {
    content: '....';
    animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
    0%,
    20% {
        opacity: 0.2;
    }
    80%,
    100% {
        opacity: 1;
    }
}
</style>
