import React from "react";
import { useState, useRef, useEffect } from "react";

import { Input, Space, message } from "antd";
import { HiPaperAirplane } from "react-icons/hi";

const PromptBox = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [query, setQuery] = useState("");
    const inputRef = useRef(null)

    // handle form submission
    const handleClick = (e) => {
        e.preventDefault();
        if (!query) {
            messageApi.warning("Please input a question");
            return;
        }
        const question = query.trim();
        // here dispatch action to send a question to the server

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
      inputRef.current?.focus()
    }, [])
    
    return (
        <div className="py-3 bg-white w-full rounded-bl-xl rounded-br-xla self-center max-w-3xl">
            <Space.Compact style={{ width: "100%" }}>
                <Input
                    allowClear
                    placeholder="Ask any question."
                    onKeyDown={handleEnter}
                    className="rounded-e-none !pt-[3px]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={inputRef}
                />
                <div
                    className="rounded-s-none rounded p-[11px] text-ms font-medium text-center text-white bg-sky-500 hover:bg-sky-600 focus:ring-1 focus:outline-none disabled:opacity-50 mx-0 cursor-pointer flex items-center"
                    onClick={() => handleClick()}
                >
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                </div>
            </Space.Compact>
        </div>
    );
};

export default PromptBox;
