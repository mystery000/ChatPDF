import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Modal, Upload, message } from "antd";
import { uploadDocument } from "../../../../redux/document/documentSlice";
import { getStorage } from "../../../../helpers";
import constants from "../../../../config/constants";
import { deleteFile } from "../../../../services/sourceAPI";

const DocumentUploadModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [sources, setSources] = useState([]);
    const dispatch = useDispatch();

    const uploading = useSelector((state) => state.document.loading);
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const uploadingError = useSelector((state) => state.source.uploadingError);

    const onRemove = ((file) => {
        if (file.path) {
            deleteFile({ path: file.path });
        }
    });

    return (
        <Modal
            open={open}
            title="Add a Documents"
            okText="Submit"
            cancelText="Cancel"
            onCancel={() => onClose()}
            onOk={() => {
                form.validateFields()
                    .then(async (values) => {
                        const fileList = values.dragger.fileList.filter(file => file.status == 'done').map(file => ({ path: file.path, filename: file.response.filename }));
                        if (fileList.length == 0) return message.error('No files uploaded.');
                        dispatch(uploadDocument({ fileList, sourceId: selectedSource }));
                        form.resetFields();
                        setSources([]);
                        onClose();
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
            okButtonProps={{ loading: !!uploading }}
        >
            <Form form={form} layout="vertical">
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
                            if (file.status == 'done') {
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
    );
};

export default DocumentUploadModal;
