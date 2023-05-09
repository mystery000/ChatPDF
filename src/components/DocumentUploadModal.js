import axios from 'axios'
import FormData from 'form-data'
import React, { useState } from 'react'
import DocumentUpload from './DocumentUpload'

export default function App({ collectionID, onUploadDocumentHandler }) {
    const [showModal, setShowModal] = React.useState(false)
    const [selectedFile, setSelectedFile] = useState(undefined)

    const onSelectHandler = (file) => {
        setSelectedFile(file)
    }
    const onUploadHandler = () => {
        setShowModal(false)
        if (selectedFile) {
            // Collection Upload: Uploads a document to the specified collection
            const form = new FormData()
            form.append('file', selectedFile)
            axios
                .post(
                    `https://api.usegrain.co/v1/collections/${collectionID}/upload`,
                    form,
                    {
                        headers: {
                            Authorization:
                                'Bearer 370bde20-db9b-4f07-ad0e-377f75e43581',
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        onUploadDocumentHandler(response.data)
                    }
                })
                .catch((error) =>
                    console.log('Failed to call Grain API: Collection Upload')
                )
        }
    }
    return (
        <>
            <button
                className="m-2 bg-white/20 text-white border border-dashed hover:border-indigo-500 font-semibold text-sm hover:text-white py-1 px-2 rounded"
                onClick={() => setShowModal(true)}
            >
                + Add a Document
            </button>
            {showModal ? (
                <>
                    <div className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-10">
                        <div className="relative my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add a Document
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {/* <input
                                        type="text"
                                        placeholder="Document Name"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 min-w-[500px]"
                                    /> */}
                                    <DocumentUpload
                                        onSelectHandler={onSelectHandler}
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-3 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-white bg-emerald-500  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onUploadHandler}
                                    >
                                        Add Document
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
