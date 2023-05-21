export default {
    API_URL: process.env.BACKEND_API_URL || 'http://localhost:5000/apis',
    ACCESS_TOKEN:
        process.env.ACCESS_TOKEN ||
        'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWFkZmQzNjAyNzFiMTBkZjg1ZjdhNyIsImVtYWlsIjoidGhvc21hczEwMDVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJUaG9tYXMiLCJpYXQiOjE2ODQ1MDIzMjAsImV4cCI6MTY4NTE0MjMyMH0.XT2-Ul_vpnxkQjP1ixL3y7LDo70awGqG9WaSypC0C0g',
}
