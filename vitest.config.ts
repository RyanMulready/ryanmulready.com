import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        globals: true,
    },
    // @ts-ignore
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
            '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
        },
    },
});
