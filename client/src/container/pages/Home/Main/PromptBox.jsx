import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { sendMessage } from "../../../../redux/message/messageSlice";

const PromptBox = () => {
    const dispatch = useDispatch();
    const waiting = useSelector((state) => state.message.waiting);
    const error = useSelector((state) => state.message.promptError);
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const canAsk = useSelector((state) => state.source.sources.length > 0);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    // handle form submission
    const handleClick = (e) => {
        e.preventDefault();
        if (waiting) return;
        if (!query) return;
        const question = query.trim();
        // here dispatch action to send a question to the server
        dispatch(
            sendMessage({
                sourceId: selectedSource,
                text: question,
                isChatOwner: true,
            })
        );
        setQuery("");
    };

    // Prevent empty submission
    const handleEnter = (e) => {
        if (e.key === "Enter" && query) {
            handleClick(e);
        } else if (e.key == "Enter") {
            e.preventDefault();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="py-3 bg-white w-full rounded-bl-xl rounded-br-xla self-center max-w-3xl px-2">
            <Space.Compact style={{ width: "100%" }} size="large">
                <Input
                    allowClear
                    placeholder={
                        waiting
                            ? "Waiting for response..."
                            : "Ask any question."
                    }
                    onKeyDown={handleEnter}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={inputRef}
                    disabled={!canAsk || waiting}
                />
                <Button 
                    type='primary' 
                    icon={<SendOutlined />}
                    onClick={handleClick}
                    disabled={!canAsk || waiting}
                >
                </Button>
            </Space.Compact>
        </div>
    );
};

export default PromptBox;
