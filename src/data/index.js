const messages = [
    {
        text: 'Hey!',
        sentBy: 'ChatPDF',
        sentAt: new Date('2023-03-02T09:00:00Z'),
        isChatOwner: false,
    },
    {
        text: 'Do you like this chat?',
        sentBy: 'Julian Sarokin',
        sentAt: new Date('2023-03-02T09:02:00Z'),
        isChatOwner: true,
    },
    {
        text: 'Hey, devlazar!',
        sentBy: 'ChatPDF',
        sentAt: new Date('2023-03-02T09:01:00Z'),
        isChatOwner: false,
    },
    {
        text: 'Do you like this chat?',
        sentBy: 'Julian Sarokin',
        sentAt: new Date('2023-03-02T09:02:00Z'),
        isChatOwner: true,
    },
]

const propertyCollection = [
    {
        filename: '9604 Harland Ave',
        collection_id: '12345678-abcd-1234-abcd-1234567890ab',
        documents: [
            {
                file_name: 'LeaseExample.pdf',
            },
        ],
    },
]

export { messages, propertyCollection }
