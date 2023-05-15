import Main from './pages/Main'
import Login from './pages/Login'
import Registration from './pages/Registration'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
