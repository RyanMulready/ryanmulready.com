import { describe, it, beforeEach, expect } from 'vitest';
import { useCalendarStore } from '@/stores/calendar';
import { setup, $fetch } from '@nuxt/test-utils-edge';
import { setActivePinia, createPinia } from 'pinia';

// @ts-ignore
global.$fetch = $fetch;

describe('Calendar Store', async () => {
    setActivePinia(createPinia());
    let calStore = useCalendarStore();

    // https://v3.nuxtjs.org/getting-started/testing/#setup
    await setup({
        // browser: true,
    });

    beforeEach(() => {
        setActivePinia(createPinia());
        calStore = useCalendarStore();
    });

    it('has the expected default state', () => {
        expect(calStore.meetings).toStrictEqual([]);
    });

    it('returns the expected default getter values', () => {
        expect(calStore.getMeetings).toStrictEqual([]);
    });

    // TODO: Mock API
    // it('modifies the state as expected', async () => {
    //     await calStore.fetchMeetings(2022);

    //     const meetings = calStore.getMeetings;

    //     expect(Object.keys(meetings).length > 0).toBeTruthy();
    // });
});
