<template>
    <!-- GRID START -->
    <div class="years-block px-5">
        <div
            v-for="year in years"
            :key="year"
            v-observe-visibility="{
                callback: visibilityChanged,
                intersection: {
                    threshold: 0.1,
                },
            }"
            class="w-full year-block"
            :data-year="year">
            <div
                v-for="(month, monthIndex) in getMonths(year)"
                :key="`${year}-${month}`"
                :class="{
                    hovered: hoveredMonthIndex === `${year}-${monthIndex}`,
                }"
                class="mb-8 month-block"
                @mouseover="delayShowContent(`${year}-${monthIndex}`)"
                @mouseout="clearShowTimer"
                @click="hoveredMonthIndex = `${year}-${monthIndex}`">
                <h3 class="text-lg font-bold mb-2">
                    {{ getMonthName(month) }}
                </h3>
                <div class="grid grid-cols-7 gap-1">
                    <template
                        v-for="day in generateDayBlocks(year, month)"
                        :key="day">
                        <div
                            :style="
                                dayStyle(getDayData(year, month, day), year)
                            "
                            class="day-block p-2 flex items-center justify-center transition-all duration-300 ease-in-out hover:h-full flex-wrap relative">
                            <template v-if="hasData(year, month, day)">
                                <div
                                    v-if="
                                        day &&
                                        hoveredMonthIndex ===
                                            `${year}-${monthIndex}`
                                    "
                                    class="absolute top-0 right-0 text-xs px-2 text-white">
                                    {{ ordinalSuffixOf(day) }}
                                </div>
                                <div
                                    v-if="
                                        hoveredMonthIndex ===
                                        `${year}-${monthIndex}`
                                    "
                                    class="w-full text-center pt-2 text-xl">
                                    {{ getDayData(year, month, day).commits }}
                                </div>
                                <div
                                    v-if="
                                        hoveredMonthIndex ===
                                        `${year}-${monthIndex}`
                                    "
                                    class="text-xs text-meetings w-full text-center">
                                    {{
                                        millisecondsFormatter(
                                            getDayData(year, month, day)
                                                .duration,
                                        )
                                    }}
                                </div>
                                <div
                                    :class="{
                                        visible:
                                            filters.meetings &&
                                            hoveredMonthIndex !==
                                                `${year}-${monthIndex}`,
                                    }"
                                    class="meeting-dot bg-meetings"
                                    :style="{
                                        transform: `scale(${
                                            meetingsSizeScale(
                                                getDayData(year, month, day),
                                            ).size
                                        })`,
                                    }" />
                            </template>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <!-- GRID END -->
</template>

<script lang="ts" setup>
import { type PropType, computed, ref } from 'vue';
import { commitsColorScale } from '@/utils/colors';
import { meetingsSizeScale } from '@/utils/sizes';
import { ordinalSuffixOf } from '@/utils/dates';

const props = defineProps({
    events: {
        type: Object as PropType<yearsInterface>,
        required: false,
        default: () => ({}),
    },
    years: {
        type: Array as PropType<number[]>,
        required: false,
        default: () => [],
    },
    filters: {
        type: Object as PropType<filtersInterface>,
        required: false,
        default: () => ({}),
    },
});
const emit = defineEmits(['updateVisibleYears']);

const visibleYears = ref<number[]>([]);
const hoveredMonthIndex = ref('');

function emptyDays(year: number, month: number) {
    const startingDay = new Date(year, month - 1, 1).getDay();
    const offset = (startingDay + 6) % 7;
    return Array(offset + 1).fill(null);
}

function daysInMonth(year: number, month: number) {
    const date = new Date(year, month - 1, 1);
    const days = [];
    while (date.getMonth() === month - 1) {
        days.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }
    return days;
}

const dayStyle = (day: eventInterface, year: number) => {
    const color = commitsColorScale(day, year % 2 === 0);
    const bgColor =
        props.filters.best && day.isBestCommit
            ? 'rgba(194, 128, 255, 1)'
            : color?.bg;
    const textColor =
        props.filters.best && day.isBestCommit
            ? 'rgba(0, 0, 0, 1)'
            : color?.text;
    return `background-color: ${bgColor}; color: ${textColor}`;
};
const millisecondsFormatter = (ms: number | undefined) => {
    if (!ms) return '0h';
    return `${Math.ceil(ms / 1000 / 60 / 60)}h`;
};

const lookupData = computed(() => {
    const dataCache: { [key: string]: any } = {};
    return (year: number, targetDate: string) => {
        const cacheKey = `${year}-${targetDate}`;
        if (dataCache[cacheKey]) {
            return dataCache[cacheKey];
        }

        const yearData = props.events[year.toString()];
        if (!yearData) {
            return undefined;
        }

        const matchingDayData = yearData
            .flatMap((monthData: any) => monthData)
            .find((dayData: any) => dayData.date === targetDate);

        dataCache[cacheKey] = matchingDayData || undefined;
        return dataCache[cacheKey];
    };
});

let delayShowTimeout: ReturnType<typeof setTimeout>;
const clearShowTimer = () => clearTimeout(delayShowTimeout);
const delayShowContent = (index: string) => {
    clearShowTimer();

    delayShowTimeout = setTimeout(() => {
        hoveredMonthIndex.value = index;
    }, 500);
};

function getMonths(year: number) {
    const currentDate = new Date();
    if (currentDate.getFullYear() === year) {
        return Array.from(
            { length: currentDate.getMonth() + 1 },
            (_, i) => currentDate.getMonth() - i + 1,
        );
    }
    return Array.from({ length: 12 }, (_, i) => 12 - i);
}

function getMonthName(month: number) {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', { month: 'long' });
}

function generateDayBlocks(year: number, month: number) {
    const emptyDaysList = emptyDays(year, month);
    const daysList = daysInMonth(year, month);
    return emptyDaysList.concat(daysList);
}

function getDayData(year: number, month: number, day: number) {
    const targetDate = `${month}/${day}/${year}`;
    return lookupData.value(year, targetDate);
}

function hasData(year: number, month: number, day: number) {
    return getDayData(year, month, day) !== undefined;
}

// Keeps track of what years are current in the viewport
function visibilityChanged(isVisible: boolean, entry: HTMLInputEvent) {
    const { year: rawYear } = entry.target.dataset;
    const year = Number(rawYear);

    if (isVisible) {
        visibleYears.value = [year]; // Keep only the current year if it is visible
    } else {
        visibleYears.value = visibleYears.value.filter((item) => item !== year);
    }

    emit('updateVisibleYears', visibleYears.value);
}
</script>

<style lang="scss" scoped>
.meeting-dot {
    opacity: 0;
    transition: opacity 0.1s ease-in;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;

    &.visible {
        opacity: 1;
    }
}

.day-headers {
    top: 160px;
}

.day-block {
    height: 1.5rem;
    transition: height 0.3s ease-in-out;
}

.hovered .day-block {
    height: 4rem;
}
</style>
