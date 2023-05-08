import { useState } from 'react'
import { propertyCollection } from '../data'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ onSelectPropertyHandler }) => {
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

    const onUploadDocumentHandler = (data) => {
        if (data.status === 'success') {
            setProperties((prev) =>
                prev.map((property) => {
                    if (property.collection_id == data.collection_id) {
                        property.documents.push({ file_name: data.filename })
                    }
                    return property
                })
            )
        }
    }

    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer
                properties={properties}
                onUploadDocumentHandler={onUploadDocumentHandler}
                onSelectPropertyHandler={onSelectPropertyHandler}
            />
        </>
    )
}

export default App
