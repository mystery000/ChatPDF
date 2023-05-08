import { useState } from 'react'
import { RiMessage2Line } from 'react-icons/ri'

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
                className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none"
            >
                <RiMessage2Line size={24} />
                <div className="text-left rtl:text-right">
                    <h1 className="text-sm font-medium text-gray-700 dark:text-white">
                        {property.name}
                    </h1>
                </div>
            </button>
            {isCollapsed ? null : children}
        </>
    )
}

export default App
