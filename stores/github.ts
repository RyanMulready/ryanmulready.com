import { acceptHMRUpdate, defineStore } from 'pinia';

export const useGitHubStore = defineStore('ghStore', {
    state: () => ({
        n: 2,
        incrementedTimes: 0,
        decrementedTimes: 0,
        numbers: [] as number[],
    }),
    actions: {
        async fetchContributions() {
            const test = await $fetch('/api/github/contributions/2022');
            console.log(test);
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGitHubStore, import.meta.hot));
}
