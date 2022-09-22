import { acceptHMRUpdate, defineStore } from 'pinia';
import { contributionsInterface, languagesInterface } from '@/types';

export const useGitHubStore = defineStore('ghStore', {
    state: () => ({
        contributions: {
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
        } as contributionsInterface,
        languages: {
            data: {
                user: {
                    repositories: {
                        nodes: [],
                    },
                },
            },
        } as languagesInterface,
    }),
    getters: {
        getContributions: (state) => {
            // TODO: Flatten even more
            const { weeks } =
                state.contributions.data.user.contributionsCollection
                    .contributionCalendar;
            return weeks;
        },
        getLanguages: (state) => {
            const { nodes } = state.languages.data.user.repositories;
            const parsedLangs = {};
            nodes.forEach((node) => {
                const langs = node.languages.edges;

                langs.forEach((lang) => {
                    const name = lang.node?.name;

                    if (name && lang.size) {
                        parsedLangs[name] = parsedLangs[name] || 0;
                        parsedLangs[name] = new Intl.NumberFormat(
                            'en-US',
                        ).format(parseInt(parsedLangs[name], 10) + lang.size);
                    }
                });
            });
            return parsedLangs;
        },
    },
    actions: {
        async fetchLanguages() {
            let languages = {};
            try {
                languages = await $fetch('/api/github/langs');
                this.languages = languages;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        },
        async fetchContributions(year: number = new Date().getFullYear()) {
            let contributions = {};
            try {
                contributions = await $fetch(
                    `/api/github/contributions/${year}`,
                );
                this.contributions = contributions;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGitHubStore, import.meta.hot));
}
