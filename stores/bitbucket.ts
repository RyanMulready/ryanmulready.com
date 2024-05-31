import { acceptHMRUpdate, defineStore } from 'pinia';

export const useBitbucketStore = defineStore('bbStore', {
    state: () => ({
        contributions: {} as yearsInterface,
    }),
    getters: {
        getContributions: (state) => {
            return state.contributions;
        },
    },
    actions: {
        async fetchContributions(year: number) {
            let contributions: eventInterface;
            try {
                contributions = await $fetch(
                    `/api/bitbucket/contributions/${year}`,
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
    import.meta.hot.accept(acceptHMRUpdate(useBitbucketStore, import.meta.hot));
}
