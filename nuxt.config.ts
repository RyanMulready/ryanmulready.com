import { defineNuxtConfig } from 'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'RyanMulready v7',
            titleTemplate: '%s - RyanMulready v7',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
    css: ['~/assets/css/tailwind.css'],
    runtimeConfig: {
        API_TOKEN_GITHUB: process.env.API_TOKEN_GITHUB,
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
        GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
        public: {
            GITHUB_USERNAME: 'RyanMulready',
            GOOGLE_CALENDAR_ID: 'ryan@energysage.com',
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    plugins: ['@/plugins/observe-visibility'],
});
