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
                placeholder="Add a question"
                id="message-box"
                value={value}
                className="w-full p-2 pl-4 text-sm text-gray-900 rounded-l-lg bg-white border-1 border-r-0 focus:ring-blue-500 focus:border-0"
                onChange={(e) => setValue(e.target.value)}
                {...props}
                onKeyDown={onKeyDownHandler}
            />
        </>
    )
}

export default DebouncedInput
