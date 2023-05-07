import React, { useState } from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatContent from './ChatContent/ChatContent'
import ChatInputBox from './ChatInputBox/ChatInputBox'
import { useGetMessages } from '../hooks/useGetMessages'

const Chat = () => {
    /** Simulate a hook fetching the data */
    const { messages } = useGetMessages()

    /** State to control new messages */
    const [chatMessages, setChatMessages] = useState(messages)

    /** Create a new message */
    const sendANewMessage = (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message])
    }

    return (
        <div className="max-w-full mx-auto mt-2">
            <div className="bg-white relative">
                <ChatHeader
                    name={'Julian Sarokin'}
                    numberOfMessages={chatMessages.length}
                />
                <ChatContent messages={chatMessages} />
                <ChatInputBox sendANewMessage={sendANewMessage} />
            </div>
        </div>
    )
}

export default Chat
