<template>
    <div>
        <Header :visible-year="visibleYears[0]" />
        <Overlay
            :loading="loading"
            :ready="ready" />
        <DataGrid
            :events="events"
            :years="years"
            @visible-years="visibleYears = $event" />

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useGitHubStore } from '@/stores/github';
import { useCalendarStore } from '@/stores/calendar';
import { yearsPast } from '@/utils/dates';

// init our pinia store
const ghStore = useGitHubStore();
const calStore = useCalendarStore();
const visibleYears = ref([]);
const loading = ref(true);
const ready = ref(false);

// Has data from 2012->; 2018-> most significant
// Has data from 2012->; 2018-> most significant
const startYear = new Date('01/01/2018 00:00');
const endYear = new Date();
const yearsSince = Math.abs(startYear.getFullYear() - endYear.getFullYear());
const years = yearsPast(yearsSince);

const eventType = ref<string>('contributions');
const events = computed(() => {
    return eventType.value === 'contributions'
        ? ghStore.getContributions
        : calStore.getMeetings;
});

// load page first then trigger fetch to fill data
onMounted(async () => {
    const loadingDelay = 3000;
    // Loop over possible years and request data
    // Current year should be available first but isn't always
    years.forEach(async (year) => {
        await ghStore.fetchContributions(year);

        // TODO: Where's the right hook?
        setTimeout(() => {
            ready.value = true;
        }, loadingDelay);
    });
    years.forEach(async (year) => {
        await calStore.fetchMeetings(year);
    });

    // TODO: Where's the right hook?
    setTimeout(() => {
        loading.value = false;
    }, loadingDelay);
});
</script>
