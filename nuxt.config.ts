import { defineNuxtConfig } from 'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
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
    css: [
        '~/assets/css/tailwind.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    runtimeConfig: {
        API_TOKEN_GITHUB: process.env.API_TOKEN_GITHUB,
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
        GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
        public: {
            GITHUB_USERNAME: 'RyanMulready',
            GOOGLE_CALENDAR_ID: 'ryan@energysage.com',
        },
    },
    build: {
        // https://github.com/FortAwesome/vue-fontawesome/issues/393
        transpile: ['@fortawesome/vue-fontawesome'],
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxt/image-edge',
        '@nuxtjs/i18n',
        '@nuxtjs/google-fonts',
    ],
    plugins: ['@/plugins/observe-visibility', '@/plugins/font-awesome'],
    i18n: {
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'en',
        locales: [{ code: 'en', file: 'en.json' }],
    },
    googleFonts: {
        families: {
            Inconsolata: true,
            Poppins: true,
        },
    },
});
