// TODO : Why does eslint blow up when we import vitest
import { describe, it, beforeEach, expect } from 'vitest';
import { useGitHubStore } from '@/stores/github';
import { setup, $fetch } from '@nuxt/test-utils-edge';
import { setActivePinia, createPinia } from 'pinia';

// @ts-ignore
global.$fetch = $fetch;

describe('Github Store', async () => {
    let github;

    // https://v3.nuxtjs.org/getting-started/testing/#setup
    await setup({
        // browser: true,
    });

    beforeEach(() => {
        setActivePinia(createPinia());
        github = useGitHubStore();
    });

    it('has the expected default state', () => {
        expect(github.languages).toStrictEqual({
            data: { user: { repositories: { nodes: [] } } },
        });
        expect(github.contributions).toStrictEqual({
            data: {
                user: {
                    contributionsCollection: {
                        contributionCalendar: {
                            totalContributions: 0,
                            weeks: [],
                        },
                    },
                },
            },
        });
    });

    it('returns the expected default getter values', () => {
        expect(github.getLanguages).toStrictEqual({});
        expect(github.getContributions).toStrictEqual([]);
    });

    it('modifies the state as expected', async () => {
        await github.fetchLanguages();
        await github.fetchContributions();
        // TODO: What should be checked for here? Data is too variable to be exact
    });
});
