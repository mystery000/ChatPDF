import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import DebouncedInput from './DebouncedInput'

const ChatInputBox = ({ sendANewMessage }) => {
    const [newMessage, setNewMessage] = useState('')

    /**
     * Send message handler
     * Should empty text field after sent
     */

    const doSendMessage = () => {
        if (newMessage && newMessage.length > 0) {
            sendANewMessage(newMessage)
            setNewMessage('')
        }
    }

    const onKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            doSendMessage()
        }
    }

    return (
        <div className="px-6 py-3 bg-white w-100 overflow-hidden rounded-bl-xl rounded-br-xla">
            <div className="flex items-center">
                <div className="flex-1">
                    <DebouncedInput
                        value={newMessage ?? ''}
                        debounce={100}
                        onChange={(value) => setNewMessage(value)}
                        onKeyDownHandler={onKeyDownHandler}
                    />
                </div>
                <div
                    type="button"
                    disabled={!newMessage || newMessage.length === 0}
                    className="p-[11px] text-ms font-medium text-center text-white bg-sky-500 hover:bg-sky-600 focus:ring-1 focus:outline-none disabled:opacity-50 mx-0"
                    onClick={() => doSendMessage()}
                >
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                </div>
                {/* <button
                    type="button"
                    disabled={!newMessage || newMessage.length === 0}
                    className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50"
                    onClick={() => doSendMessage()}
                >
                    Send
                </button> */}
            </div>
        </div>
    )
}

export default ChatInputBox
