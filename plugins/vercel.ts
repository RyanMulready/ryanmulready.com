import { inject } from '@vercel/analytics';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    inject();
});
