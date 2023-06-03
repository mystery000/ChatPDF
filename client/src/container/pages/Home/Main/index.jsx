import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../../../redux/message/messageSlice";

// components
import Loader from "./Loader";
import ToolBar from "./ToolBar";
import PromptBox from "./PromptBox";
import EmptyComponent from "./Empty";
import MessageList from "./MessageList";

const Main = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.message.loading);
    const error = useSelector((state) => state.message.error);
    const messages = useSelector((state) => state.message.messages) || [];
    const selectedSource = useSelector((state) => state.app.selectedSource);

    useEffect(() => {
        dispatch(getMessages({ sourceId: selectedSource }));
    }, [selectedSource]);

    if (loading) return <Loader />;

    return (
        <div
            className="max-w-full mx-auto"
            style={{ borderTop: "1px solid #f3f3f3" }}
        >
            <div className="bg-white flex flex-col max-h-[calc(100vh_-_70px)] h-[calc(100vh_-_70px)]">
                <ToolBar />
                {messages.length > 0 ? (
                    <MessageList messages={messages} />
                ) : (
                    <EmptyComponent />
                )}
                <PromptBox />
            </div>
        </div>
    );
};

export default Main;
