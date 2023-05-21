import React from 'react'
import { useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import ApiService from '../services/ApiService'

const LoginForm = () => {
    const initialValues = { email: '', password: '' }
    const [values, handleChange, resetForm] = useForm(initialValues)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await ApiService.login(values)
            console.log(res)
            navigate('/')
            resetForm()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <button type="submit">Log in</button>
        </form>
    )
}

export default LoginForm
