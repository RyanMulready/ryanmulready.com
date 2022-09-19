/* eslint-disable global-require */
import { Config } from 'tailwindcss';

export default <Config>{
    content: [
        './components/**/*.vue',
        './layouts/**/*.vue',
        './pages/**/*.vue',
    ],
    daisyui: {
        themes: ['light', 'dark'],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
