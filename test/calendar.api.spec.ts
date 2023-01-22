import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils-edge';

describe('Calendar API', async () => {
    // https://v3.nuxtjs.org/getting-started/testing/#setup
    await setup({
        // browser: true,
    });

    it('returns a 200 and data', async () => {
        let events;
        try {
            events = await $fetch('/api/calendar/2024');
        } catch (e) {}

        expect(events).toBeTruthy();
    });
});
