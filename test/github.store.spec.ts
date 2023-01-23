import { describe, it, beforeEach, expect } from 'vitest';
import { useGitHubStore } from '@/stores/github';
import { setup, $fetch } from '@nuxt/test-utils-edge';
import { setActivePinia, createPinia } from 'pinia';

// @ts-ignore
global.$fetch = $fetch;

describe('Github Store', async () => {
    setActivePinia(createPinia());
    let githubStore = useGitHubStore();

    // https://v3.nuxtjs.org/getting-started/testing/#setup
    await setup({
        // browser: true,
    });

    beforeEach(() => {
        setActivePinia(createPinia());
        githubStore = useGitHubStore();
    });

    it('has the expected default state', () => {
        expect(githubStore.languages).toStrictEqual({
            data: { user: { repositories: { nodes: [] } } },
        });
        expect(githubStore.contributions).toStrictEqual([]);
    });

    it('returns the expected default getter values', () => {
        expect(githubStore.getLanguages).toStrictEqual({});
        expect(githubStore.getContributions).toStrictEqual([]);
    });

    // TODO: Mock API
    // it('modifies the state as expected', async () => {
    //     await githubStore.fetchLanguages();
    //     await githubStore.fetchContributions(2022);

    //     const languages = githubStore.getLanguages;
    //     const contributions = githubStore.getContributions;

    //     expect(Object.keys(languages).length > 0).toBeTruthy();
    //     expect(Object.keys(contributions).length > 0).toBeTruthy();
    // });
});
