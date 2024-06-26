<template>
    <div>
        <Header
            :visible="dismissed"
            :visible-year="visibleYear" />
        <Overlay
            :loading="loading"
            :ready="ready"
            @dismissed="dismissed = true" />
        <Calendar
            v-if="filtersStore.filters.view == 'calendar'"
            :events="events"
            :years="currentYears"
            :filters="filtersStore.filters"
            @update-visible-years="updateVisibleYears" />
        <DataGrid
            v-if="filtersStore.filters.view == 'trail'"
            :events="events"
            :years="currentYears"
            :filters="filtersStore.filters"
            @update-visible-years="updateVisibleYears" />

        <Filters :years="possibleYears" />
        <About />
        <Contact />
        <Footer :visible="dismissed" />
        <SpeedInsights />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
import { useGitHubStore } from '@/stores/github';
import { useBitbucketStore } from '@/stores/bitbucket';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltersStore } from '@/stores/filters';
import { yearsPast } from '@/utils/dates';
import mergeWith from 'lodash.mergewith';

// init our pinia store
const ghStore = useGitHubStore();
const bbStore = useBitbucketStore();
const calStore = useCalendarStore();
const filtersStore = useFiltersStore();
const loading = ref(true);
const ready = ref(false);
const dismissed = ref(false);

// Has data from 2012->; 2018-> most significant
const startYear = new Date('01/01/2018 00:00');
const lastPossibleYear = new Date();
const currentEndYear = computed(
    () => new Date(`01/01/${filtersStore.filters.lastYear} 00:00`),
);
const possibleYears = yearsPast(startYear, lastPossibleYear);
const currentYears = computed(() => yearsPast(startYear, currentEndYear.value));
const visibleYear = ref(possibleYears[0]);

const updateVisibleYears = (years: Array<number>) => {
    if (years.length > 0 && currentYears.value.includes(years[0])) {
        [visibleYear.value] = years;
    } else if (currentYears.value.length > 0) {
        [visibleYear.value] = currentYears.value;
    }
};
watch(
    () => filtersStore.filters.lastYear,
    (newYear, oldYear) => {
        if (newYear !== oldYear) {
            updateVisibleYears([newYear]);
        }
    },
);

const customMerge = (objValue: any, srcValue: any, key: string | undefined) => {
    if (
        key === 'commits' &&
        typeof objValue === 'number' &&
        typeof srcValue === 'number'
    ) {
        return objValue + srcValue;
    }
    // If not a number, let lodash handle the merge
    return undefined;
};

const events = computed(() => {
    const data = mergeWith(
        {},
        ghStore.getContributions,
        bbStore.getContributions,
        calStore.getMeetings,
        customMerge,
    );
    return data;
});

// load page first then trigger fetch to fill data
onMounted(async () => {
    // Loop over possible years and request data
    // Current year should be available first but isn't always
    await Promise.all(
        currentYears.value.map(async (year) => {
            await ghStore.fetchContributions(year);
        }),
    );
    await Promise.all(
        currentYears.value.map(async (year) => {
            await bbStore.fetchContributions(year);
        }),
    );
    ready.value = true;
    await Promise.all(
        currentYears.value.map(async (year) => {
            await calStore.fetchMeetings(year);
        }),
    );

    // All data is finished loading
    loading.value = false;
});
</script>
