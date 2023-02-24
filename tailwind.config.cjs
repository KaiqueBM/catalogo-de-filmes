/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './index.html'
    ],
    theme: {
        extend: {
            height: {
                '530': '530px',
                '9': '2.15rem'
            },
            padding: {
                '2.5': '0.60rem',
                '0.25': '0.080rem'
            }
        },
    },
    plugins: [],
}