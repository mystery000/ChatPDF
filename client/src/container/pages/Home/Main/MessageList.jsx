import { useEffect, useRef } from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
    const messageListRef = useRef(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        messageListRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <div className="flex flex-1 w-full overflow-auto justify-center">
                <div className="w-full max-w-3xl">
                    {messages.map((message) => (
                        <Message key={message._id} message={message} />
                    ))}
                    <div ref={messageListRef}></div>
                </div>
            </div>
        </>
    );
};

export default MessageList;
