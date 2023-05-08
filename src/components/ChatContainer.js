import Chat from './Chat'
import Document from './Document'
import DocumentUploadModal from './DocumentUploadModal'

const App = ({ properties }) => {
    return (
        <>
            {properties.map((property, index) => (
                <Chat name={property.filename} key={index}>
                    <hr></hr>
                    {property.documents.map((document, index) => (
                        <Document name={document.file_name} key={index} />
                    ))}
                    <div className="px-5 text-center">
                        <DocumentUploadModal />
                    </div>
                </Chat>
            ))}
        </>
    )
}

export default App
