import { propertyCollection } from '../data'

export const useGetMessages = (collectionId) => {
    const property = propertyCollection.find(
        (property) => property.collection_id === collectionId
    )
    if (property != undefined) return { messages: property.messages }
    return {
        messages: [
            {
                text: 'Welcome to ChatPDF! What can I help you?',
                sentBy: 'PropManager.ai',
                sentAt: new Date(),
                isChatOwner: false,
            },
        ],
    }
}
