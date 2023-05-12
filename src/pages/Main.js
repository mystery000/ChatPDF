import axios from 'axios'
import Chat from '../ChatApp'
import config from '../config'
import { useState } from 'react'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'
import Header from '../components/Header'

const App = () => {
    const [documentId, setDocumentId] = useState('src_fuNArpxv3W05o5QMqkHpQ')
    const [updated, setUpdated] = useState(0)

    const onSelectDocumentHandler = (documentId) => {
        setDocumentId(documentId)
    }
    const onRenameHandler = async (name) => {
        const data = { sourceId: documentId, name }

        try {
            const response = await axios.put(
                `${config.API_URL}/api/sources/update`,
                data,
                {
                    headers: {
                        Authorization: config.ACCESS_TOKEN,
                    },
                }
            )
            setUpdated(updated + 1)
        } catch (e) {
            console.log(e)
        }
    }
    const onDeleteHandler = async () => {
        try {
            const response = await axios.delete(
                `${config.API_URL}/api/sources/${documentId}`,
                {
                    headers: {
                        Authorization: config.ACCESS_TOKEN,
                    },
                }
            )
            setUpdated(updated + 1)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <MainLayout>
            <div className="flex">
                <div className="flex-none h-screen pb-4 w-0 sm:w-64 bg-[#001529] text-[rgba(255,255,255,0.65)] overflow-y-auto">
                    <SideBar
                        documentId={documentId}
                        onSelectDocumentHandler={onSelectDocumentHandler}
                        updated={updated}
                    />
                </div>
                <div className="w-full">
                    <Header
                        onRenameHandler={onRenameHandler}
                        onDeleteHandler={onDeleteHandler}
                    />
                    <Chat documentId={documentId} />
                </div>
            </div>
        </MainLayout>
    )
}

export default App
