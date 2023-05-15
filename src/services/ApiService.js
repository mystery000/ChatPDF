import axios from 'axios'
import config from '../config'

async function login(values) {
    try {
        const response = await axios.post(
            `${config.API_URL}/api/auth/login`,
            values,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
        return response
    } catch (err) {
        console.error(err)
    }
}

async function register(values) {
    try {
        const response = await axios.post(
            `${config.API_URL}/api/auth/register`,
            values,
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response
    } catch (err) {
        console.error(err)
    }
}
export default {
    login,
    register,
}
