import Chat from './Chat'
import React, { useEffect, useState } from 'react'

const App = ({ sources, sourceId, handleSelectSource }) => {
    const [activeSourceId, setActiveSourceId] = useState('')

    const handleChange = (activeId) => {
        handleSelectSource(activeId)
        setActiveSourceId(activeId)
    }

    useEffect(() => {
        setActiveSourceId(sourceId)
    }, [sourceId])

    return (
        <>
            {sources.map((source) => (
                <Chat
                    key={source.sourceId}
                    active={activeSourceId === source.sourceId}
                    source={source}
                    handleChange={handleChange}
                ></Chat>
            ))}
        </>
    )
}

export default App
