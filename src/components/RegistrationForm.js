import React from 'react'
import useForm from '../hooks/useForm'
import ApiService from '../services/ApiService'

const RegistrationForm = () => {
    const initialValues = { email: '', password: '' }
    const [values, handleChange, resetForm] = useForm(initialValues)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await ApiService.register(values)
            console.log(response)
            resetForm()
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
            />
            <button type="submit">Register</button>
        </form>
    )
}

export default RegistrationForm
