import { inject } from '@vercel/analytics';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    if (process.env.NODE_ENV !== 'production') {
        return;
    }
    inject();
});
