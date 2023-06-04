import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Progress, Upload, message } from "antd";
import { uploadSource } from "../../../../redux/source/sourceSlice";

const SourceUploader = () => {
    const [form] = Form.useForm();
    const [sources, setSources] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const uploading = useSelector((state) => state.source.uploading);
    const uploadingError = useSelector((state) => state.source.uploadingError);

    return (
        <div className="text-center">
            <button
                className="bg-transparent text-white border border-white border-dashed hover:border-indigo-500 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150 px-14 py-3"
                type="button"
                onClick={() => setShowModal(true)}
            >
                + Add Property
            </button>

            <Modal
                open={showModal}
                title="Add a property"
                okText="Upload"
                cancelText="Cancel"
                onCancel={() => setShowModal(false)}
                onOk={() => {
                    form.validateFields()
                        .then(async (values) => {
                            const propertyName = values.propertyName;
                            const fileList = values.dragger.fileList;
                            // Create from to upload files into server
                            const formData = new FormData();
                            formData.append("sourceName", propertyName);
                            fileList.forEach(({ originFileObj }) => {
                                formData.append("files", originFileObj);
                            });
                            dispatch(uploadSource(formData));
                            form.resetFields();
                            setSources([]);
                            setShowModal(false)
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
                okButtonProps={{ className: "bg-blue-600", loading: uploading }}
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
                            name="files"
                            beforeUpload={() => false}
                            accept="application/pdf"
                            fileList={sources}
                            multiple={true}
                            maxCount={5}
                            onChange={({ fileList }) => {
                                const filterdFiles = fileList.filter(
                                    (file) => file.type === "application/pdf"
                                );
                                setSources(filterdFiles);
                            }}
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
