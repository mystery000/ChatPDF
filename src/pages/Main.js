import Chat from '../ChatApp'
import { useState } from 'react'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'
import Header from '../components/Header'

const App = () => {
    const [documentId, setDocumentId] = useState('src_s31d9cr0J6jvSPCcWFYhB')

    const onSelectDocumentHandler = (documentId) => {
        setDocumentId(documentId)
    }

    return (
        <MainLayout>
            <div className="flex">
                <div className="flex-none h-screen py-4 w-0 sm:w-64 bg-[#001529] text-[rgba(255,255,255,0.65)] overflow-y-auto">
                    <SideBar
                        documentId={documentId}
                        onSelectDocumentHandler={onSelectDocumentHandler}
                    />
                </div>
                <div className="w-full">
                    <Header />
                    <div className="px-0 sm:px-[10%]">
                        <Chat documentId={documentId} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default App
