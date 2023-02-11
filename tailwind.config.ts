/* eslint-disable global-require */
import { Config } from 'tailwindcss';

export default <Config>{
    content: [
        './components/**/*.vue',
        './layouts/**/*.vue',
        './pages/**/*.vue',
    ],
    daisyui: {
        logs: false,
        themes: [
            {
                ryanmulready: {
                    primary: '#BD3039',
                    secondary: '#FFFFFF',
                    accent: '#FF5AEF',
                    neutral: '#181617',
                    'neutral-content': '#443d3f',
                    'base-100': '#292425',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',
                },
            },
        ],
    },
    theme: {
        fontFamily: {
            sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
            mono: ['Inconsolata', 'ui-monospace', 'SFMono-Regular'],
            body: ['Poppins'],
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
