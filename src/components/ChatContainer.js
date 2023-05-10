import Chat from './Chat'
import React, { useState } from 'react'

const App = ({ documents, onSelectDocumentHandler }) => {
    const [activeDocumentId, setActiveDocumentId] = useState('')

    const onChangeHandler = (activeDocumentId) => {
        onSelectDocumentHandler(activeDocumentId)
        setActiveDocumentId(activeDocumentId)
    }

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
