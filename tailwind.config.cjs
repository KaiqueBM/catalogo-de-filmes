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
            },
            padding: {
                '2.5': '0.60rem'
            }
        },
    },
    plugins: [],
}