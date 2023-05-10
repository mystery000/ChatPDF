const App = ({ onSelectHandler }) => {
    const onChangeHandler = (event) => {
        onSelectHandler(event.target.files[0])
    }
    return (
        <div className="flex w-full items-center justify-center bg-grey-lighter mt-8">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide cursor-pointer border">
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width={48}
                    height={48}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    ></path>
                </svg>
                <span className="mt-2 text-base leading-normal">
                    Upload PDF
                </span>
                <input
                    type="file"
                    className="hidden"
                    onChange={onChangeHandler}
                />
            </label>
        </div>
    )
}

export default App
