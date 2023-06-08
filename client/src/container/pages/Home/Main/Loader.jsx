import { Empty, Spin } from "antd";

const Loader = () => {
    return (
        <div className="w-full flex flex-col items-center h-[calc(100vh_-_108px)]">
            <Spin className="mt-2" size="large"></Spin>
            {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        </div>
    );
};

export default Loader;
