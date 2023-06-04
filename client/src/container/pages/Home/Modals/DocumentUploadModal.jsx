import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Progress, Upload, message } from "antd";
import { uploadSource } from "../../../../redux/source/sourceSlice";

const DocumentUploadModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [sources, setSources] = useState([]);
    const dispatch = useDispatch();

    const uploading = useSelector((state) => state.source.uploading);
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const uploadingError = useSelector((state) => state.source.uploadingError);

    return (
        <Modal
            open={open}
            title="Add a Documents"
            okText="Upload"
            cancelText="Cancel"
            onCancel={() => onClose()}
            onOk={() => {
                form.validateFields()
                    .then(async (values) => {
                        const fileList = values.dragger.fileList;
                        // Create from to upload files into server
                        const formData = new FormData();
                        formData.append("sourceId", selectedSource);
                        fileList.forEach(({ originFileObj }) => {
                            formData.append("files", originFileObj);
                        });
                        dispatch(uploadSource(formData));
                        form.resetFields();
                        setSources([]);
                        onClose();
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
            okButtonProps={{ loading: uploading }}
        >
            <Form form={form} layout="vertical">
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
    );
};

export default DocumentUploadModal;
