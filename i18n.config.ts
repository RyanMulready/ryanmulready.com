import { defineI18nConfig } from '#imports';
import en from '@/lang/en.json';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en,
    },
}));
