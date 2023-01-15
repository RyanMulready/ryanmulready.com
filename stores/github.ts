import { acceptHMRUpdate, defineStore } from 'pinia';
import { eventInterface, languagesInterface } from '@/types';

export const useGitHubStore = defineStore('ghStore', {
    state: () => ({
        contributions: [] as eventInterface[],
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
            const nodes = state.languages?.data?.user?.repositories?.nodes;
            if (nodes) {
                const parsedLangs: { [key: string]: string } = {};
                nodes.forEach((node) => {
                    const langs = node.languages.edges;

                    langs.forEach((lang) => {
                        const name = lang.node?.name;

                        if (name && lang.size) {
                            parsedLangs[name] = parsedLangs[name] || '0';
                            parsedLangs[name] = new Intl.NumberFormat(
                                'en-US',
                            ).format(
                                parseInt(parsedLangs[name], 10) + lang.size,
                            );
                        }
                    });
                });
                return parsedLangs;
            }
            return {};
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
        async fetchContributions(year: number) {
            let contributions: eventInterface;
            try {
                contributions = await $fetch(
                    `/api/github/contributions/${year}`,
                );

                this.contributions[year] = contributions;
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
