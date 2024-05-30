import { commitsColorScale } from '@/utils/colors';

describe('commitsColorScale', () => {
    const event = {
        count: 0,
        duration: 0,
        date: new Date().toUTCString(),
        weekDay: 0,
        commits: 0,
    };

    it('returns object with appropriate background and text colors for low number of commits', () => {
        expect(commitsColorScale({ ...event, commits: 3 })).toEqual({
            bg: 'rgba(189, 48, 57, 0.25)',
            text: 'rgba(255, 255, 255, 1)',
        });
        expect(commitsColorScale({ ...event, commits: 15 })).toEqual({
            bg: 'rgba(189, 48, 57, 0.5)',
            text: 'rgba(255, 255, 255, 1)',
        });
        expect(commitsColorScale({ ...event, commits: 25 })).toEqual({
            bg: 'rgba(189, 48, 57, 0.75)',
            text: 'rgba(255, 255, 255, 1)',
        });
    });

    it('returns object with appropriate background and text colors for high number of commits', () => {
        expect(commitsColorScale({ ...event, commits: 50 })).toEqual({
            bg: 'rgba(189, 48, 57)',
            text: 'rgba(255, 255, 255, 1)',
        });
        expect(commitsColorScale({ ...event, commits: 90 })).toEqual({
            bg: 'rgba(189, 48, 57)',
            text: 'rgba(255, 255, 255, 1)',
        });
    });

    it('returns object with appropriate background and text colors for low number of commits in dark mode', () => {
        expect(commitsColorScale({ ...event, commits: 3 }, true)).toEqual({
            bg: 'rgba(255, 255, 255, 0.25)',
            text: 'rgba(0, 0, 0, 1)',
        });
        expect(commitsColorScale({ ...event, commits: 15 }, true)).toEqual({
            bg: 'rgba(255, 255, 255, 0.5)',
            text: 'rgba(0, 0, 0, 1)',
        });
        expect(commitsColorScale({ ...event, commits: 25 }, true)).toEqual({
            bg: 'rgba(255, 255, 255, 0.75)',
            text: 'rgba(0, 0, 0, 1)',
        });
    });

    it('returns object with appropriate background and text colors for high number of commits in dark mode', () => {
        expect(commitsColorScale({ ...event, commits: 50 }, true)).toEqual({
            bg: 'rgba(255, 255, 255, 1)',
            text: 'rgba(0, 0, 0, 1)',
        });
        expect(commitsColorScale({ ...event, commits: 90 }, true)).toEqual({
            bg: 'rgba(255, 255, 255, 1)',
            text: 'rgba(0, 0, 0, 1)',
        });
    });
});
