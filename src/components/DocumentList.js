import axios from 'axios'
import Document from './Document'
import ApiKeyContext from '../context/ApiKeyContext'
import DocumentUploadModal from './DocumentUploadModal'
import { useContext, useEffect, useState } from 'react'

const DocumentList = ({ collectionID }) => {
    const [documents, setDocuments] = useState([])
    const ApiKey = useContext(ApiKeyContext)

    // console.log(collectionID, ApiKey)
    useEffect(() => {
        axios
            .get(
                `https://api.usegrain.co/v1/collections/${collectionID}/documents/list`,
                {
                    headers: {
                        Authorization: ApiKey,
                    },
                }
            )
            .then((res) => {
                setDocuments(res.data.documents)
            })
            .catch((error) =>
                console.log(
                    'Failed to call Grain API to get the list of documents'
                )
            )
    }, [ApiKey])

    const onUploadDocumentHandler = (document) => {
        const newDocumentPayload = {
            file_name: document.filename,
        }
        setDocuments((prev) => [...prev, newDocumentPayload])
    }

    return (
        <>
            {documents.map((document, index) => (
                <Document key={index} name={document.file_name} />
            ))}
            <div className="px-5 text-center">
                <DocumentUploadModal
                    collectionID={collectionID}
                    onUploadDocumentHandler={onUploadDocumentHandler}
                />
            </div>
        </>
    )
}

export default DocumentList
