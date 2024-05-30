export function millisecondsToHours(milli: number | undefined) {
    if (!milli) {
        return {
            seconds: 0,
            minutes: 0,
            hours: 0,
        };
    }
    const seconds = Math.floor(milli / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return {
        seconds,
        minutes,
        hours,
    };
}

export function meetingsSizeScale(dayData: eventInterface) {
    const value = dayData.duration;
    const time = millisecondsToHours(value);
    let size = 0;

    if (time.hours >= 1) {
        // max = 1; min = 0.1 to keep size "normal"
        size = Math.min(Math.max(time.hours / 8, 0.1), 1);
    }

    return {
        ...time,
        size,
    };
}
