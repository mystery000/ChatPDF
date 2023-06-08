import { Empty } from "antd";

const EmptyComponent = () => {
    return (
        <div className="flex-1 w-full flex flex-col items-center h-[calc(100vh_-_108px)]">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
    );
};

export default EmptyComponent;
