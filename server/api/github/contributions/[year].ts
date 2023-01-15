import { defineEventHandler } from 'h3';
import { yearObject } from '@/utils/dates';
import github from '@/utils/github';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
    const year = event.context.params?.year || new Date().getFullYear();
    const config = useRuntimeConfig();

    const from = new Date(`01/01/${year}`);
    const fromString = from.toISOString();
    const to = new Date(`12/31/${year}`);
    const toString = to.toISOString();

    try {
        const events = yearObject(to, from);
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
        weeks?.forEach((week) => {
            week?.contributionDays?.forEach((day) => {
                const start = new Date(`${day.date} 00:00`);
                const weekIndex = start.getWeek();
                const eventDate = start.toLocaleDateString().toString();
                const existingIndex = events[weekIndex].findIndex(
                    (eventItem) => eventItem.date === eventDate,
                );

                try {
                    events[weekIndex][existingIndex] = {
                        ...events[weekIndex][existingIndex],
                        count: day.contributionCount,
                    };
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log('Error adding event: ', day, e);
                }
            });
        });
        return events.reverse();
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        // TODO: Real Error Handling
        return {
            error: 'Request Failed',
        };
    }
});
