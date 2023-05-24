import axios from 'axios'
import Config from '../config'
import React, { useEffect, useState } from 'react'
import ChatContent from './ChatContent/ChatContent'
import ChatInputBox from './ChatInputBox/ChatInputBox'

const Chat = ({ sourceId, isUpdate }) => {
    const { API_URL, ACCESS_TOKEN } = Config
    const [chatMessages, setChatMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESS_TOKEN,
        },
    }

    /** Create a new message */
    const sendANewMessage = (message) => {
        setLoading(true)
        const data = {
            question: message,
        }
        axios
            .post(`${API_URL}/sources/${sourceId}/chat`, data, options)
            .then((res) => {
                const { msgLangchain } = res.data
                msgLangchain.typingAnimation = true
                setChatMessages((prev) => {
                    const messages = [...prev]
                    messages.pop()
                    return [...messages, msgLangchain]
                })
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })

        const msgUser = {
            sentBy: 'User',
            sentAt: new Date(),
            isChatOwner: true,
            text: message,
        }
        const msgLoading = {
            isChatOwner: false,
            loading: true,
            sentAt: new Date(),
        }
        setChatMessages((prev) => [...prev, msgUser, msgLoading])
    }

    useEffect(() => {
        axios
            .get(`${API_URL}/sources/${sourceId}/messages`, {
                headers: {
                    Authorization: ACCESS_TOKEN,
                },
            })
            .then((res) => {
                setChatMessages(res.data.messages)
            })
            .catch((error) => {
                setChatMessages([])
                console.log(error)
            })
    }, [sourceId, isUpdate])

    return (
        <div className="max-w-full mx-auto mt-2">
            <div className="bg-white flex flex-col max-h-[calc(100vh_-_70px)] h-[calc(100vh_-_70px)]">
                <ChatContent messages={chatMessages} />
                <ChatInputBox
                    sendANewMessage={sendANewMessage}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default Chat
