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
        weeks?.forEach((week) => {
            week?.contributionDays?.forEach((day) => {
                const start = new Date(`${day.date} 00:00`);
                const weekIndex = start.getWeek();
                const eventDate = start.toLocaleDateString().toString();
                const existingIndex = events[weekIndex]?.findIndex(
                    (eventItem) => eventItem.date === eventDate,
                );
                try {
                    if (existingIndex && weekIndex) {
                        events[weekIndex][existingIndex] = {
                            ...events[weekIndex][existingIndex],
                            count: day.contributionCount,
                        };
                    }
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log(
                        'Error adding contribution event: ',
                        day,
                        weekIndex,
                        existingIndex,
                        e,
                    );
                }
            });
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
