import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Spin, message, Dropdown, Popconfirm, Form, Modal, Input } from "antd";
import { FilePdfOutlined, PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BsChatLeftDots, BsThreeDotsVertical } from "react-icons/bs";
import { Document, Page, pdfjs } from "react-pdf";

import { getSources } from "../../../../redux/source/sourceSlice";
import { deleteDocument, getDocuments, updateDocument } from "../../../../redux/document/documentSlice";
import { setStorage, getStorage, getItem } from "../../../../helpers";
import { setSelectedSource } from "../../../../redux/app/appSlice";
import DocumentUploadModal from "../Modals/DocumentUploadModal";

const SourceList = () => {
    useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.js`; });
    const [selectedDocument, setSelectedDocument] = useState({});
    const [openPDFModal, setOpenPDFModal] = useState(false);
    const loading = useSelector((state) => state.source.loading);
    const error = useSelector((state) => state.source.error);
    const sources = useSelector((state) => state.source.sources);
    const documents = useSelector((state) => state.document.documents);
    const uploading = useSelector((state) => state.document.loading);
    const dispatch = useDispatch();
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const [openDocumentUploadModal, setOpenDocumentUploadModal] = useState(false);
    const [openDocumentUpdateModal, setOpenDocumentUpdateModal] = useState(false);
    const [form] = Form.useForm();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const confirm = (e) => {
        console.log(e);
        dispatch(deleteDocument(selectedDocument._id));
    };
    const cancel = (e) => {
        console.log(e);
    };

    const actionItems = [
        {
            key: '1',
            label: <Popconfirm
                title="Delete the document!"
                description="Are you sure to delete this document?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            ><DeleteOutlined /> Delete </Popconfirm>,
        },
        {
            key: '2',
            label: <span onClick={() => setOpenDocumentUpdateModal(true)}><EditOutlined /> Rename</span>,
        },
        {
            key: '3',
            label: <span onClick={() => setOpenPDFModal(true)}><EyeOutlined /> View</span>,
        },
    ];

    const items = sources.map(({ name, sourceId }, index) => {
        const subMenu = documents
            .filter((item) => item.sourceId === sourceId)
            .map((document) =>
                getItem(<div className="flex justify-between items-center"><span className="max-w-[135px] text-ellipsis overflow-hidden" title={document.name}>{document.name}</span> <Dropdown onOpenChange={(open) => {
                    if (open) {
                        setSelectedDocument(document);
                    }
                }} trigger='click' menu={{ items: actionItems }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
                    <div><BsThreeDotsVertical /></div>
                </Dropdown></div>, `${document._id}`, <FilePdfOutlined />, null, true)
            );
        subMenu.push(getItem((uploading == sourceId) ? 'Processing...' : 'Add Document', `addDocument-${index}-${sourceId}`, (uploading == sourceId) ? <Spin size="small" /> : <PlusOutlined />, null))
        if (subMenu.length > 0)
            return getItem(name, `${sourceId}`, <BsChatLeftDots />, subMenu);
        return getItem(name, `${sourceId}`, <BsChatLeftDots />);
    });

    useEffect(() => {
        dispatch(getSources());
        dispatch(getDocuments());
    }, []);

    useEffect(() => {
        let latestKey = getStorage("latestKey") || sources[0]?.sourceId;
        if (latestKey) {
            dispatch(setSelectedSource({ sourceId: latestKey }));
        }
    }, [sources]);

    // useEffect(() => {
    //     if (selectedSource) {

    //     }
    // }, [selectedSource]);

    if (loading) return <div className="text-center text-gray-400">Loading...</div>;

    const onOpenChange = (keys) => {
        if (keys.length < 2) return;
        let key = keys[keys.length - 1];
        dispatch(setSelectedSource({ sourceId: key }));
        setStorage("latestKey", key);
    };

    const handleClick = ({ key }) => {
        if (key.startsWith("addDocument")) {
            if (uploading) {
                return message.warning('Server is busy now. Please wait a moment...');
            }
            setOpenDocumentUploadModal(true);
        }
    }

    return (
        <div>
            <Menu
                openKeys={[`${selectedSource}`]}
                onOpenChange={onOpenChange}
                mode="inline"
                theme="dark"
                items={items}
                selectable={false}
                onClick={handleClick}
            />
            <DocumentUploadModal open={openDocumentUploadModal} onClose={() => setOpenDocumentUploadModal(false)} />
            <Modal
                open={openDocumentUpdateModal}
                title="Change Documents"
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => setOpenDocumentUpdateModal(false)}
                onOk={() => {
                    form.validateFields()
                        .then(async (values) => {
                            dispatch(updateDocument({ ...values, id: selectedDocument._id }));
                            form.resetFields();
                            setOpenDocumentUpdateModal(false);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="documentName"
                        label="Document Name"
                        initialValue={selectedDocument.name}
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of property",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                width={650}
                open={openPDFModal}
                title={selectedDocument.name}
                onCancel={() => setOpenPDFModal(false)}
                footer={[]}
            >
                <div className="w-full">
                    {selectedDocument.path && <Document file={`http://localhost/files/${selectedDocument.path.replace('public/', '')}`} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={1} />
                    </Document>}
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default SourceList;
