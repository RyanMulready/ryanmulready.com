<template>
    <!-- GRID START -->
    <div class="years-block pt-4">
        <div
            v-for="(year, yearIndex) in years"
            :key="year"
            v-observe-visibility="{
                callback: visibilityChanged,
                intersection: {
                    threshold: 0.4,
                },
            }"
            :data-year="year"
            :class="{
                mergeYear:
                    yearIndex !== years.length - 1 &&
                    new Date(`12/31/${year} 00:00`).getDay() !== 6,
            }">
            <template v-if="events[year]">
                <div
                    v-for="(week, weekIndex) in events[year]"
                    :key="`${year}-${weekIndex}`"
                    :data-week="weekIndex"
                    class="week-block grid mb-1.5 grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_20px]"
                    :class="{
                        hovered: hoveredWeekIndex === `${year}-${weekIndex}`,
                    }"
                    @mouseover="delayShowContent(`${year}-${weekIndex}`)"
                    @mouseout="clearShowTimer"
                    @click="hoveredWeekIndex = `${year}-${weekIndex}`">
                    <div
                        class="day-block relative vertical-text font-mono uppercase flex items-center justify-center">
                        <span
                            :class="{
                                hidden:
                                    yearIndex === 0 && Number(weekIndex) === 0,
                            }">
                            {{ displayMonth(week) }}
                        </span>
                    </div>
                    <div
                        v-for="(day, dayIndex) in normalizeWeek(week)"
                        :key="day.date"
                        :data-index="dayIndex"
                        transition="fade"
                        :data-day="JSON.stringify(day)"
                        stagger="1000"
                        class="data-block day-block flex align-center justify-center items-center"
                        :style="`background-color: ${dayBackground(day)}`">
                        <div
                            v-if="hoveredWeekIndex !== `${year}-${weekIndex}`"
                            class="meeting-dot bg-meetings"
                            :class="{
                                visible: filters.meetings,
                            }"
                            :data-hours="JSON.stringify(meetingsSizeScale(day))"
                            :style="`scale:
                        ${meetingsSizeScale(day).size}`" />
                        <div
                            v-if="hoveredWeekIndex === `${year}-${weekIndex}`"
                            class="flex flex-col h-full w-full text-center text-neutral-content">
                            <div
                                class="date-header bg-base-100 text-sm pb-2 pt-1">
                                {{ dateFormatter.format(new Date(day.date)) }}
                            </div>
                            <div
                                class="commit-block flex flex-col justify-center items-center flex-grow text-base-200">
                                <div class="text-content text-center">
                                    <div class="text-3xl">
                                        {{ day.commits }}
                                    </div>
                                    <div
                                        v-if="filters.meetings"
                                        class="text-xs text-meetings w-full">
                                        {{
                                            millisecondsFormatter(day.duration)
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div />
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
import {
    HTMLInputEvent,
    yearsInterface,
    eventInterface,
    filtersInterface,
} from '@/types';
import { commitsColorScale } from '@/utils/colors';
import { meetingsSizeScale } from '@/utils/sizes';

const props = defineProps({
    events: {
        type: Object as PropType<yearsInterface>,
        required: false,
        default: () => {},
    },
    years: {
        type: Array as PropType<Array<number>>,
        required: false,
        default: () => [],
    },
    filters: {
        type: Object as PropType<filtersInterface>,
        required: false,
        default: () => {},
    },
});

const emit = defineEmits(['updateVisibleYears']);
const hoveredWeekIndex = ref('');
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
});
const millisecondsFormatter = (ms: number | undefined) => {
    if (!ms) return '0h';
    return `${Math.ceil(ms / 1000 / 60 / 60)}h`;
};

let delayShowTimeout: ReturnType<typeof setTimeout>;
const clearShowTimer = () => clearTimeout(delayShowTimeout);
const delayShowContent = (index: string) => {
    clearShowTimer();

    delayShowTimeout = setTimeout(() => {
        hoveredWeekIndex.value = index;
    }, 500);
};

// Normalize week data
// We can't ensure a week always has 7 data points due year start and end
function normalizeWeek(week: eventInterface[]) {
    return [...new Array(7)].map((empty, index) => {
        const dayData = week?.find(
            (day: eventInterface) => day.weekDay === index,
        ) || {
            date: '',
            duration: 0,
            commits: 0,
            meetings: 0,
            weekDay: null,
        };
        return {
            ...dayData,
            color: commitsColorScale(dayData),
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
const visibleYears = ref<number[]>([]);
function visibilityChanged(isVisible: boolean, entry: HTMLInputEvent) {
    const { year: rawYear } = entry.target.dataset;
    const year = Number(rawYear);

    if (!isVisible) {
        visibleYears.value = visibleYears.value.filter((item) => item !== year);
    } else {
        visibleYears.value.push(year);
    }
    visibleYears.value.sort().reverse();

    emit('updateVisibleYears', visibleYears.value);
}

const dayBackground = (day: eventInterface) => {
    return props.filters.best && day.isBestCommit
        ? 'rgba(194, 128, 255, 1)'
        : day.color;
};
</script>

<style lang="scss" scoped>
.years-block {
    min-height: 100vh;
    margin-bottom: 15rem;
    .mergeYear {
        margin-top: -0.6rem;
    }
    .week-block {
        .day-block {
            transition: height 0.5s ease, background-color 0.3s linear;
            height: 1rem;
        }
        &.hovered {
            .day-block {
                height: 6rem;
            }
        }
    }

    .vertical-text {
        top: 1.5rem;
        writing-mode: sideways-lr;
        text-orientation: mixed;
    }
    .loading-block {
        grid-column: 1 / span 9;
    }

    .meeting-dot {
        opacity: 0;
        transition: opacity 0.5s ease-in;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        display: inline-block;

        &.visible {
            opacity: 1;
        }
    }
}
</style>
