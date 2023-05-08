import { useState } from 'react'

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
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
                    className="w-6 h-6 rounded-full"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {' '}
                        <path
                            d="M15.5 11.5H15.51M11.5 11.5H11.51M7.5 11.5H7.51M15.6953 19.2318L19.1027 20.3676C19.8845 20.6282 20.6282 19.8844 20.3676 19.1027L19.2318 15.6953M15.3 19.1C15.3 19.1 14.0847 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5C20 14 19.1 15.3 19.1 15.3"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{' '}
                    </g>
                </svg>
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
