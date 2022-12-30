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
        GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
        GITHUB_GRAPHQL_URL: 'https://api.github.com/graphq',
        public: {
            GITHUB_USERNAME: 'RyanMulready',
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    plugins: ['@/plugins/observe-visibility'],
});
