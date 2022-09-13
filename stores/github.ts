import { acceptHMRUpdate, defineStore } from 'pinia';

export const useGitHubStore = defineStore('ghStore', {
    state: () => ({
        contributions: {
            data: {
                user: {
                    contributionsCollection: {
                        contributionCalendar: {
                            totalContributions: <number>0,
                            weeks: <
                                {
                                    contributionDays: {
                                        color: string;
                                        contributionCount: number;
                                        date: string;
                                        weekday: number;
                                    };
                                }[]
                            >[],
                        },
                    },
                },
            },
        },
        languages: {
            data: {
                user: {
                    repositories: {
                        nodes: <
                            {
                                isPrivate: boolean;
                                nameWithOwner: string;
                                languages: {
                                    edges: {
                                        size: number;
                                        node: {
                                            name: string;
                                            color: string;
                                        };
                                    }[];
                                    pageInfo: object;
                                    totalCount: number;
                                };
                            }[]
                        >[],
                    },
                },
            },
        },
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
                console.log(e);
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGitHubStore, import.meta.hot));
}
