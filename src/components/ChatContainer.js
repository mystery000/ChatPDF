import Chat from './Chat'
import React, { useEffect, useState } from 'react'

const App = ({ sources, sourceId, onSelectSourceHandler }) => {
    const [activeSourceId, setActiveSourceId] = useState('')

    const onChangeHandler = (activeId) => {
        onSelectSourceHandler(activeId)
        setActiveSourceId(activeId)
    }

    useEffect(() => {
        setActiveSourceId(sourceId)
    }, [sourceId])

    return (
        <>
            {sources.map((source, index) => (
                <Chat
                    key={index}
                    active={activeSourceId === source.sourceId}
                    source={source}
                    onChangeHandler={onChangeHandler}
                ></Chat>
            ))}
        </>
    )
}

export default App
