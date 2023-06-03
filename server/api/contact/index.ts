// server/contact.js
import { defineEventHandler, readBody, createError } from 'h3';
import sgMail from '@sendgrid/mail';

export default defineEventHandler(async (event) => {
    if (event.node.req.method !== 'POST') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method not allowed',
        });
    }

    if (!process.env.SENDGRID_API_TOKEN) {
        throw createError({
            statusCode: 500,
            statusMessage: 'API Token not found',
        });
    }

    try {
        const body = await readBody(event);
        const { name, email, comment } = body;

        // Configure SendGrid with your API key
        sgMail.setApiKey(process.env.SENDGRID_API_TOKEN);

        // Email options
        const msg = {
            from: email,
            to: 'ryan.mulready@gmail.com',
            subject: `${name} submitted a contact form`,
            text: comment,
        };

        // Send email
        await sgMail.send(msg);

        return { statusCode: 200, body: 'Email Sent' };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Email not sent',
            statusText: JSON.stringify(error),
        });
    }
});
