<template>
    <div>
        <Header
            :visible-year="visibleYears[0]"
            :years="years" />
        <Overlay
            :loading="loading"
            :ready="ready" />
        <DataGrid
            :events="events"
            :years="years"
            :filters="filtersStore.filters"
            @visible-years="visibleYears = $event" />

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, ref, computed } from 'vue';
import { useGitHubStore } from '@/stores/github';
import { useCalendarStore } from '@/stores/calendar';
import { useFiltersStore } from '@/stores/filters';
import { yearsPast } from '@/utils/dates';
import merge from 'lodash.merge';

// init our pinia store
const ghStore = useGitHubStore();
const calStore = useCalendarStore();
const filtersStore = useFiltersStore();
const visibleYears = ref([]);
const loading = ref(true);
const ready = ref(false);

// Has data from 2012->; 2018-> most significant
const startYear = new Date('01/01/2018 00:00');
const endYear = new Date();
const years = yearsPast(startYear, endYear);

// const eventType = ref<string>('contributions');
const events = computed(() =>
    merge(ghStore.getContributions, calStore.getMeetings),
);

// load page first then trigger fetch to fill data
onMounted(async () => {
    const loadingTimeline = gsap.timeline({ paused: true });
    // Loop over possible years and request data
    // Current year should be available first but isn't always
    await Promise.all(
        years.map(async (year) => {
            await ghStore.fetchContributions(year);
        }),
    );
    const dayBlocks = document.querySelectorAll('.data-block');
    gsap.to(dayBlocks, {
        opacity: 1,
        stagger: 0.0045,
        duration: 1,
    });
    loadingTimeline.play();
    ready.value = true;
    await Promise.all(
        years.map(async (year) => {
            await calStore.fetchMeetings(year);
        }),
    );

    // All data is finished loading
    loading.value = false;
});
</script>
