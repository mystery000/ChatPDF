import axios from 'axios'
import Config from '../config'
import FormData from 'form-data'
import React, { useState } from 'react'
import { Form, Input, Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

export default function App({ handleUploadSource }) {
    const { API_URL, ACCESS_TOKEN } = Config
    const [showModal, setShowModal] = useState(false)
    const [form] = Form.useForm()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(false)

    return (
        <>
            <button
                className="bg-white/20 text-white border border-dashed hover:border-indigo-500 font-bold uppercase text-sm px-12 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150"
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
                            const propertyName = values.propertyName
                            const fileList = values.dragger.fileList
                            try {
                                setLoading(true)
                                // Create from to upload files into server
                                const formData = new FormData()
                                formData.append('sourceName', propertyName)
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
                                    }
                                )
                                const { sourceId } = response.data
                                handleUploadSource({
                                    sourceId: sourceId,
                                    name: propertyName,
                                })
                                setLoading(false)
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
                    <Form.Item
                        name="propertyName"
                        label="Property Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name of property',
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
            </Modal>
        </>
    )
}
