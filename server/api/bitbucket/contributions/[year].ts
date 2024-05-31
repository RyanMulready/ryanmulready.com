import { defineEventHandler, createError } from 'h3';
import { yearSchema } from '@/utils/dates';
import path from 'path';
import fs from 'fs';

const loadJSON = (jsonPath: string) => {
    const fileExists = fs.existsSync(new URL(jsonPath, import.meta.url));
    if (!fileExists) {
        return [];
    }
    return JSON.parse(
        fs.readFileSync(new URL(jsonPath, import.meta.url)).toString(),
    );
};

export default defineEventHandler(async (event) => {
    const year = event.context.params?.year || new Date().getFullYear();
    const today = new Date();
    const from = new Date(`01/01/${year}`);

    let to = new Date(`12/31/${year}`);
    if (year === today.getFullYear().toString()) {
        to = new Date(
            today.setDate(today.getDate() + ((6 + (7 - today.getDay())) % 7)),
        );
    }

    const bitbucketData = await loadJSON(
        path.resolve(`server/api/bitbucket/contributions/${year}.json`),
    );

    try {
        const events = yearSchema(to, from);

        let bestCommits = 0;
        const bestCommitsIndexes: number[][] = [];

        bitbucketData.forEach((day: { date: string }) => {
            const start = new Date(day.date);
            const weekIndex = start.getWeek();
            const eventDate = start.toLocaleDateString().toString();
            const existingIndex = events[weekIndex]?.findIndex(
                (eventItem) => eventItem.date === eventDate,
            );

            if (existingIndex !== undefined && weekIndex !== undefined) {
                const existingData = events[weekIndex][existingIndex];
                const commits = (existingData.commits || 0) + 1;
                const isBestCommit = commits > bestCommits;

                events[weekIndex][existingIndex] = {
                    ...events[weekIndex][existingIndex],
                    commits,
                    isBestCommit,
                };

                if (commits > bestCommits) {
                    // If this day has more commits than previous max, update max
                    bestCommits = commits;

                    // Also clear isbestCommits for any previous max day
                    bestCommitsIndexes.forEach(
                        ([weekIndexInnter, dayIndex]) => {
                            events[weekIndexInnter][dayIndex].isBestCommit =
                                false;
                        },
                    );

                    // Update bestCommitsIndexes to hold the new index
                    bestCommitsIndexes.length = 0;
                    bestCommitsIndexes.push([weekIndex, existingIndex]);
                } else if (isBestCommit) {
                    // If this day has the same number of commits as the previous max,
                    // add its index to bestCommitsIndexes
                    bestCommitsIndexes.push([weekIndex, existingIndex]);
                }
            }
        });

        // Set isbestCommit to true for all indexes in bestCommitsIndexes
        bestCommitsIndexes.forEach(([weekIndex, dayIndex]) => {
            events[weekIndex][dayIndex].isBestCommit = true;
        });
        return events.reverse();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Request Failed',
            statusText: JSON.stringify(e),
        });
    }
});
