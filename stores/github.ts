import { acceptHMRUpdate, defineStore } from 'pinia';
import {
    contributionsInterface,
    contributionResponse,
    languagesInterface,
} from '@/types';
import { yearsPast } from '@/utils/dates';

export const useGitHubStore = defineStore('ghStore', {
    state: () => ({
        contributions: {} as contributionsInterface,
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
            return state.contributions;
        },
        getLanguages: (state) => {
            // TODO: Do this transformation prior to saving in store
            const { nodes } = state.languages.data.user.repositories;
            const parsedLangs: { [key: string]: string } = {};
            nodes.forEach((node) => {
                const langs = node.languages.edges;

                langs.forEach((lang) => {
                    const name = lang.node?.name;

                    if (name && lang.size) {
                        parsedLangs[name] = parsedLangs[name] || '0';
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
            let languages: languagesInterface;
            try {
                languages = await $fetch('/api/github/langs');
                this.languages = languages;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        },
        async fetchContributions() {
            const years = yearsPast();
            const yearTransaction = async (year: number) => {
                const response: contributionResponse = await $fetch(
                    `/api/github/contributions/${year}`,
                );

                const data: contributionsInterface = {};
                data[year] =
                    response.data.user.contributionsCollection.contributionCalendar;
                return data;
            };

            // Transform the data into something more parseable
            // Output is an object with a year as keys
            let contributions: contributionsInterface;
            try {
                const transactions = await Promise.all(
                    years.map((year) => yearTransaction(year)),
                );
                contributions = transactions.reduce((obj, item) => {
                    const year = Object.keys(item);
                    return {
                        ...obj,
                        [year as any]: item[year as any],
                    };
                }, {});
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
