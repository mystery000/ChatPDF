import Chat from '../ChatApp'
import { useState } from 'react'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'
import ChatHeader from '../components/ChatHeader'
import { ApiKeyProvider } from '../context/ApiKeyContext'

const App = () => {
    const [collectionId, setCollectionId] = useState('')

    const onSelectPropertyHandler = (collectionId) => {
        setCollectionId(collectionId)
    }

    return (
        <ApiKeyProvider value="Bearer 370bde20-db9b-4f07-ad0e-377f75e43581">
            <MainLayout>
                <div className="flex">
                    <div className="flex-none h-screen py-4 w-0 sm:w-64 bg-[#001529] text-[rgba(255,255,255,0.65)] overflow-y-auto">
                        <SideBar
                            onSelectPropertyHandler={onSelectPropertyHandler}
                        />
                    </div>
                    <div className="w-full">
                        <ChatHeader />
                        <div className="px-0 sm:px-[10%]">
                            <Chat collectionId={collectionId} />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ApiKeyProvider>
    )
}

export default App
