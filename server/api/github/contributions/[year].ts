import { defineEventHandler } from 'h3';
import { yearSchema } from '@/utils/dates';
import github from '@/utils/github';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
    const year = event.context.params?.year || new Date().getFullYear();
    const today = new Date();
    const config = useRuntimeConfig();

    const from = new Date(`01/01/${year}`);
    const fromString = from.toISOString();

    let to = new Date(`12/31/${year}`);
    if (year === today.getFullYear().toString()) {
        to = new Date(
            today.setDate(today.getDate() + ((6 + (7 - today.getDay())) % 7)),
        );
    }
    const toString = to.toISOString();

    try {
        const events = yearSchema(to, from);
        const res = await github.$fetch(
            `
        query($username:String!, $fromString: DateTime!, $toString: DateTime!) {
            user(login: $username){
                contributionsCollection(from: $fromString, to: $toString) {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                color
                                contributionCount
                                date
                                weekday
                            }
                        }
                    }
                }
            }
        }`,
            {
                username: config.public.GITHUB_USERNAME,
                fromString,
                toString,
            },
        );
        const weeks =
            res.data?.user?.contributionsCollection?.contributionCalendar.weeks;
        let bestCommits = 0;
        const bestCommitsIndexes: number[][] = [];

        weeks?.forEach((week) => {
            week?.contributionDays?.forEach((day) => {
                const start = new Date(`${day.date} 00:00`);
                const weekIndex = start.getWeek();
                const eventDate = start.toLocaleDateString().toString();
                const existingIndex = events[weekIndex]?.findIndex(
                    (eventItem) => eventItem.date === eventDate,
                );

                if (existingIndex !== undefined && weekIndex !== undefined) {
                    const commits = day.contributionCount;
                    const isBestCommit = commits === bestCommits;

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
        });

        // Set isbestCommit to true for all indexes in bestCommitsIndexes
        bestCommitsIndexes.forEach(([weekIndex, dayIndex]) => {
            events[weekIndex][dayIndex].isBestCommit = true;
        });
        return events.reverse();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return {
            error: 'Request Failed',
        };
    }
});
