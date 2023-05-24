import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ sources, sourceId, handleSelectSource }) => {
    const [activeSource, setActiveSource] = useState('')
    useEffect(() => {
        setActiveSource(sourceId)
    }, [sourceId])

    const handleUploadSource = (source) => {
        const newSource = {
            name: source.name,
            sourceId: source.sourceId,
        }
        sources.push(newSource)
        setActiveSource(newSource.sourceId)
        handleSelectSource(newSource.sourceId)
    }

    return (
        <>
            <FileUploadModal handleUploadSource={handleUploadSource} />
            <ChatContainer
                sources={sources}
                sourceId={activeSource}
                handleSelectSource={handleSelectSource}
            />
        </>
    )
}

export default App
