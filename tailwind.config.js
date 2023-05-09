/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            height: {
                'chat-content': 'calc(100vh - 170px)',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
