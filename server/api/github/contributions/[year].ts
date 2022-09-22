import { defineEventHandler } from 'h3';
import github from '@/utils/github';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
    const year = event.context.params?.year || new Date().getFullYear();
    const config = useRuntimeConfig();

    const from = new Date(`01/01/${year}`).toISOString();
    const to = new Date(`12/31/${year}`).toISOString();

    const data = await github.$fetch(
        `
        query($username:String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username){
                contributionsCollection(from: $from, to: $to) {
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
            from,
            to,
        },
    );
    return data;
});
