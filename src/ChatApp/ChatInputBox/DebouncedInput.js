import React from 'react'
import { useState, useEffect } from 'react'

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    onKeyDownHandler,
    ...props
}) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])
    return (
        <>
            <input
                type="text"
                placeholder="Ask any question..."
                id="message-box"
                value={value}
                className="w-full p-2 pl-4 text-sm text-gray-900 rounded-l-lg bg-white border border-r-0 focus:outline-none focus:border-sky-500 focus:ring-0 transition-colors duration-300"
                onChange={(e) => setValue(e.target.value)}
                {...props}
                onKeyDown={onKeyDownHandler}
            />
        </>
    )
}

export default DebouncedInput
