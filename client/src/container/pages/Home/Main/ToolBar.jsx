import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Input, Menu, Modal, Popconfirm } from "antd";
import { MenuUnfoldOutlined, DeleteOutlined, EditOutlined, ClearOutlined, CloseOutlined } from "@ant-design/icons";

import {
    deleteSource,
    renameSource,
} from "../../../../redux/source/sourceSlice";
import UserMenu from "../../../layouts/partials/UserMenu";
import SideBar from "../SideBar";
import { deleteMessages } from "../../../../redux/message/messageSlice";
import SourceUploader from "../Modals/SourceUploader";

const ToolBar = () => {

    const location = useLocation();
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
                    <DeleteOutlined className="!text-[18px]" /> Delete
                </span>
            </Popconfirm>
        },
        {
            title: "Rename Property",
            label: <span
                className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
            >
                <EditOutlined className="!text-[18px]" /> Rename
            </span>,
            onClick: () => {
                setRenameModalOpen(true);
            },
        },
        {
            title: "Reset chat history",
            label: <span className="cursor-pointer inline-block px-1 hover:text-[#40a9ff]"
            >
                <ClearOutlined className="!text-[18px]" /> Reset chat history
            </span>,
            onClick: handleReset,
        },
    ];

    return (
        <>
            <div className="w-full sticky flex items-center justify-between flex-wrap p-1 shadow left-0 top-0 bg-white">
                <Menu mode="horizontal" className="w-1/2 border-0" selectable={false} items={tools} />
                <div className="w-1/2 flex justify-end pr-2">
                    {location.pathname == '/home' && <UserMenu />}
                </div>
            </div>
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
            <Drawer title="" width={250} placement="left" style={{ backgroundColor: '#001529', color: '#fff' }} bodyStyle={{ padding: 0 }} onClose={onClose} open={open} closeIcon={<CloseOutlined style={{ color: '#fff' }} />}>
                <SourceUploader />
                <SideBar />
            </Drawer>
        </>
    );
};

export default ToolBar;
