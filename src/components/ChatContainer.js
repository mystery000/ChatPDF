import Chat from './Chat'
import React, { useState, useEffect } from 'react'
import DocumentList from './DocumentList'

const App = ({ properties, onSelectPropertyHandler }) => {
    const [collectionId, setCollectionId] = useState('')

    const onChangeHandler = (propertyId) => {
        onSelectPropertyHandler(propertyId)
        setCollectionId(propertyId)
    }
    return (
        <>
            {properties.map((property, index) => (
                <Chat
                    key={index}
                    active={collectionId === property.id}
                    property={property}
                    onChangeHandler={onChangeHandler}
                >
                    {/* <DocumentList collectionID={property.id} /> */}
                </Chat>
            ))}
        </>
    )
}

export default App
