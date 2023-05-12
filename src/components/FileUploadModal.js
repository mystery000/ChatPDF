import axios from 'axios'
import config from '../config'
import FormData from 'form-data'
import React, { useState } from 'react'
import { Alert, Input, Modal, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

export default function App({ onUploadHandler }) {
    const [documentName, setDocumentName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const onChangeHandler = ({ file }) => {
        setSelectedFile([file])
        setDocumentName(file.name)
    }
    const onCancelUploadModal = () => {
        setShowModal(false)
        setDocumentName('')
        setSelectedFile([])
    }
    const onUploadPropertyHandler = async () => {
        if (selectedFile.length && documentName) {
            try {
                const form = new FormData()
                form.append('file', selectedFile[0])
                form.append('name', documentName)
                const response = await axios.post(
                    `${config.API_URL}/api/sources/add-file`,
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: config.ACCESS_TOKEN,
                        },
                    }
                )
                const sourceId = response.data.data
                onUploadHandler({
                    sourceId: sourceId,
                    name: documentName,
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            setErrorMsg('Please fill all fields.')
        }
        onCancelUploadModal()
    }

    const handleChange = (e) => {
        setDocumentName(e.target.value)
    }
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
                title="Add a property"
                style={{
                    top: '10%',
                }}
                open={showModal}
                onOk={onUploadPropertyHandler}
                onCancel={onCancelUploadModal}
                okButtonProps={{
                    className: 'bg-blue-600',
                }}
            >
                <Input
                    placeholder="Property name..."
                    className="mt-2 mb-4"
                    onChange={handleChange}
                    value={documentName}
                />
                <Dragger
                    beforeUpload={() => false}
                    onChange={onChangeHandler}
                    accept="application/pdf"
                    fileList={selectedFile}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                </Dragger>
            </Modal>
        </>
    )
}
