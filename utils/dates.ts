// Returns Last 5 Years in an array desc order
export const yearsPast = (years: number) => {
    const now = new Date();
    const thisYear = now.getFullYear();

    return [thisYear, ...Array(years)].map((_, i) => thisYear - i);
};

export const yearObject = (to: Date, from: Date) => {
    const events: any = {};
    let currentDate = to;

    while (currentDate >= from) {
        events[currentDate.toLocaleDateString().toString()] = {
            totalDuration: 0,
            events: [],
        };
        const newDate = currentDate.setDate(currentDate.getDate() - 1);
        currentDate = new Date(newDate);
    }

    return events;
};
