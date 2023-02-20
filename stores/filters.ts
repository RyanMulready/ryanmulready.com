import { acceptHMRUpdate, defineStore } from 'pinia';

export interface filtersInterface {
    view: 'trail' | 'columns';
    lastYear: number;
    meetings: boolean;
    streaks: boolean;
    best: boolean;
}

export const useFiltersStore = defineStore('filtersStore', {
    state: () => ({
        filters: {
            view: 'trail',
            lastYear: new Date().getFullYear(),
            meetings: false,
            streaks: false,
            best: false,
        },
    }),
    actions: {
        updateFilters(filters: filtersInterface) {
            this.filters = {
                ...this.filters,
                ...filters,
            };
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFiltersStore, import.meta.hot));
}
