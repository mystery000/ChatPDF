import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ sources, sourceId, onSelectSourceHandler }) => {
    const [activeSource, setActiveSource] = useState('')
    useEffect(() => {
        setActiveSource(sourceId)
    }, [sourceId])

    const onUploadHandler = (source) => {
        const newSource = {
            name: source.name,
            sourceId: source.sourceId,
        }
        sources.push(newSource)
        setActiveSource(newSource.sourceId)
        onSelectSourceHandler(newSource.sourceId)
    }

    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer
                sources={sources}
                sourceId={activeSource}
                onSelectSourceHandler={onSelectSourceHandler}
            />
        </>
    )
}

export default App
