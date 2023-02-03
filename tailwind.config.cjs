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
            }
        },
    },
    plugins: [],
}