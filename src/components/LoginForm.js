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
        <>
            <div className="bg-black/50 fixed top-0 left-0 w-full h-screen"></div>
            <div className="fixed w-full px-4 py-24 z-50">
                <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 text-white">
                    <div className="max-w-[320px] mx-auto py-16">
                        <h1>Sign Up Here</h1>
                        <form
                            className="w-full flex flex-col py-4"
                            onSubmit={handleSubmit}
                        >
                            <p className="text-white font-bold">UserName</p>
                            <input
                                type="text"
                                required
                                className="p-3 my-2 rounded text-black"
                                placeholder="JohnDoe"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <p className="text-white font-bold">PassWord</p>
                            <input
                                type="password"
                                required
                                className="p-3 my-2 rounded text-black"
                                placeholder="Please enter a strong password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="bg-red-700 py-3 my-6 rounded font-bold px-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
