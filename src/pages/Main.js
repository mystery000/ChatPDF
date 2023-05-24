import { useEffect, useState } from 'react'
import axios from 'axios'
import Chat from '../ChatApp'
import Config from '../config'
import { Empty, Spin, message } from 'antd'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'

const Main = () => {
    const [sourceId, setSourceId] = useState('')
    const [isDeleted, setDeleted] = useState(0)
    const [isUpdate, setUpdate] = useState(false)
    const [sources, setSources] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const { API_URL, ACCESS_TOKEN } = Config
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
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
                setLoading(false)
            })
            .catch((error) => {
                setSources([])
                console.log(
                    'Failed to call Grain API to get list of collections.'
                )
            })
    }, [isDeleted])

    const handleSelectSource = (sourceId) => {
        setSourceId(sourceId)
    }
    const handleRename = async (name) => {
        const payload = { name: name }
        try {
            await axios.put(`${API_URL}/sources/${sourceId}`, payload, {
                headers: {
                    Authorization: ACCESS_TOKEN,
                },
            })
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
            setDeleted((prev) => !prev)
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
            setUpdate((prev) => !prev)
        } catch (err) {
            console.log(err)
        }
    }
    if (loading) {
        return <Spin tip="Loading..." size="large"></Spin>
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
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default Main
