import { describe, it, expect } from 'vitest';
import { colorScale } from '@/utils/colors';

describe('colorScale', () => {
    const event = {
        count: 0,
        duration: 0,
        date: new Date().toUTCString(),
        weekDay: 0,
    };
    it('should return the first color for a value of 0', () => {
        expect(colorScale({ ...event, count: 0 })).toEqual(
            'rgba(31,26,28, 0.8)',
        );
        expect(colorScale({ ...event, duration: 0 })).toEqual(
            'rgba(31,26,28, 0.8)',
        );
    });

    it('should return the second color for a value of 1-15', () => {
        expect(colorScale({ ...event, count: 3 })).toEqual(
            'rgba(189, 48, 57, 0.25)',
        );
        expect(colorScale({ ...event, duration: 1000 * 60 * 60 * 2 })).toEqual(
            'rgba(189, 48, 57, 0.25)',
        );
    });

    it('should return the third color for a value of 16-29', () => {
        expect(colorScale({ ...event, count: 16 })).toEqual(
            'rgba(189, 48, 57, 0.5)',
        );
        expect(colorScale({ ...event, duration: 1000 * 60 * 60 * 21 })).toEqual(
            'rgba(189, 48, 57, 0.5)',
        );
    });

    it('should return the fourth color for a value of 30-37', () => {
        expect(colorScale({ ...event, count: 35 })).toEqual(
            'rgba(189, 48, 57, 0.75)',
        );
        expect(colorScale({ ...event, duration: 1000 * 60 * 60 * 31 })).toEqual(
            'rgba(189, 48, 57, 0.75)',
        );
    });

    it('should return the fifth color for a value greater than 37', () => {
        expect(colorScale({ ...event, count: 40 })).toEqual(
            'rgba(189, 48, 57)',
        );
        expect(colorScale({ ...event, duration: 1000 * 60 * 60 * 38 })).toEqual(
            'rgba(189, 48, 57)',
        );
    });
});
