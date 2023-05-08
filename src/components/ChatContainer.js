import Chat from './Chat'
import DocumentList from './DocumentList'
import DocumentUploadModal from './DocumentUploadModal'

const App = ({ properties, onSelectPropertyHandler }) => {
    return (
        <>
            {properties.map((property, index) => (
                <Chat
                    key={index}
                    property={property}
                    onSelectPropertyHandler={onSelectPropertyHandler}
                >
                    <DocumentList collectionID={property.id} />
                </Chat>
            ))}
        </>
    )
}

export default App
