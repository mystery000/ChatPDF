import { Empty } from "antd";

const EmptyComponent = () => {
    return (
        <div className="flex-1 w-full flex flex-col items-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
    );
};

export default EmptyComponent;
