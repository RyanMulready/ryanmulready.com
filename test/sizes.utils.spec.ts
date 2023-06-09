import { eventInterface } from '@/types';
import { describe, it, expect } from 'vitest';
import { millisecondsToHours, meetingsSizeScale } from '@/utils/sizes';

describe('millisecondsToHours', () => {
    it('should return 0 for undefined input', () => {
        expect(millisecondsToHours(undefined)).toEqual({
            seconds: 0,
            minutes: 0,
            hours: 0,
        });
    });

    it('should convert milliseconds to other interervals', () => {
        expect(millisecondsToHours(3600000)).toEqual({
            seconds: 3600,
            minutes: 60,
            hours: 1,
        });
        expect(millisecondsToHours(7200000)).toEqual({
            seconds: 7200,
            minutes: 120,
            hours: 2,
        });
    });
});

describe('meetingsSizeScale', () => {
    const defaultEvent: eventInterface = {
        date: '01/01/2020',
        weekDay: 0,
    };
    it('should return size of 0 for events under an hour', () => {
        const event: eventInterface = { ...defaultEvent, duration: 1800000 }; // 30 minutes
        expect(meetingsSizeScale(event).size).toBe(0);
    });

    it('should return size between 0.1 and 1 for events between 1 and 8 hours', () => {
        const event1: eventInterface = { ...defaultEvent, duration: 3600000 }; // 1 hour
        expect(meetingsSizeScale(event1).size).toBeGreaterThan(0);
        expect(meetingsSizeScale(event1).size).toBeLessThanOrEqual(1);

        const event2: eventInterface = { ...defaultEvent, duration: 7200000 }; // 2 hours
        expect(meetingsSizeScale(event2).size).toBeGreaterThan(0);
        expect(meetingsSizeScale(event2).size).toBeLessThanOrEqual(1);

        const event3: eventInterface = { ...defaultEvent, duration: 28800000 }; // 8 hours
        expect(meetingsSizeScale(event3).size).toBeGreaterThan(0);
        expect(meetingsSizeScale(event3).size).toBeLessThanOrEqual(1);
    });

    it('should return size of 1 for events over 8 hours', () => {
        const event: eventInterface = { ...defaultEvent, duration: 36000000 }; // 10 hours
        expect(meetingsSizeScale(event).size).toBe(1);
    });
});
