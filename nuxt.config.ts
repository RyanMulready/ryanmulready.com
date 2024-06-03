import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            title: 'RyanMulready',
            titleTemplate: '%s - v7',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        'Multifaceted, analytical, and innovative Staff Software Engineer with a primary focus on frontend. Over twelve years professional experience with many more as a freelance developer. Extensive knowledge in all phases of the product development cycle including leading and managing a team. Seeking a staff level position at a company with interesting problems to solve.',
                },
            ],
        },
    },
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/transitions.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    runtimeConfig: {
        GH_API_TOKEN: process.env.GH_API_TOKEN,
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
        GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
        SENDGRID_API_TOKEN: process.env.SENDGRID_API_TOKEN,
        ATLASSIAN_APP_PASSWORD: process.env.ATLASSIAN_APP_PASSWORD,
        public: {
            ATLASSIAN_USERNAME: process.env.ATLASSIAN_USERNAME,
            GH_USERNAME: process.env.GH_USERNAME,
            GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
        },
    },
    build: {
        // https://github.com/FortAwesome/vue-fontawesome/issues/393
        transpile: ['@fortawesome/vue-fontawesome'],
    },
    vite: {
        plugins: [
            svgLoader({
                defaultImport: 'component',
            }),
        ],
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxtjs/i18n',
        '@nuxtjs/google-fonts',
        '@vite-pwa/nuxt',
    ],
    plugins: [
        { src: '@/plugins/vercel', mode: 'client' },
        '@/plugins/observe-visibility',
        '@/plugins/font-awesome',
    ],
    i18n: {
        lazy: true,
        langDir: 'lang',
        locales: [{ code: 'en', file: 'en.json' }],
        defaultLocale: 'en',
        vueI18n: './i18n.config.ts',
    },
    googleFonts: {
        families: {
            Inconsolata: true,
            Poppins: true,
        },
    },
});
