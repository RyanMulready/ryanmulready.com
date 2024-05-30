export function commitsColorScale(dayData: eventInterface, dark = false) {
    let colors = [];
    let text = '';

    if (dark) {
        colors = [
            'rgba(31,26,28, 0.8)',
            'rgba(255, 255, 255, 0.25)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(255, 255, 255, 0.75)',
            'rgba(255, 255, 255, 1)',
        ];
    } else {
        colors = [
            'rgba(31,26,28, 0.8)',
            'rgba(189, 48, 57, 0.25)',
            'rgba(189, 48, 57, 0.5)',
            'rgba(189, 48, 57, 0.75)',
            'rgba(189, 48, 57)',
        ];
    }

    const value = dayData?.commits;
    // 0 - 4 commits
    let bg = colors[0];

    if (value) {
        // 1 - 4 commits
        if (value <= 5) {
            [, bg] = colors;
        } else if (value <= 15) {
            [, , bg] = colors;
        } else if (value <= 30) {
            [, , , bg] = colors;
        } else {
            [, , , , bg] = colors;
        }
    }

    // Extract the RGB values
    const rgb = bg.match(/\d+/g)?.map(Number);

    if (!rgb) return { bg, text };

    // Calculate the perceived brightness
    const brightness = Math.round(
        (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000,
    );

    // Determine text color based on the brightness
    text = brightness > 125 ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)';

    return { bg, text };
}
