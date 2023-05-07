const App = ({ name }) => {
    return (
        <>
            <button className="flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 hover:bg-gray-100 focus:outline-none">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rounded-full w-6 h-6"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {' '}
                        <g id="style=linear">
                            {' '}
                            <g id="document">
                                {' '}
                                <path
                                    id="rec"
                                    d="M3 7C3 4.23858 5.23858 2 8 2H16C18.7614 2 21 4.23858 21 7V17C21 19.7614 18.7614 22 16 22H8C5.23858 22 3 19.7614 3 17V7Z"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                ></path>{' '}
                                <path
                                    id="line"
                                    d="M8 8.2002H16"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{' '}
                                <path
                                    id="line_2"
                                    d="M8 12.2002H16"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{' '}
                                <path
                                    id="line_3"
                                    d="M9 16.2002H15"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{' '}
                            </g>{' '}
                        </g>{' '}
                    </g>
                </svg>
                <div className="text-left rtl:text-right">
                    <h1 className="text-sm font-medium text-gray-700 dark:text-white">
                        {name}
                    </h1>
                </div>
            </button>
        </>
    )
}

export default App
