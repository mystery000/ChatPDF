import { useEffect, useState } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'

const App = ({ children, property, active, onChangeHandler }) => {
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        setIsActive(true)
        onChangeHandler(property.id)
    }
    useEffect(() => {
        setIsActive(active)
    }, [active])

    return (
        <>
            <div
                onClick={handleClick}
                className={`flex items-center text-center px-3 py-2 m-1 w-[96%] transition-colors duration-600 hover:text-white focus:outline-none text-base cursor-pointer ${
                    isActive ? 'bg-[#1677ff] text-white rounded-lg' : ''
                }`}
            >
                <AiOutlineMessage />
                <div className="text-left">
                    <h1 className="w-40 ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {property.name}
                    </h1>
                </div>
            </div>
            {isActive ? children : null}
        </>
    )
}

export default App
