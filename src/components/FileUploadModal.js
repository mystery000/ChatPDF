import axios from 'axios'
import config from '../config'
import FormData from 'form-data'
import React, { useState } from 'react'
import { Form, Input, Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

export default function App({ onUploadHandler }) {
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
                            const file = values.dragger.file
                            try {
                                const form = new FormData()
                                form.append('file', file)
                                form.append('name', propertyName)
                                setLoading(true)
                                const response = await axios.post(
                                    `${config.API_URL}/api/sources/add-file`,
                                    form,
                                    {
                                        headers: {
                                            'Content-Type':
                                                'multipart/form-data',
                                            Authorization: config.ACCESS_TOKEN,
                                        },
                                    }
                                )
                                const sourceId = response.data.data
                                onUploadHandler({
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
                            messageApi.warning('Please upload a PDF file')
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
                                        'Please selece PDF file.'
                                    )
                                }
                                setUploadedFiles(filterdFiles)
                            }}
                            maxCount={1}
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
