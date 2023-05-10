import Chat from './Chat'
import React, { useEffect, useState } from 'react'

const App = ({ documents, documentId, onSelectDocumentHandler }) => {
    const [activeDocumentId, setActiveDocumentId] = useState('')

    const onChangeHandler = (activeDocumentId) => {
        onSelectDocumentHandler(activeDocumentId)
        setActiveDocumentId(activeDocumentId)
    }

    useEffect(() => {
        setActiveDocumentId(documentId)
    }, [documentId])

    return (
        <>
            {documents.map((document, index) => (
                <Chat
                    key={index}
                    active={activeDocumentId === document.sourceId}
                    document={document}
                    onChangeHandler={onChangeHandler}
                ></Chat>
            ))}
        </>
    )
}

export default App
