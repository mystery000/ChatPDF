import React from 'react'
import Avatar from '../Avatar/Avatar'

const ChatContent = ({ messages }) => {
    return (
        <div className="px-6 py-1 h-chat-content overflow-auto">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`py-2 flex flex-row w-full ${
                        message.isChatOwner ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                        className={`${
                            message.isChatOwner ? 'order-2' : 'order-1'
                        }`}
                    >
                        <Avatar />
                    </div>
                    <div
                        className={`px-4 py-3 w-fit lg:max-w-lg flex flex-col  rounded-lg  shadow-md ${
                            message.isChatOwner
                                ? 'order-1 mr-2 bg-[#1677ff] shadow-[#1677ff]/40'
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
                            {message.sentBy}&nbsp;-&nbsp;
                            {new Date(message.sentAt).toLocaleDateString(
                                'en-US',
                                { hour: '2-digit', minute: '2-digit' }
                            )}
                        </span>
                        <span
                            className={`text-sm ${
                                message.isChatOwner
                                    ? 'text-white'
                                    : 'text-gray-800'
                            }`}
                        >
                            {message.text}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatContent
