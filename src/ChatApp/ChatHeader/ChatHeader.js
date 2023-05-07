import React from 'react'
import Avatar from '../Avatar/Avatar'

const ChatHeader = ({ name, numberOfMessages }) => {
    return (
        <div className="border-b-2 border-b-gray-200 py-3 px-6 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-1.5">
                <Avatar />
                <div className="flex flex-col">
                    <p className="text-base text-black">{name}</p>
                    <p className="text-xs text-gray-400">
                        {numberOfMessages} messages
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
