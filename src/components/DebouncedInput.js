import React from 'react'
import { useState, useEffect } from 'react'

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
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
            <div className="relative w-full">
                <input
                    type="text"
                    className="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    id="message-box"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                />
            </div>
        </>
    )
}

export default DebouncedInput
