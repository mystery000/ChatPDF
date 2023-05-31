import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import { Input, Space } from 'antd'

const { TextArea } = Input

// import DebouncedInput from './DebouncedInput'

const ChatInputBox = ({ handleSubmit }) => {
    const [query, setQuery] = useState('')
    const textAreaRef = useRef(null)

    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    // handle form submission
    const handleClick = (e) => {
        e.preventDefault()
        if (!query) {
            alert('Please input a question')
            return
        }
        const question = query.trim()
        handleSubmit(question)
        setQuery('')
    }

    //prevent empty submissions
    const handleEnter = (e) => {
        if (e.key === 'Enter' && query) {
            handleClick(e)
        } else if (e.key == 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <div className="py-3 bg-white w-full rounded-bl-xl rounded-br-xla self-center max-w-3xl">
            <Space.Compact style={{ width: '100%' }}>
                <TextArea
                    allowClear
                    placeholder="Ask any question."
                    onKeyDown={handleEnter}
                    autoSize={{ maxRows: 1 }}
                    className="rounded-e-none !pt-[3px]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={textAreaRef}
                />
                <div
                    className="rounded-s-none rounded p-[11px] text-ms font-medium text-center text-white bg-sky-500 hover:bg-sky-600 focus:ring-1 focus:outline-none disabled:opacity-50 mx-0 cursor-pointer flex items-center"
                    onClick={() => handleClick()}
                >
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                </div>
            </Space.Compact>
        </div>
    )
}

export default ChatInputBox
