/* eslint-disable global-require */
import type { Config } from 'tailwindcss';

export default <Config>{
    content: [
        './components/**/*.vue',
        './layouts/**/*.vue',
        './pages/**/*.vue',
    ],
    // See custom plugin below
    corePlugins: {
        container: false,
    },
    daisyui: {
        logs: false,
        themes: [
            {
                ryanmulready: {
                    primary: '#BD3039',
                    secondary: '#FFFFFF',
                    accent: '#FF5AEF',
                    neutral: '#181617',
                    // TODO: These should be defined differently
                    'neutral-content': '#443d3f',
                    'base-100': '#292425',
                    'base-200': '#797979',
                    'base-300': '#D9CED0',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',

                    '.toggle-accent': {
                        'border-color': '#FF5AEF',
                    },
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
        extend: {
            colors: {
                meetings: '#f59a23',
                streaks: '#81d3f8',
                best: '#c280ff',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
        // We want to keep our max width around 1200 instead of tailwinds default of 1500
        function customContainer({
            addComponents,
        }: {
            addComponents: Function;
        }) {
            addComponents({
                '.container': {
                    maxWidth: '100%',
                    '@screen sm': {
                        maxWidth: '640px',
                    },
                    '@screen md': {
                        maxWidth: '768px',
                    },
                    '@screen lg': {
                        maxWidth: '1280px',
                    },
                },
            });
        },
    ],
};
