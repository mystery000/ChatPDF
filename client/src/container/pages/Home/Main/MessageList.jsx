import Message from "./Message";

const MessageList = ({ messages }) => {
    return (
        <>
            <div className="flex flex-1 w-full overflow-auto justify-center">
                <div className="w-full max-w-3xl">
                    {messages.map((message) => (
                        <Message key={message._id} message={message} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MessageList;
