import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorage } from "../../../../helpers";
import { getMessages } from "../../../../redux/message/messageSlice";

// components
import Loader from "./Loader";
import EmptyComponent from "./Empty";
import MessageList from "./MessageList";
import PromptBox from "./PromptBox";

const Main = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.message.loading);
    const error = useSelector((state) => state.message.error);
    const messages = useSelector((state) => state.message.messages);
    const selectedSource = useSelector((state) => state.app.selectedSource);

    useEffect(() => {
        dispatch(getMessages({ sourceId: selectedSource }));
    }, [selectedSource]);

    if (loading) return <Loader />;
    if (messages.length == 0) return <EmptyComponent />;

    return (
        <div
            className="max-w-full mx-auto"
            style={{ borderTop: "1px solid #f3f3f3" }}
        >
            <div className="bg-white flex flex-col max-h-[calc(100vh_-_70px)] h-[calc(100vh_-_70px)]">
                <MessageList messages={messages} />
                <PromptBox />
            </div>
        </div>
    );
};

export default Main;
