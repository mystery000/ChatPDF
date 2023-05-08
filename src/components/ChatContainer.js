import Chat from './Chat'
import Document from './Document'
import DocumentUploadModal from './DocumentUploadModal'

const App = ({
    properties,
    onUploadDocumentHandler,
    onSelectPropertyHandler,
}) => {
    return (
        <>
            {properties.map((property, index) => (
                <Chat
                    property={property}
                    onSelectPropertyHandler={onSelectPropertyHandler}
                    key={index}
                >
                    <hr></hr>
                    {property.documents.map((document, index) => (
                        <Document name={document.file_name} key={index} />
                    ))}
                    <div className="px-5 text-center">
                        <DocumentUploadModal
                            collectionID={property.collection_id}
                            onUploadDocumentHandler={onUploadDocumentHandler}
                        />
                    </div>
                </Chat>
            ))}
        </>
    )
}

export default App
