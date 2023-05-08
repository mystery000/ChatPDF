import axios from 'axios'
import FormData from 'form-data'
import FileUpload from './FileUpload'
import React, { useState } from 'react'

export default function App() {
    const [filename, setFileName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const onSelectHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    const onUploadDocumentHandler = () => {
        setShowModal(false)
        if (selectedFile) {
            const form = new FormData()
            form.append('file', selectedFile)
            console.log(selectedFile)
            axios
                .post('https://api.usegrain.co/v1/documents/upload', form, {
                    headers: {
                        Authorization:
                            'Bearer 370bde20-db9b-4f07-ad0e-377f75e43581',
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    // send response data as props to anywhere so that it can use them.
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    return (
        <>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                + Add Property
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none min-w-10">
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
                                        defaultValue={filename}
                                        placeholder="Property Name"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 min-w-[500px]"
                                    />
                                    <FileUpload
                                        onSelectHandler={onSelectHandler}
                                    />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={onUploadDocumentHandler}
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
