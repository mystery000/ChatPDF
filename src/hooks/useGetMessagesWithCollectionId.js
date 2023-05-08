import { propertyCollection } from '../data'

export const useGetMessagesWithCollectionId = (collectionId) => {
    const property = propertyCollection.find(
        (property) => property.collection_id === collectionId
    )
    if (property != undefined) return { messages: property.messages }
    return {
        messages: [
            {
                text: 'Hey!, I am PropManager.ai, What can I help you?',
                sentBy: 'PropManager.ai',
                sentAt: new Date(),
                isChatOwner: false,
            },
        ],
    }
}
