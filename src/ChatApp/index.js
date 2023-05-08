import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatContent from './ChatContent/ChatContent'
import ChatInputBox from './ChatInputBox/ChatInputBox'
import { useGetMessages } from '../hooks/useGetMessages'

const Chat = ({ collectionId }) => {
    /** Simulate a hook fetching the data */
    const { messages } = useGetMessages(collectionId)
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        /** State to control new messages */
        setChatMessages(messages)
    }, [collectionId])

    /** Create a new message */
    const sendANewMessage = (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message])
        // query document to get answery from Grain API, then add answer to state
        axios
            .post(
                `https://api.usegrain.co/v1/collections/${collectionId}/query`,
                { query: message.text },
                {
                    headers: {
                        Authorization:
                            'Bearer 370bde20-db9b-4f07-ad0e-377f75e43581',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                const newMessagePayload = {
                    sentAt: new Date(),
                    sentBy: 'PropManager.ai',
                    isChatOwner: false,
                    text: response.data.result,
                }
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    newMessagePayload,
                ])
            })
            .catch((error) => {
                console.log(error)
            })
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
