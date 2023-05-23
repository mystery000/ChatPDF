import axios from 'axios'
import Config from '../config'
import FormData from 'form-data'
import React, { useState } from 'react'
import { Form, Modal, Progress, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

export default function App({ sourceId, handleUploadDocument }) {
    const { API_URL, ACCESS_TOKEN } = Config
    const [showModal, setShowModal] = useState(false)
    const [form] = Form.useForm()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    return (
        <>
            <button
                className="bg-white/20 border border-dashed hover:border-indigo-500 uppercase text-xs px-12 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                + Add Documents
            </button>

            <Modal
                open={showModal}
                title="Add Documents"
                okText="Upload"
                cancelText="Cancel"
                onCancel={() => setShowModal(false)}
                onOk={() => {
                    form.validateFields()
                        .then(async (values) => {
                            const fileList = values.dragger.fileList
                            try {
                                setLoading(true)
                                // Create from to upload files into server
                                const formData = new FormData()
                                formData.append('sourceId', sourceId)
                                fileList.forEach(({ originFileObj }) => {
                                    formData.append('files', originFileObj)
                                })
                                const response = await axios.post(
                                    `${API_URL}/sources/upload`,
                                    formData,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                            Authorization: ACCESS_TOKEN,
                                        },
                                        onUploadProgress: (data) => {
                                            setUploadProgress(
                                                Math.round(
                                                    (100 * data.loaded) /
                                                        data.total
                                                )
                                            )
                                        },
                                    }
                                )
                                const { documents } = response.data
                                handleUploadDocument(documents)
                                setLoading(false)
                                setUploadProgress(0)
                            } catch (err) {
                                console.log(err)
                                setLoading(false)
                            }

                            form.resetFields()
                            setUploadedFiles([])
                            setShowModal(false)
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info)
                            messageApi.warning('Please upload PDF files')
                        })
                }}
                okButtonProps={{ className: 'bg-blue-600', loading: loading }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="dragger" className="mt-6">
                        <Upload.Dragger
                            name="files"
                            beforeUpload={() => false}
                            accept="application/pdf"
                            fileList={uploadedFiles}
                            onChange={({ fileList }) => {
                                const filterdFiles = fileList.filter(
                                    (file) => file.type === 'application/pdf'
                                )
                                if (fileList[0] && !filterdFiles.length) {
                                    form.resetFields(['dragger'])
                                    messageApi.warning(
                                        'Please select PDF file.'
                                    )
                                }
                                setUploadedFiles(filterdFiles)
                            }}
                            multiple={true}
                            maxCount={5}
                            progress={{ strokeWidth: 2, showInfo: false }}
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
                {contextHolder}

                <Progress
                    percent={uploadProgress}
                    strokeColor="#1677ff"
                    format={(percent) => percent + '%'}
                    status="active"
                    // className={uploadProgress ? 'block' : 'hidden'}
                />
            </Modal>
        </>
    )
}
