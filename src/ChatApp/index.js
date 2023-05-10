import axios from 'axios'
import config from '../config'
import React, { useEffect, useState } from 'react'
import ChatContent from './ChatContent/ChatContent'
import ChatInputBox from './ChatInputBox/ChatInputBox'

const options = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: config.ACCESS_TOKEN,
    },
}

const Chat = ({ documentId }) => {
    const [chatMessages, setChatMessages] = useState([])

    /** Create a new message */
    const sendANewMessage = (message) => {
        const data = {
            sourceId: documentId,
            messages: [
                {
                    role: 'user',
                    content: message,
                },
            ],
        }
        axios
            .post(`${config.API_URL}/api/chats/message`, data, options)
            .then((res) => {
                const chatPDFMsg = res.data.data.chatPDFMsg
                setChatMessages((prev) => [...prev, chatPDFMsg])
            })
            .catch((err) => console.log(err))

        const clientMsg = {
            sentBy: 'User',
            sentAt: new Date(),
            isChatOwner: true,
            text: message,
        }
        setChatMessages((prev) => [...prev, clientMsg])
    }

    useEffect(() => {
        // query document to get answery from Grain API, then add answer to state
        axios
            .get(`${config.API_URL}/api/sources/get/${documentId}/messages`, {
                headers: {
                    Authorization: config.ACCESS_TOKEN,
                },
            })
            .then((res) => {
                setChatMessages(res.data.data)
            })
            .catch((error) => {
                setChatMessages([])
                console.log(error)
            })
    }, [documentId])

    return (
        <div className="max-w-full mx-auto mt-2">
            <div className="bg-white relative">
                <ChatContent messages={chatMessages} />
                <ChatInputBox sendANewMessage={sendANewMessage} />
            </div>
        </div>
    )
}

export default Chat
