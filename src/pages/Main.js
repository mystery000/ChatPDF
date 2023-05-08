import Chat from '../ChatApp'
import { useState } from 'react'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'
import Navigation from '../components/Navigation'
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
                    <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-72 w-64 dark:bg-gray-900 dark:border-gray-700">
                        <div className="mt-8 space-y-4">
                            <SideBar
                                onSelectPropertyHandler={
                                    onSelectPropertyHandler
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <Navigation />
                        <Chat collectionId={collectionId} />
                    </div>
                </div>
            </MainLayout>
        </ApiKeyProvider>
    )
}

export default App
