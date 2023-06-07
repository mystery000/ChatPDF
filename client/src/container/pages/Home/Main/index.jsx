import { useEffect } from "react";
import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMessages } from "../../../../redux/message/messageSlice";

// components
import Loader from "./Loader";
import ToolBar from "./ToolBar";
import PromptBox from "./PromptBox";
import EmptyComponent from "./Empty";
import MessageList from "./MessageList";

const Main = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.message.loading);
    const error = useSelector((state) => state.message.error);
    const messages = useSelector((state) => state.message.messages) || [];
    const selectedSource = useSelector((state) => state.app.selectedSource);

    useEffect(() => {
        if (selectedSource) {
            dispatch(getMessages({ sourceId: selectedSource }));
        }
    }, [selectedSource]);

    // if (loading) return <Loader />;

    return (
        <div
            className="max-w-full mx-auto"
        >
            <div className={classNames('bg-white', {'h-screen' : location.pathname == '/home' })}>
                <ToolBar />
                {loading && <Loader />}
                {(!loading && messages.length > 0) ? (
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
