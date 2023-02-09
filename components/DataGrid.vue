<template>
    <!-- GRID START -->
    <div class="years-block overflow-hidden">
        <div
            v-for="(year, index) in years"
            :key="year"
            v-observe-visibility="{
                callback: visibilityChanged,
                intersection: {
                    threshold: 0.6,
                },
            }"
            :data-year="year"
            :class="{
                mergeYear:
                    index !== years.length - 1 &&
                    new Date(`12/31/${year} 00:00`).getDay() !== 6,
            }">
            <template v-if="events[year]">
                <div
                    v-for="(week, weekIndex) in events[year]"
                    :key="`${year}-${weekIndex}`"
                    :data-week="weekIndex"
                    class="week-block grid gap-[.15rem] mb-[.15rem] grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_20px]">
                    <div
                        class="day-block relative vertical-text font-mono uppercase flex items-center justify-center">
                        {{ displayMonth(week) }}
                    </div>
                    <transition-group>
                        <div
                            v-for="day in normalizeWeek(week)"
                            :key="day.date"
                            class="day-block rounded-sm text-center"
                            :style="`background-color: ${day.color}`" />
                        <div />
                    </transition-group>
                </div>
            </template>
            <template v-else>
                <div
                    class="loading-block loading m-auto text-primary text-center" />
            </template>
        </div>
    </div>
    <!-- GRID END -->
</template>
<script lang="ts" setup>
import { ref, PropType } from 'vue';
import { colorScale } from '@/utils/colors';
import { HTMLInputEvent, eventInterface } from '@/types';

defineProps({
    events: {
        type: Array,
        required: false,
        default: () => [],
    },
    years: {
        type: Array as PropType<Array<number>>,
        required: false,
        default: () => [],
    },
});

const emit = defineEmits(['visibleYears']);

// Normalize week data
// We can't ensure a week always has 7 data points due year start and end
function normalizeWeek(week: eventInterface[]) {
    return [...new Array(7)].map((empty, index) => {
        const dayData = week?.find(
            (day: eventInterface) => day.weekDay === index,
        ) || {
            date: '',
            duration: 0,
            count: 0,
            weekDay: null,
        };
        return {
            ...dayData,
            color: colorScale(dayData),
        };
    });
}

// Returns the month abrv if new
// TODO: Has bug never shows current month?
let currentMonth = '';
function displayMonth(week: eventInterface[]) {
    const date = week.find((day: eventInterface) => day.date)?.date;
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

    emit('visibleYears', visibleYears.value);
}
</script>

<style scoped lang="scss">
.years-block {
    min-height: 100vh;
    margin-bottom: 15rem;
    .mergeYear {
        margin-top: -0.6rem;
    }
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
</style>
