import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Drawer, Space } from "antd";

import LoadingMessage from "../../../../components/LoadingMessage";
import Message from "./Message";

const MessageList = ({ messages }) => {
    const messageListRef = useRef(null);
    const waiting = useSelector((state) => state.message.waiting);
    const user = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);
    const [selMessageSource, setSelMessageSource] = useState([]);

    const showDrawer = (message) => {
        if(!user.isAdmin) return;
        setSelMessageSource(message.sourceDocuments);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        messageListRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <div className="flex flex-1 w-full overflow-auto justify-center h-[calc(100vh_-_120px)]">
                <div className="w-full max-w-3xl">
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            isLast={messages.length === index + 1}
                            onClick={() => showDrawer(message)}
                        />
                    ))}
                    {waiting && <LoadingMessage />}
                    <div ref={messageListRef}></div>
                    <Drawer title="Sources Documents" width={350} placement="right" onClose={onClose} open={open}>
                        <Space direction="vertical">
                            {selMessageSource.map((source, i) => <Card title={`Document ${i + 1}`} key={i}>
                                <p>{source.pageContent}</p>
                            </Card>)}
                        </Space>
                    </Drawer>
                </div>
            </div>
        </>
    );
};

export default MessageList;
