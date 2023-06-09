import { describe, it, expect } from 'vitest';
import { commitsColorScale } from '@/utils/colors';

describe('commitsColorScale', () => {
    const event = {
        count: 0,
        duration: 0,
        date: new Date().toUTCString(),
        weekDay: 0,
    };
    it('returns first color if no commits data is provided', () => {
        expect(commitsColorScale({ ...event })).toEqual('rgba(31,26,28, 0.8)');
    });

    it('returns second color if less than or equal to 15 commits', () => {
        expect(commitsColorScale({ ...event, commits: 15 })).toEqual(
            'rgba(189, 48, 57, 0.25)',
        );
    });

    it('returns third color if less than or equal to 29 commits', () => {
        expect(commitsColorScale({ ...event, commits: 29 })).toEqual(
            'rgba(189, 48, 57, 0.5)',
        );
    });

    it('returns fourth color if less than or equal to 37 commits', () => {
        expect(commitsColorScale({ ...event, commits: 37 })).toEqual(
            'rgba(189, 48, 57, 0.75)',
        );
    });

    it('returns fifth color if more than 37 commits', () => {
        expect(commitsColorScale({ ...event, commits: 50 })).toEqual(
            'rgba(189, 48, 57)',
        );
    });
});
