<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGitHubStore } from '@/stores/github';
import { contributionWeeks, HTMLInputEvent } from '@/types';
import { yearsPast } from '@/utils/dates';

// init our pinia store
const ghStore = useGitHubStore();

// Has data from 2012->; 2018-> most significant
const years = yearsPast(5);

// TODO: Come up with an origonal method to calculate color scale
const colorMapping = {
    '': 'rgba(31,26,28, 0.4)',
    '#ebedf0': 'rgba(31,26,28, 0.8)',
    '#9be9a8': 'rgba(189, 48, 57, 0.25)',
    '#40c463': 'rgba(189, 48, 57, 0.5)',
    '#30a14e': 'rgba(189, 48, 57, 0.75)',
    '#216e39': 'rgba(189, 48, 57)',
};
// Normalize week data
// We can't ensure a week always has 7 data points due year start and end
function normalizeWeek(week: contributionWeeks) {
    return [...new Array(7)].map((empty, index) => {
        const dayData = week?.contributionDays.find(
            (day) => day.weekday === index,
        );
        // TODO: Why doesn't just the top condition work for both?
        if (dayData) {
            return {
                // realColor: weekData.color,
                color: dayData?.color
                    ? colorMapping[dayData.color as keyof object]
                    : colorMapping['#ebedf0'],
                count: dayData?.contributionCount || 0,
                date: dayData?.date || '',
                index,
            };
        }
        return { color: colorMapping[''], count: 0, index };
    });
}

// Returns the month abrv if new
// TODO: Has bug never shows current month?
let currentMonth = '';
function displayMonth(week: contributionWeeks) {
    const date = normalizeWeek(week).find((day) => day.date)?.date;
    const parsedDate = new Date(`${date} 00:00`);
    const month = parsedDate.toLocaleString('default', { month: 'short' });

    if (month !== currentMonth) {
        currentMonth = month;
        return month;
    }
    return '';
}

// Keeps track of what years are current in the viewport
const visibleYears = ref<string[]>([]);
function visibilityChanged(isVisible: boolean, entry: HTMLInputEvent) {
    const { year } = entry.target.dataset;
    if (!isVisible) {
        visibleYears.value = visibleYears.value.filter((item) => item !== year);
    } else {
        visibleYears.value.push(year as string);
    }
    visibleYears.value.sort().reverse();
}

// load page first then trigger fetch to fill data
onMounted(async () => {
    // Loop over possible years and request data
    // Current year should be available first but isn't always
    years.forEach(async (year) => {
        await ghStore.fetchContributions(year);
    });
});
</script>

<template>
    <div>
        <!-- HEADER START -->
        <div class="header-block sticky bg-base-100 py-2">
            <div
                class="grid grid-cols-2 bg-neutral text-neutral-content rounded-lg px-5 py-3 mb-2 mx-5 font-mono">
                <div>
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
                    class="flex items-center justify-end text-primary text-3xl"
                    :class="{
                        loading: !years.length,
                    }">
                    {{ visibleYears[0] }}
                </div>
            </div>
        </div>
        <!-- HEADER END -->

        <!-- GRID START -->
        <div class="years-block overflow-hidden">
            <div
                v-for="year in years"
                :key="year"
                class="mb-5">
                <div
                    v-observe-visibility="{
                        callback: visibilityChanged,
                        intersection: {
                            threshold: 0.6,
                        },
                    }"
                    :data-year="year"
                    class="grid grid-cols-9 gap-[.15rem] grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_20px]">
                    <template v-if="ghStore.getContributions[year]">
                        <template
                            v-for="(week, index) in ghStore.getContributions[
                                year
                            ].weeks"
                            :key="`${year}-${index}`">
                            <div
                                class="day-block relative vertical-text font-mono uppercase flex items-center justify-center">
                                {{ displayMonth(week) }}
                            </div>
                            <div
                                v-for="day in normalizeWeek(week)"
                                :key="day.date"
                                class="day-block rounded-sm text-center"
                                :style="`background-color: ${day.color}`" />
                            <div />
                        </template>
                    </template>
                    <template v-else>
                        <div
                            class="loading-block loading m-auto text-primary text-center" />
                    </template>
                </div>
            </div>
        </div>
        <!-- GRID END -->

        <!-- FOOTER START -->
        <div class="footer-block sticky bg-base-100 pt-3 pb-5">
            <div
                class="grid grid-cols-2 bg-neutral rounded-lg px-5 py-3 mx-5 font-mono">
                Footer
            </div>
        </div>
        <!-- FOOTER END -->
    </div>
</template>
<style scoped lang="scss">
.header-block {
    top: 0;
    z-index: 2;
    .gradient-scale {
        height: 0.25rem;
        background: linear-gradient(
            90deg,
            rgba(189, 48, 57) 0%,
            rgba(189, 48, 57, 0.75) 25%,
            rgba(189, 48, 57, 0.5) 50%,
            rgba(189, 48, 57, 0.25) 75%,
            rgba(31, 26, 28, 0.8)
        );
    }
}
.years-block {
    min-height: 100vh;
    margin-bottom: 15rem;
    .day-block {
        height: 0.5rem;
    }
    .vertical-text {
        top: 2rem;
        writing-mode: sideways-lr;
        text-orientation: mixed;
    }
    .loading-block {
        grid-column: 1 / span 9;
    }
}
.footer-block {
    bottom: 0;
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
