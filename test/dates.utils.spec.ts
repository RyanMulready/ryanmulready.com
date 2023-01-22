import { describe, it, expect } from 'vitest';
import { yearSchema, yearsPast } from '@/utils/dates';

describe('getWeek', () => {
    it('returns a valid week index', () => {
        const date = new Date('2022-01-01 00:00');
        const week = date.getWeek();
        expect(week).toEqual(0);
    });

    it('returns a date that is not in the first week of the year', () => {
        const date = new Date('2022-01-10 00:00');
        const week = date.getWeek();
        expect(week).toEqual(2);
    });

    it('returns a date in a different year', () => {
        const date = new Date('2023-12-31 00:00');
        const week = date.getWeek();
        expect(week).toEqual(52);
    });

    it('returns a date that is not a Monday', () => {
        const date = new Date('2022-01-08 00:00');
        const week = date.getWeek();
        expect(week).toEqual(1);
    });

    it('returns a date that is not a Sunday', () => {
        const date = new Date('2022-01-09 00:00');
        const week = date.getWeek();
        expect(week).toEqual(2);
    });
});

describe('yearsPast', () => {
    it('should return an array of the specified length', () => {
        expect(yearsPast(0).length).toBe(1);
        expect(yearsPast(1).length).toBe(2);
        expect(yearsPast(5).length).toBe(6);
    });

    it('should start with the current year', () => {
        const currentYear = new Date().getFullYear();
        expect(yearsPast(5)[0]).toBe(currentYear);
    });

    it('should end with the current year minus the number of years specified', () => {
        const currentYear = new Date().getFullYear();
        expect(yearsPast(5)[5]).toBe(currentYear - 5);
    });

    it('should return a decreasing list of years', () => {
        const currentYear = new Date().getFullYear();
        const result = yearsPast(5);
        for (let i = 1; i < result.length; i += 1) {
            expect(result[i]).toBe(currentYear - i);
        }
    });
});

describe('yearSchema', () => {
    it('should return an array of 52 or 53 arrays', () => {
        const year2020 = new Date('2020-01-01 00:00');
        const year2021 = new Date('2021-01-01 00:00');
        const year2022 = new Date('2022-01-01 00:00');
        const year2023 = new Date('2023-01-01 00:00');

        expect(yearSchema(year2021, year2020).length).toBe(53);
        expect(yearSchema(year2022, year2021).length).toBe(53);
        expect(yearSchema(year2023, year2022).length).toBe(53);
    });
    it('should return the expected number of events for a year', () => {
        const year2020 = new Date('2020-01-01 00:00');
        const year2021 = new Date('2021-01-01 00:00');
        const year2022 = new Date('2022-01-01 00:00');
        const year2023 = new Date('2023-01-01 00:00');

        expect(yearSchema(year2021, year2020).flat().length).toBe(367);
        expect(yearSchema(year2022, year2021).flat().length).toBe(366);
        expect(yearSchema(year2023, year2022).flat().length).toBe(366);
    });
    it('should return events array with the expected properties', () => {
        const year2021 = new Date(2021, 0, 1);
        const events = yearSchema(year2021, year2021).flat();
        expect(events[0]).toEqual(
            expect.objectContaining({
                date: '1/1/2021',
                weekDay: 5,
                count: 0,
                duration: 0,
            }),
        );
    });
});
