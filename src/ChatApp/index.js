import axios from 'axios'
import Config from '../config'
import React, { useEffect, useState } from 'react'
import ChatContent from './ChatContent/ChatContent'
import ChatInputBox from './ChatInputBox/ChatInputBox'
import { Empty, Spin } from 'antd'

const Chat = ({ sourceId, isUpdate }) => {
    const { API_URL, ACCESS_TOKEN } = Config
    const [messageState, setMessageState] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // handle form submission
    const handleSubmit = async (query) => {
        setError(null)
        const question = query.trim()

        setMessageState((state) => [
            ...state,
            {
                sentBy: 'User',
                sentAt: new Date(),
                isChatOwner: true,
                text: question,
            },
            { isChatOwner: false, loading: true, sentAt: new Date() },
        ])

        try {
            const response = await axios.post(
                `${API_URL}/sources/${sourceId}/chat`,
                { question: question },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: ACCESS_TOKEN,
                    },
                }
            )
            const { msgLangchain } = response.data
            msgLangchain.typingAnimation = true

            setMessageState((state) => {
                const newState = state.slice(0, -1)
                return [...newState, msgLangchain]
            })
        } catch (error) {
            setError(error)
            console.log('error', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    `${API_URL}/sources/${sourceId}/messages`,
                    {
                        headers: {
                            Authorization: ACCESS_TOKEN,
                        },
                    }
                )
                setMessageState(response.data.messages)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
                console.log('error', error)
            }
        }
        fetchData()
    }, [sourceId, isUpdate])

    if (error) {
        return <div className="text-center text-red-500">{error}</div>
    }

    return (
        <div className="max-w-full mx-auto mt-2">
            <div className="bg-white flex flex-col max-h-[calc(100vh_-_70px)] h-[calc(100vh_-_70px)]">
                {isLoading ? (
                    <div className="flex-1 w-full flex flex-col items-center">
                        <Spin tip="Loading"></Spin>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                ) : messageState.length ? (
                    <ChatContent messages={messageState} key={sourceId} />
                ) : (
                    <div className="flex-1 w-full flex flex-col items-center">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                )}
                <ChatInputBox handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Chat
