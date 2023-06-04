import { useState } from "react";
import { MenuUnfoldOutlined, DeleteOutlined, EditOutlined, ClearOutlined, CloseOutlined } from "@ant-design/icons";
import { Drawer, Input, Menu, Modal, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteSource,
    renameSource,
} from "../../../../redux/source/sourceSlice";

import { deleteMessages } from "../../../../redux/message/messageSlice";
import SourceUploader from "../Modals/SourceUploader";
import SideBar from "../SideBar";

const ToolBar = () => {

    const dispatch = useDispatch();
    const deleting = useSelector((state) => state.source.deleting);
    const renaming = useSelector((state) => state.source.renaming);
    const reseting = useSelector((state) => state.source.reseting);
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [propertyName, setPropertyName] = useState("");

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

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
    const handleReset = () => {
        // e.preventDefault();
        dispatch(deleteMessages({ sourceId: selectedSource }));
    };

    const tools = [
        {
            title: "Open Documents",
            label: <span className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]">
                <MenuUnfoldOutlined className="!text-[18px]" />
            </span>,
            className: "!inline sm:!hidden",
            onClick: showDrawer,
        },
        {
            title: "Delete Property",
            label: <Popconfirm
                placement="bottomLeft"
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
                    className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
                >
                    <DeleteOutlined className="!text-[18px]" />
                </span>
            </Popconfirm>
        },
        {
            title: "Rename Property",
            label: <span
                className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
            >
                <EditOutlined className="!text-[18px]" />
            </span>,
            onClick: () => {
                setRenameModalOpen(true);
            },
        },
        {
            title: "Reset chat history",
            label: <span className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
            >
                <ClearOutlined className="!text-[18px]" />
            </span>,
            onClick: handleReset,
        },
    ];

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap p-1">
                <Menu mode="horizontal" className="w-full" selectable={false} items={tools} />
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
            </nav>
            <Drawer title="" placement="left" style={{ backgroundColor: '#001529', color: '#fff' }} onClose={onClose} open={open} closeIcon={<CloseOutlined style={{ color: '#fff' }} />}>
                <SourceUploader />
                <SideBar />
            </Drawer>
        </>
    );
};

export default ToolBar;
