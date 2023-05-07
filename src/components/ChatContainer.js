import Chat from './Chat'
import Document from './Document'
import DocumentUploadModal from './DocumentUploadModal'

const Chats = [
    {
        id: 1,
        name: '9604 Harland Ave',
        documents: [
            { id: 1, name: 'LeaseExample.pdf' },
            { id: 2, name: 'LeaseExample.pdf' },
            { id: 3, name: 'LeaseExample.pdf' },
        ],
    },
    {
        id: 2,
        name: '727 Wilcox Blvd',
        documents: [
            { id: 4, name: 'LeaseExample.pdf' },
            { id: 5, name: 'LeaseExample.pdf' },
        ],
    },
    {
        id: 3,
        name: '9389 Westmoreland St',
        documents: [
            { id: 6, name: 'LeaseExample.pdf' },
            { id: 7, name: 'LeaseExample.pdf' },
            { id: 8, name: 'LeaseExample.pdf' },
            { id: 9, name: 'LeaseExample.pdf' },
            { id: 10, name: 'LeaseExample.pdf' },
        ],
    },
]

const App = () => {
    return (
        <>
            {Chats.map((chat) => (
                <Chat name={chat.name} key={chat.id}>
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
