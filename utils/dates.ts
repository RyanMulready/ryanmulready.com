// Returns Last 5 Years in an array desc order
export const yearsPast = () => {
    const years = 4; // number of years prior to this year
    const now = new Date();
    const thisYear = now.getFullYear();

    return [thisYear, ...Array(years)].map((_, i) => thisYear - i);
};
