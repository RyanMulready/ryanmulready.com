import { useFiltersStore } from '@/stores/filters';
import { setup } from '@nuxt/test-utils';
import { setActivePinia, createPinia } from 'pinia';

describe('useFiltersStore', async () => {
    setActivePinia(createPinia());
    let store = useFiltersStore();

    // https://v3.nuxtjs.org/getting-started/testing/#setup
    await setup({
        // browser: true,
    });

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useFiltersStore();
    });

    it('initializes with default filters', () => {
        expect(store.filters).toEqual({
            view: 'trail',
            lastYear: new Date().getFullYear(),
            meetings: false,
            streaks: false,
            best: false,
        });
    });

    it('updates filters correctly', () => {
        const newFilters: filtersInterface = {
            view: 'columns',
            lastYear: 2022,
            meetings: true,
            streaks: true,
            best: true,
        };

        store.updateFilters(newFilters);

        expect(store.filters).toEqual(newFilters);
    });
});
