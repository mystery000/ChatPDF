import axios from 'axios'
import config from '../config'
import FormData from 'form-data'
import FileUpload from './FileUpload'
import React, { useState } from 'react'

export default function App({ onUploadHandler }) {
    const [documentName, setDocumentName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState(undefined)

    const onSelectHandler = (file) => {
        setSelectedFile(file)
        setDocumentName(file.name)
    }

    const onUploadPropertyHandler = async () => {
        setShowModal(false)
        if (selectedFile && documentName.length > 0) {
            try {
                const form = new FormData()
                form.append('file', selectedFile)
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
        }
    }

    return (
        <>
            <button
                className="bg-white/20 text-white border border-dashed hover:border-indigo-500 font-bold uppercase text-sm px-12 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                + Add Property
            </button>
            {showModal ? (
                <>
                    <div className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-10">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add a Property
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <input
                                        type="text"
                                        value={documentName ?? ''}
                                        placeholder="Property Name"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 min-w-[500px]"
                                        onChange={(e) =>
                                            setDocumentName(e.target.value)
                                        }
                                    />
                                    <FileUpload
                                        onSelectHandler={onSelectHandler}
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-white bg-emerald-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onUploadPropertyHandler}
                                    >
                                        Add Property
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
