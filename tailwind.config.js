/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            height: {
                'chat-content': 'calc(100vh - 130px)',
            },
        },
    },
    plugins: [],
}
