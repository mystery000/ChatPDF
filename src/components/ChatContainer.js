import Chat from './Chat'
import { chats } from '../data'
import Document from './Document'
import DocumentUploadModal from './DocumentUploadModal'

const App = () => {
    return (
        <>
            {chats.map((chat) => (
                <Chat name={chat.name} key={chat.id}>
                    <hr></hr>
                    {chat.documents.map((document) => (
                        <Document name={document.name} key={document.id} />
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
