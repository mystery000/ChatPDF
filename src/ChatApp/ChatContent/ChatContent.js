import React, { useEffect, useRef, useState } from 'react'
import TypingAnimationText from './TypingAnimationText'
import PulseLoader from 'react-spinners/PulseLoader'
import { Card, Drawer } from 'antd'

const ChatContent = ({ messages }) => {
    const lastMessageRef = useRef(null)
    const [isOpen, setOpen] = useState(false)
    const [sourceDocuments, setSourceDocuments] = useState([])

    const handleClick = (message) => {
        setOpen(!message.isChatOwner)
        setSourceDocuments(message.sourceDocuments)
    }

    const handleClose = () => {
        setOpen(false)
        setSourceDocuments([])
    }

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex-1 w-full overflow-auto flex justify-center">
            <div className="w-full max-w-3xl">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`px-3 py-2 flex flex-row w-full ${
                            message.isChatOwner
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`${
                                message.isChatOwner ? 'order-2' : 'order-1'
                            }`}
                        >
                            {/* <Avatar /> */}
                        </div>
                        <div
                            className={`px-3 py-[6px] w-fit lg:max-w-lg flex flex-col  rounded-lg  shadow-sm ${
                                message.isChatOwner
                                    ? 'order-1 mr-2 bg-[#1677ff] '
                                    : 'order-2 ml-2 bg-white/80 shadow-slate-200 border'
                            }`}
                        >
                            <span
                                className={`text-xs ${
                                    message.isChatOwner
                                        ? 'text-gray-100'
                                        : 'text-gray-400'
                                }`}
                            >
                                {/* {message.sentBy}&nbsp;-&nbsp;
                                {new Date(message.sentAt).toLocaleDateString(
                                    'en-US',
                                    { hour: '2-digit', minute: '2-digit' }
                                )} */}
                            </span>
                            <div
                                className={`text-sm ${
                                    message.isChatOwner
                                        ? 'text-white'
                                        : 'text-gray-800'
                                }`}
                                onClick={() => handleClick(message)}
                            >
                                {message.loading ? (
                                    <PulseLoader color="#0008" size={5} />
                                ) : (
                                    <TypingAnimationText
                                        message={message}
                                        isLastMessage={
                                            messages.length == index + 1
                                                ? true
                                                : false
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={lastMessageRef}></div>
            </div>
            <Drawer
                title="Sources"
                placement={'right'}
                width={500}
                onClose={handleClose}
                open={isOpen}
            >
                {sourceDocuments.map((sourceDocument, index) => (
                    <Card
                        key={index}
                        title={`Document${index + 1}`}
                        className="w-full mb-10"
                    >
                        <p>{sourceDocument.pageContent}</p>
                    </Card>
                ))}
            </Drawer>
        </div>
    )
}

export default ChatContent
