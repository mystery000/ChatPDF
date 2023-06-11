import { useEffect } from "react";
import classNames from 'classnames';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Empty, Spin } from "antd";

import { getMessages } from "../../../../redux/message/messageSlice";

// components
import ToolBar from "./ToolBar";
import PromptBox from "./PromptBox";
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
            <div className={classNames('bg-white', { 'h-full': location.pathname == '/home' })}>
                <ToolBar />
                <div className={classNames("flex justify-center overflow-auto h-[calc(100vh_-_117px)]", {'items-center' : (loading || !messages.length)})}>
                    {loading && <Spin className="mt-4" size="large"></Spin>}
                    {(!loading && messages.length > 0) ? (
                        <MessageList messages={messages} />
                    ) : (
                        !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                </div>
                <PromptBox />
            </div>
        </div>
    );
};

export default Main;
