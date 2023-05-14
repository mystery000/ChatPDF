import React from 'react'
import { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import { Button, Input, Space } from 'antd'

const { TextArea } = Input

// import DebouncedInput from './DebouncedInput'

const ChatInputBox = ({ sendANewMessage, loading }) => {
    const [newMessage, setNewMessage] = useState('')

    /**
     * Send message handler
     * Should empty text field after sent
     */

    const doSendMessage = () => {
        if (
            newMessage &&
            newMessage.length > 0 &&
            newMessage.replace(/\n/g, '').length > 0
        ) {
            sendANewMessage(newMessage.trim())
            setNewMessage('')
        }
    }

    const onKeyDownHandler = (e) => {
        if (!e.shiftKey) {
            e.preventDefault()
            if (loading) return
            doSendMessage()
        }
    }

    return (
        <div className="py-3 bg-white w-full rounded-bl-xl rounded-br-xla self-center max-w-3xl">
            <Space.Compact style={{ width: '100%' }}>
                <TextArea
                    allowClear
                    placeholder="Ask any question."
                    onPressEnter={onKeyDownHandler}
                    autoSize={{ maxRows: 8 }}
                    className="rounded-e-none !pt-[3px]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <div
                    disabled={!newMessage || newMessage.length === 0}
                    className="rounded-s-none rounded p-[11px] text-ms font-medium text-center text-white bg-sky-500 hover:bg-sky-600 focus:ring-1 focus:outline-none disabled:opacity-50 mx-0 cursor-pointer flex items-center"
                    onClick={() => doSendMessage()}
                >
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                </div>
            </Space.Compact>
        </div>
    )
}

export default ChatInputBox
