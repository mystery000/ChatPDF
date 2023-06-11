import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Progress, Spin, Upload, message } from "antd";

import { addSource } from "../../../../redux/source/sourceSlice";
import constants from "../../../../config/constants";
import { getStorage } from "../../../../helpers";
import { deleteFile } from "../../../../services/sourceAPI";

const SourceUploader = () => {
    const [form] = Form.useForm();
    const [sources, setSources] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const uploading = useSelector((state) => state.source.uploading);
    const uploadingError = useSelector((state) => state.source.uploadingError);
    const onRemove = ((file) => {
        if(file.path) {
            deleteFile({path: file.path});
        }
    });


    return (
        <div className="text-center">
            <button
                className="bg-transparent text-white border border-white border-dashed hover:border-indigo-500 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150 px-12 py-3 cursor-pointer flex items-center"
                type="button"
                onClick={() => setShowModal(true)}
            >
                {!uploading && (<><PlusOutlined className="text-white mr-1" /> Add Property</>)}
                {uploading && (<><Spin size="small" className="mr-1" /> Processing...</>)}
            </button>

            <Modal
                open={showModal}
                title="Add a property"
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => setShowModal(false)}
                onOk={() => {
                    form.validateFields()
                        .then(async (values) => {
                            const sourceName = values.propertyName;
                            const fileList = values.dragger.fileList.filter(file => file.status == 'done').map(file => ({path: file.path, filename: file.response.filename}));
                            if(fileList.length == 0) return message.error('No files uploaded.');
                            dispatch(addSource({sourceName, fileList}));
                            form.resetFields();
                            setSources([]);
                            setShowModal(false);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
                okButtonProps={{ loading: uploading }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="propertyName"
                        label="Property Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of property",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="dragger" label="dragger" noStyle>
                        <Upload.Dragger
                            name="file"
                            action={`${constants.HOST_URL}sources/uploadFile`}
                            accept="application/pdf"
                            headers={{
                                Authorization: getStorage('token')
                            }}
                            fileList={sources}
                            multiple={true}
                            maxCount={5}
                            onChange={({ fileList, file }) => {
                                if(file.status == 'done') {
                                    file.path = file.response?.path;
                                }
                                const filterdFiles = fileList.filter(
                                    (file) => file.type === "application/pdf"
                                );
                                setSources(filterdFiles);
                            }}
                            onRemove={onRemove}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SourceUploader;
