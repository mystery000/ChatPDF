import axios from 'axios'
import config from '../config'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ documents, documentId, onSelectDocumentHandler }) => {
    const [activeDocument, setActiveDocument] = useState('')
    useEffect(() => {
        setActiveDocument(documentId)
    }, [documentId])

    const onUploadHandler = (document) => {
        const newDocument = {
            sourceId: document.sourceId,
            name: document.name,
        }
        documents.push(newDocument)
        setActiveDocument(newDocument.sourceId)
    }

    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer
                documents={documents}
                documentId={activeDocument}
                onSelectDocumentHandler={onSelectDocumentHandler}
            />
        </>
    )
}

export default App
