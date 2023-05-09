import { useState } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'

const App = ({ children, property, onSelectPropertyHandler }) => {
    const [isCollapsed, setIsCollapsed] = useState(true)

    const handleClick = () => {
        setIsCollapsed((prev) => !prev)
        onSelectPropertyHandler(property.id)
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="flex items-center text-center p-3 m-1 w-full transition-colors duration-600 hover:text-white focus:outline-none"
            >
                <AiOutlineMessage size={20} />
                <div>
                    <h1 className="w-40 ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {property.name}
                    </h1>
                </div>
            </button>
            {isCollapsed ? null : children}
        </>
    )
}

export default App
