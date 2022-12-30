// Returns Last 5 Years in an array desc order
export const yearsPast = (years: number) => {
    const now = new Date();
    const thisYear = now.getFullYear();

    return [thisYear, ...Array(years)].map((_, i) => thisYear - i);
};
