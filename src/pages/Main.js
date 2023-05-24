import { useEffect, useState } from 'react'
import axios from 'axios'
import Chat from '../ChatApp'
import Config from '../config'
import { message } from 'antd'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'

const Main = () => {
    const [sourceId, setSourceId] = useState('')
    const [deleted, setDeleted] = useState(0)
    const [isUpdate, setIsUpdate] = useState(false)
    const [sources, setSources] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const { API_URL, ACCESS_TOKEN } = Config

    useEffect(() => {
        axios
            .get(`${API_URL}/sources`, {
                headers: {
                    Authorization: ACCESS_TOKEN,
                },
            })
            .then((res) => {
                const sources = res.data.sources
                setSources(sources)
                if (sources.length) setSourceId(sources[0].sourceId)
            })
            .catch((error) => {
                setSources([])
                console.log(
                    'Failed to call Grain API to get list of collections.'
                )
            })
    }, [deleted])

    const handleSelectSource = (sourceId) => {
        setSourceId(sourceId)
    }
    const handleRename = async (name) => {
        const payload = { name: name }
        try {
            const response = await axios.put(
                `${API_URL}/sources/${sourceId}`,
                payload,
                {
                    headers: {
                        Authorization: ACCESS_TOKEN,
                    },
                }
            )
            const newSources = sources.map((source) => {
                if (source.sourceId === sourceId) {
                    source.name = name
                }
                return source
            })
            setSources(newSources)
        } catch (e) {
            console.log(e)
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/sources/${sourceId}`, {
                headers: {
                    Authorization: ACCESS_TOKEN,
                },
            })
            messageApi.success('Chat was deleted')
            setDeleted(deleted + 1)
        } catch (e) {
            console.log(e)
        }
    }

    const handleReset = async () => {
        try {
            await axios.delete(`${API_URL}/sources/${sourceId}/messages`, {
                headers: { Authorization: ACCESS_TOKEN },
            })
            messageApi.success('Chat cleared')
            setIsUpdate((prev) => !prev)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <MainLayout>
            <div className="flex">
                <div className="flex-none h-screen pb-4 w-0 sm:w-64 bg-[#001529] text-[rgba(255,255,255,0.65)] overflow-y-auto">
                    <SideBar
                        sources={sources}
                        sourceId={sourceId}
                        handleSelectSource={handleSelectSource}
                    />
                </div>
                {sourceId ? (
                    <div className="w-full">
                        <Header
                            handleRename={handleRename}
                            handleDelete={handleDelete}
                            handleReset={handleReset}
                        />
                        <Chat sourceId={sourceId} isUpdate={isUpdate} />
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

export default Main
