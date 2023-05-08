import { useState } from 'react'
import { propertyCollection } from '../data'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = () => {
    const [properties, setProperties] = useState(propertyCollection)
    const onUploadHandler = (property) => {
        const newProperty = {
            filename: property.name,
            collection_id: property.collection_id,
            documents: [
                {
                    file_name: property.document_name,
                },
            ],
        }
        setProperties((prev) => [...prev, newProperty])
    }
    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer properties={properties} />
        </>
    )
}

export default App
