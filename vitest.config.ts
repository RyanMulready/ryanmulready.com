import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
    test: {
        environment: 'jsdom',
        deps: {
            inline: [/@nuxt\/test-utils-edge/],
        },
    },
    // @ts-ignore
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
            '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
        },
    },
});
