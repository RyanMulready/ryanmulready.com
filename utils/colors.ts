import { eventInterface } from '@/types';

export function commitsColorScale(dayData: eventInterface) {
    const colors = [
        'rgba(31,26,28, 0.8)',
        'rgba(189, 48, 57, 0.25)',
        'rgba(189, 48, 57, 0.5)',
        'rgba(189, 48, 57, 0.75)',
        'rgba(189, 48, 57)',
    ];
    const value = dayData?.commits;

    if (!value) return colors[0];
    if (value <= 15) return colors[1];
    if (value <= 29) return colors[2];
    if (value <= 37) return colors[3];

    return colors[4];
}
