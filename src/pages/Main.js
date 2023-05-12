import { useEffect, useState } from 'react'
import axios from 'axios'
import Chat from '../ChatApp'
import config from '../config'
import { message } from 'antd'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'

const App = () => {
    const [documentId, setDocumentId] = useState('')
    const [deleted, setDeleted] = useState(0)
    const [documents, setDocuments] = useState([])
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        axios
            .get(`${config.API_URL}/api/sources/get`, {
                headers: {
                    Authorization: config.ACCESS_TOKEN,
                },
            })
            .then((res) => {
                const documents = res.data.data
                setDocuments(documents)
                if (documents.length) setDocumentId(documents[0].sourceId)
            })
            .catch((error) => {
                setDocuments([])
                console.log(
                    'Failed to call Grain API to get list of collections.'
                )
            })
    }, [deleted])

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
            const newDocuments = documents.map((document) => {
                if (document.sourceId === documentId) {
                    document.name = name
                }
                return document
            })
            setDocuments(newDocuments)
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
            messageApi.success('Chat was deleted')
            setDeleted(deleted + 1)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <MainLayout>
            <div className="flex">
                <div className="flex-none h-screen pb-4 w-0 sm:w-64 bg-[#001529] text-[rgba(255,255,255,0.65)] overflow-y-auto">
                    <SideBar
                        documents={documents}
                        documentId={documentId}
                        onSelectDocumentHandler={onSelectDocumentHandler}
                    />
                </div>
                {documentId ? (
                    <div className="w-full">
                        <Header
                            onRenameHandler={onRenameHandler}
                            onDeleteHandler={onDeleteHandler}
                        />
                        <Chat documentId={documentId} />
                        {contextHolder}
                    </div>
                ) : (
                    <div className="text-center w-full text-2xl">
                        Please select a property to chat with PDF
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default App
