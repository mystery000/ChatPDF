import React from 'react'
import { useState } from 'react'
import { HiPaperAirplane } from 'react-icons/hi'
import DebouncedInput from '../../components/DebouncedInput'

const ChatInputBox = ({ sendANewMessage }) => {
    const [newMessage, setNewMessage] = useState('')

    /**
     * Send message handler
     * Should empty text field after sent
     */

    const doSendMessage = () => {
        if (newMessage && newMessage.length > 0) {
            const newMessagePayload = {
                sentAt: new Date(),
                sentBy: 'Julian Sarokin',
                isChatOwner: true,
                text: newMessage,
            }
            sendANewMessage(newMessagePayload)
            setNewMessage('')
        }
    }

    return (
        <div className="px-6 py-3 bg-white w-100 overflow-hidden rounded-bl-xl rounded-br-xla">
            <div className="flex flex-row items-center">
                <DebouncedInput
                    value={newMessage ?? ''}
                    debounce={100}
                    onChange={(value) => setNewMessage(value)}
                />
                <div
                    type="button"
                    disabled={!newMessage || newMessage.length === 0}
                    className="px-3 py-3 text-xs font-medium text-center text-white bg-purple-500  hover:bg-purple-800 focus:ring-1 focus:outline-none focus:ring-purple-300 disabled:opacity-50 mx-0"
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
