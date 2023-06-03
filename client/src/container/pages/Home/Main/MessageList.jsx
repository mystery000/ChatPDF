import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingMessage from "../../../../components/LoadingMessage";
import Message from "./Message";

const MessageList = ({ messages }) => {
    const messageListRef = useRef(null);
    const waiting = useSelector((state) => state.message.waiting);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        messageListRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <div className="flex flex-1 w-full overflow-auto justify-center">
                <div className="w-full max-w-3xl">
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            isLast={messages.length === index + 1}
                        />
                    ))}
                    {waiting && <LoadingMessage />}
                    <div ref={messageListRef}></div>
                </div>
            </div>
        </>
    );
};

export default MessageList;
