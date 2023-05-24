import React, { useEffect, useRef, useState } from 'react'
import TypingAnimationText from './TypingAnimationText'
import PulseLoader from 'react-spinners/PulseLoader'
import { Drawer } from 'antd'

const ChatContent = ({ messages }) => {
    const chatPanelElement = useRef()
    const [isOpen, setOpen] = useState(false)
    const handleClick = (message) => {
        setOpen(!message.isChatOwner)
        console.log(message)
    }
    return (
        <div
            className="flex-1 w-full overflow-auto flex justify-center"
            ref={chatPanelElement}
        >
            <div className="w-full max-w-3xl ">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`px-3 py-2 flex flex-row w-full ${
                            message.isChatOwner
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                        onClick={() => handleClick(message)}
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
                            <p
                                className={`text-sm ${
                                    message.isChatOwner
                                        ? 'text-white'
                                        : 'text-gray-800'
                                }`}
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
                                        chatPanelElement={chatPanelElement}
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <Drawer
                title="Drawer with extra actions"
                placement={'right'}
                width={500}
                onClose={() => setOpen(false)}
                open={isOpen}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}

export default ChatContent
