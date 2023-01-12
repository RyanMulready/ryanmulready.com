import { google } from 'googleapis';

import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
    const year = event.context.params?.year || new Date().getFullYear();
    const from = new Date(`01/01/${year}`).toISOString();
    const to = new Date(`12/31/${year}`).toISOString();
    const url = 'https://www.googleapis.com/auth/calendar.readonly';
    const config = useRuntimeConfig();

    const auth = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        undefined,
        // TODO: Why cant this replace be done in nuxt.config.ts?
        process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        url,
    );

    const calendar = google.calendar({
        version: 'v3',
        auth,
    });

    // TODO: any type
    let events: any = [];
    let moreResults = true;
    let pageToken;
    do {
        // TODO: any type
        // eslint-disable-next-line no-await-in-loop
        const res: any = await calendar.events.list({
            calendarId: config.public.GOOGLE_CALENDAR_ID,
            singleEvents: true,
            timeMin: from,
            timeMax: to,
            orderBy: 'startTime',
            pageToken,
        });

        if (res.data?.items) {
            events = [...events, ...res.data.items];
        }
        pageToken = res.data?.nextPageToken;

        moreResults = !!pageToken;
    } while (moreResults);
    return events;
});
