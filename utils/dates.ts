import { eventInterface } from '@/types';

// Returns Last 5 Years in an array desc order
export const yearsPast = (years: number) => {
    const now = new Date();
    const thisYear = now.getFullYear();

    return [thisYear, ...Array(years)].map((_, i) => thisYear - i);
};

// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function getWeek() {
    const janFirst = new Date(this.getFullYear(), 0, 1);
    // Returns week index; does not follow ISO 1806
    // Jan 1st is always week 0
    return (
        Math.ceil(
            ((this.getTime() - janFirst.getTime()) / 86400000 +
                janFirst.getDay() +
                1) /
                7,
        ) - 1
    );
};

export const yearSchema = (to: Date, from: Date) => {
    const events: eventInterface[][] = new Array(53).fill([]);
    const currentDate = from;

    while (currentDate <= to) {
        const weekIndex = currentDate.getWeek();
        const currentDateString = currentDate.toLocaleDateString();
        events[weekIndex].push({
            date: currentDateString,
            weekDay: currentDate.getDay(),
            count: 0,
            duration: 0,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return events;
};
