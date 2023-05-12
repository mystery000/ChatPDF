import axios from 'axios'
import config from '../config'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ documents, documentId, onSelectDocumentHandler }) => {
    const [updated, setUpdated] = useState(0)

    const onUploadHandler = (document) => {
        const newDocument = {
            sourceId: document.sourceId,
            name: document.name,
        }
        documents.push(newDocument)
        documentId = newDocument.sourceId
        setUpdated(updated + 1)
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
