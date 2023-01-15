import { eventInterface } from '@/types';

export function colorScale(dayData: eventInterface) {
    const colors = [
        'rgba(31,26,28, 0.8)',
        'rgba(189, 48, 57, 0.25)',
        'rgba(189, 48, 57, 0.5)',
        'rgba(189, 48, 57, 0.75)',
        'rgba(189, 48, 57)',
    ];

    // TODO: Optimize this nonsense
    if (!dayData.duration) {
        if (dayData.count >= 1 && dayData.count <= 7) {
            return colors[1];
        }
        if (dayData.count >= 8 && dayData.count <= 15) {
            return colors[1];
        }
        if (dayData.count >= 22 && dayData.count <= 29) {
            return colors[2];
        }
        if (dayData.count >= 30 && dayData.count <= 37) {
            return colors[3];
        }
        if (dayData.count >= 38) {
            return colors[4];
        }
        return colors[0];
    }
    const hours = Math.floor(dayData.duration / 1000 / 60 / 60);

    if (hours >= 1 && hours <= 3) {
        return colors[1];
    }
    if (hours >= 4 && hours <= 5) {
        return colors[2];
    }
    if (hours >= 6 && hours <= 7) {
        return colors[3];
    }
    if (hours >= 8) {
        return colors[4];
    }
    return colors[0];
}
