import axios from 'axios'
import ApiKeyContext from '../context/ApiKeyContext'
import { useContext, useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import FileUploadModal from '../components/FileUploadModal'

const App = ({ onSelectPropertyHandler }) => {
    const [properties, setProperties] = useState([])

    const ApiKey = useContext(ApiKeyContext)

    useEffect(() => {
        axios
            .get('https://api.usegrain.co/v1/collections/list', {
                headers: {
                    Authorization: ApiKey,
                },
            })
            .then((res) => setProperties(res.data.collections))
            .catch((error) =>
                console.log(
                    'Failed to call Grain API to get list of collections.'
                )
            )
    }, [ApiKey])

    const onUploadHandler = (property) => {
        const newProperty = {
            id: property.id,
            name: property.name,
        }
        setProperties((prev) => [...prev, newProperty])
    }

    return (
        <>
            <div className="text-center">
                <FileUploadModal onUploadHandler={onUploadHandler} />
            </div>
            <ChatContainer
                properties={properties}
                onSelectPropertyHandler={onSelectPropertyHandler}
            />
        </>
    )
}

export default App
