/* eslint-disable camelcase */
import { google, calendar_v3 } from 'googleapis';
import type { GaxiosResponse } from 'gaxios';

import { defineEventHandler, createError } from 'h3';
import { useRuntimeConfig } from '#imports';
import { yearSchema } from '@/utils/dates';

export default defineEventHandler(async (event) => {
    // https://github.com/googleapis/google-auth-library-ruby?tab=readme-ov-file#example-environment-variables
    const url = 'https://www.googleapis.com/auth/calendar.readonly';
    const config = useRuntimeConfig();
    const year = event.context.params?.year || new Date().getFullYear();
    const today = new Date();

    const from = new Date(`01/01/${year}`);
    let to = new Date(`12/31/${year}`);
    if (year === today.getFullYear().toString()) {
        to = new Date(
            today.setDate(today.getDate() + ((6 + (7 - today.getDay())) % 7)),
        );
    }

    // TODO: Why can't this happen in nuxt.config?
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
    const events = yearSchema(to, from);
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
        const start = new Date(`${calEvent.start?.dateTime}`);
        const end = new Date(`${calEvent.end?.dateTime}`);

        // All day events or events spanning multiple days are ignored
        if (
            !calEvent.start?.dateTime ||
            !calEvent.end?.dateTime ||
            start.getDay() !== end.getDay()
        ) {
            return;
        }

        // Meetings that don't count towards our duration
        const ignoreTerms = [
            'holiday',
            'meeting-free',
            'early friday',
            'lunch',
        ];

        if (
            ignoreTerms.some((term) =>
                calEvent.summary?.toLowerCase().includes(term),
            )
        ) {
            return;
        }

        const duration = end.getTime() - start.getTime();
        const eventDate = start.toLocaleDateString().toString();
        const weekIndex = start.getWeek();

        // Future meetings should be ignored
        if (!events[weekIndex]) {
            return;
        }

        const existingIndex = events[weekIndex].findIndex(
            (eventItem) => eventItem.date === eventDate,
        );
        try {
            if (existingIndex && weekIndex) {
                const existingData = events[weekIndex][existingIndex];
                events[weekIndex][existingIndex] = {
                    ...events[weekIndex][existingIndex],
                    duration: (existingData?.duration || 0) + duration,
                    meetings: (existingData?.meetings || 0) + 1,
                };
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(
                'Error adding contribution event: ',
                calEvent,
                weekIndex,
                existingIndex,
                e,
            );
            throw createError({
                statusCode: 500,
                statusMessage: 'Error adding contribution event',
                statusText: JSON.stringify(e),
            });
        }
    });

    return events.reverse();
});
