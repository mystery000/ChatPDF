import { Empty, Spin } from "antd";

const Loader = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Spin className="mt-2" size="large"></Spin>
            {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
        </div>
    );
};

export default Loader;
