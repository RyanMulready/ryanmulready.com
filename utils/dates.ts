// Returns an array of years between two dates
export const yearsPast = (startYear: Date, endYear: Date): number[] => {
    const start = startYear.getFullYear();
    const end = endYear.getFullYear();

    return Array.from({ length: end - start + 1 }, (_, i) => end - i);
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
    const events: eventInterface[][] = [];
    let currentDate = from;

    while (currentDate <= to) {
        const weekIndex = currentDate.getWeek();
        const currentDateString = currentDate.toLocaleDateString();
        events[weekIndex] = events[weekIndex] || [];
        events[weekIndex].push({
            date: currentDateString,
            weekDay: currentDate.getDay(),
        });
        const newDate = currentDate.setDate(currentDate.getDate() + 1);
        currentDate = new Date(newDate);
    }

    return events;
};

export function ordinalSuffixOf(i: number): string {
    // Determine the units and tens places of the number.
    const units = i % 10;
    const tens = i % 100;

    // Check for the special cases of 11, 12 and 13.
    if (tens >= 11 && tens <= 13) {
        return `${i}th`;
    }

    // Use 'st', 'nd', 'rd' or 'th' depending on the units place of the number.
    switch (units) {
        case 1:
            return `${i}st`;
        case 2:
            return `${i}nd`;
        case 3:
            return `${i}rd`;
        default:
            return `${i}th`;
    }
}
