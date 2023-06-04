import { useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClear } from "react-icons/ai";
import { Input, Modal, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteSource,
    renameSource,
} from "../../../../redux/source/sourceSlice";

import { deleteMessages } from "../../../../redux/message/messageSlice";

const ToolBar = () => {
    const dispatch = useDispatch();
    const deleting = useSelector((state) => state.source.deleting);
    const renaming = useSelector((state) => state.source.renaming);
    const reseting = useSelector((state) => state.source.reseting);
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [propertyName, setPropertyName] = useState("");

    const handleChange = (e) => {
        setPropertyName(e.target.value);
    };

    const handleOK = () => {
        dispatch(
            renameSource({ name: propertyName, sourceId: selectedSource })
        );
        setPropertyName("");
        setRenameModalOpen(false);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSource({ sourceId: selectedSource }));
    };
    const handleReset = (e) => {
        e.preventDefault();
        dispatch(deleteMessages({ sourceId: selectedSource }));
    };

    return (
        <nav className="flex items-center justify-between flex-wrap p-1">
            <div className="block lg:hidden">
                <button className="cursor-point">
                    <TbDotsVertical color="rgb(153, 153, 153)" size={22} />
                </button>
            </div>
            <div className="w-full hidden flex-grow lg:block lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow text-[#888] p-1">
                    <Popconfirm
                        placement="bottomLeft"
                        title={"Delete Property"}
                        description={
                            "Are you sure you want to delete this property?"
                        }
                        onConfirm={handleDelete}
                        okText="Yes"
                        okButtonProps={{
                            className:
                                "bg-red-600 hover:!bg-red-500 text-white",
                        }}
                        cancelText="No"
                        icon={false}
                    >
                        <span
                            title="Delete Property"
                            className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
                        >
                            <AiOutlineDelete size={20} />
                        </span>
                    </Popconfirm>
                    <span
                        title="Rename Property"
                        className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
                        onClick={() => setRenameModalOpen(true)}
                    >
                        <AiOutlineEdit size={20} />
                    </span>
                    <Modal
                        title="Rename Property"
                        style={{
                            top: "10%",
                        }}
                        open={renameModalOpen}
                        onOk={handleOK}
                        onCancel={() => setRenameModalOpen(false)}
                        okButtonProps={{
                            className: "bg-blue-600",
                        }}
                    >
                        <Input
                            placeholder="Input property name..."
                            className="mt-2"
                            onChange={handleChange}
                            value={propertyName}
                        />
                    </Modal>
                    <span
                        title="Reset chat history"
                        className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
                        onClick={handleReset}
                    >
                        <AiOutlineClear size={20} />
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default ToolBar;
