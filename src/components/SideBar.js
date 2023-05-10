import axios from 'axios'
import config from '../config'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ documentId, onSelectDocumentHandler }) => {
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        axios
            .get(`${config.API_URL}/api/sources/get`, {
                headers: {
                    Authorization: config.ACCESS_TOKEN,
                },
            })
            .then((res) => {
                setDocuments(res.data.data)
            })
            .catch((error) => {
                setDocuments([])
                console.log(
                    'Failed to call Grain API to get list of collections.'
                )
            })
    }, [])

    const onUploadHandler = (document) => {
        const newDocument = {
            sourceId: document.sourceId,
            name: document.name,
        }
        setDocuments((prev) => [...prev, newDocument])
    }

    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer
                documents={documents}
                documentId={documentId}
                onSelectDocumentHandler={onSelectDocumentHandler}
            />
        </>
    )
}

export default App
