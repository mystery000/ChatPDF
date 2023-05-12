import axios from 'axios'
import config from '../config'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ documents, documentId, onSelectDocumentHandler }) => {
    const chats = documents

    const onUploadHandler = (document) => {
        const newDocument = {
            sourceId: document.sourceId,
            name: document.name,
        }
        chats.push(newDocument)
    }

    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer
                documents={chats}
                documentId={documentId}
                onSelectDocumentHandler={onSelectDocumentHandler}
            />
        </>
    )
}

export default App
