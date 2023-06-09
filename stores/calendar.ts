import { acceptHMRUpdate, defineStore } from 'pinia';
import { eventInterface, yearsInterface } from '@/types';

export const useCalendarStore = defineStore('calStore', {
    state: () => ({
        meetings: {} as yearsInterface,
    }),
    getters: {
        getMeetings: (state) => {
            return state.meetings;
        },
    },
    actions: {
        async fetchMeetings(year: number) {
            let meetings: eventInterface;
            try {
                meetings = await $fetch(`/api/calendar/${year}`);

                this.meetings[year] = meetings;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
            }
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot));
}
