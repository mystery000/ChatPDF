import { useEffect, useState } from 'react'
import axios from 'axios'
import Config from '../config'
import { FaRegFilePdf } from 'react-icons/fa'
import DocumentUploader from './DocumentUploader'
import { Progress } from 'antd'

const DocumentList = ({ sourceId }) => {
    const [documents, setDocuments] = useState([])
    const { API_URL, ACCESS_TOKEN } = Config
    useEffect(() => {
        axios
            .get(`${API_URL}/sources/${sourceId}`, {
                headers: { Authorization: ACCESS_TOKEN },
            })
            .then((res) => {
                const docs = res.data.documents
                setDocuments(docs)
            })
            .catch(console.log)
    }, [sourceId])

    const handleUploadDocument = (documents) => {
        setDocuments((prev) => [...prev, ...documents])
    }

    return (
        <div className="text-center">
            <div className="border-l-2 ml-6 border-l-gray-500">
                {documents.map((document, key) => (
                    <div
                        key={key}
                        className={`flex items-center text-center px-3 py-2 m-1 w-[96%] transition-colors duration-600 hover:text-white focus:outline-none text-sm cursor-pointer`}
                    >
                        <FaRegFilePdf />
                        <div className="text-left">
                            <h1 className="w-40 ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                {document}
                            </h1>
                        </div>
                    </div>
                ))}
                {/* <Progress percent={100} size="small" className="w-5/6 m-0" /> */}
                <DocumentUploader
                    sourceId={sourceId}
                    handleUploadDocument={handleUploadDocument}
                />
            </div>
        </div>
    )
}

export default DocumentList
