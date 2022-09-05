import { defineEventHandler } from 'h3';
import github from '@/utils/github';

export default defineEventHandler(async (event) => {
    const year = event.context.params.year || new Date().getFullYear();

    const start = new Date(`01/01/${year}`).toISOString();
    const end = new Date(`12/31/${year}`).toISOString();

    const data = await github.$fetch(
        `
        query($_login:String!) {
            user(login: $_login){
                contributionsCollection(from: "${start}", to: "${end}") {
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
        }
        `,
        {
            _login: 'RyanMulready',
        },
    );
    return data;
});
