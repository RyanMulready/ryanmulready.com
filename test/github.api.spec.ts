import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils-edge';

describe('Github API', async () => {
    // https://v3.nuxtjs.org/getting-started/testing/#setup
    await setup({
        // browser: true,
    });

    it('returns a 200 and data for languages', async () => {
        let languages;
        try {
            languages = await $fetch('/api/github/langs');
        } catch (e) {}

        expect(languages.data).toBeTruthy();
    });

    it('returns a 200 and data for contributions', async () => {
        let contributions;
        try {
            contributions = await $fetch('/api/github/contributions/2021');
        } catch (e) {}

        expect(contributions).toBeTruthy();
    });
});
