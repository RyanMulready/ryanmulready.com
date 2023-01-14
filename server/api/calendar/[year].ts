/* eslint-disable camelcase */
import { google, calendar_v3 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';

import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';
import { yearObject } from '@/utils/dates';

export default defineEventHandler(async (event) => {
    const year = event.context.params?.year || new Date().getFullYear();
    const from = new Date(`01/01/${year}`);
    const to = new Date(`12/31/${year}`);
    const url = 'https://www.googleapis.com/auth/calendar.readonly';
    const config = useRuntimeConfig();

    console.log(process.env.GOOGLE_PRIVATE_KEY);
    const GOOGLE_PRIVATE_KEY = JSON.parse(
        process.env.GOOGLE_PRIVATE_KEY || '',
    )?.privateKey;
    const auth = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        undefined,
        // TODO: Why cant this replace be done in nuxt.config.ts?
        GOOGLE_PRIVATE_KEY,
        url,
    );

    const calendar = google.calendar({
        version: 'v3',
        auth,
    });

    let calendarEvents: calendar_v3.Schema$Event[] = [];
    const events = yearObject(to, from);
    let moreResults = true;
    let pageToken;
    do {
        const res: GaxiosResponse =
            // eslint-disable-next-line no-await-in-loop
            await calendar.events.list({
                calendarId: config.public.GOOGLE_CALENDAR_ID,
                singleEvents: true,
                timeMin: from.toISOString(),
                timeMax: to.toISOString(),
                orderBy: 'startTime',
                pageToken,
            });
        if (res.data?.items) {
            calendarEvents = [...calendarEvents, ...res.data.items];
        }
        pageToken = res.data?.nextPageToken;

        moreResults = !!pageToken;
    } while (moreResults);

    // Normalize calendarEvents to be grouped by date
    calendarEvents.forEach((calEvent: calendar_v3.Schema$Event) => {
        const start = new Date(
            `${calEvent.start?.dateTime || calEvent.start?.date}`,
        );
        const end = new Date(`${calEvent.end?.dateTime || calEvent.end?.date}`);
        const duration = end.getTime() - start.getTime();
        const eventItem = start.toLocaleDateString().toString();
        try {
            events[eventItem] = {
                totalDuration: events[eventItem].totalDuration + duration,
                events: [
                    ...events[eventItem].events,
                    {
                        start,
                        duration,
                    },
                ],
            };
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Error adding event: ', calEvent, e);
        }
    });

    return events;
});
