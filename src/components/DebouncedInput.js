import React from 'react'
import { useState, useEffect } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'

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
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-event">
                    <HiPaperAirplane className="w-4 h-4" />
                </div>
                <input
                    type="text"
                    className="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
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
