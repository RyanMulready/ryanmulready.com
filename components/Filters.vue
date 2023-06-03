<template>
    <div>
        <input
            id="modal-filters"
            type="checkbox"
            autocomplete="off"
            class="modal-toggle" />
        <label
            for="modal-filters"
            class="modal modal-bottom sm:modal-middle cursor-pointer">
            <label
                class="modal-box relative"
                for="">
                <label
                    for="modal-filters"
                    class="p-3 absolute right-2 top-2 text-accent font-bold cursor-pointer">
                    ✕
                </label>
                <h2 class="text-white mb-5">Here's what you can adjust</h2>

                <div class="flex items-center gap-4 mb-5 mr-2">
                    <label
                        class="block w-1/5"
                        for="view">
                        View
                    </label>

                    <select
                        v-model="filtersStore.filters.view"
                        class="select select-accent bg-neutral w-4/5 md:ml-12 ml-5"
                        name="view">
                        <option
                            value="trail"
                            selected>
                            Trail
                        </option>
                        <option value="calendar">Calendar</option>
                    </select>
                </div>
                <div class="flex items-center gap-4 mb-5">
                    <label
                        class="block w-1/5"
                        for="view">
                        Years
                    </label>
                    <div class="w-4/5">
                        <input
                            v-if="reversedYears.length"
                            v-model="filtersStore.filters.lastYear"
                            type="range"
                            :max="reversedYears[reversedYears.length - 1]"
                            :min="reversedYears[0]"
                            class="range range-accent"
                            step="1" />
                        <div class="w-full flex justify-between text-xs">
                            <span
                                v-for="year in reversedYears"
                                :key="year"
                                class="text-center">
                                {{ year }}
                            </span>
                        </div>
                    </div>
                </div>

                <h3 class="border-b border-base-200">Highlights</h3>
                <div class="grid grid-cols-2">
                    <div class="form-control">
                        <label
                            class="cursor-pointer label flex-wrap justify-center">
                            <span
                                class="label-text w-full text-center mb-2 text-meetings">
                                meetings
                            </span>
                            <input
                                v-model="filtersStore.filters.meetings"
                                type="checkbox"
                                class="toggle toggle-accent" />
                        </label>
                    </div>
                    <div class="form-control">
                        <label
                            class="cursor-pointer label flex-wrap justify-center">
                            <span
                                class="label-text w-full text-center mb-2 text-best">
                                best
                            </span>
                            <input
                                v-model="filtersStore.filters.best"
                                type="checkbox"
                                class="toggle toggle-accent" />
                        </label>
                    </div>
                </div>
            </label>
        </label>
    </div>
</template>
<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useFiltersStore } from '@/stores/filters';

const props = defineProps({
    years: {
        type: Array as PropType<Array<number>>,
        required: false,
        default: () => [],
    },
});

// init our pinia store
const filtersStore = useFiltersStore();
// Reverse the years for range display
const reversedYears = computed(() => [...props.years].reverse());
</script>
