const messages = [
    {
        text: 'Hey!',
        sentBy: 'ChatPDF',
        sentAt: new Date('2023-03-02T09:00:00Z'),
        isChatOwner: false,
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
    {
        text: 'Looks nice!',
        sentBy: 'Julian Sarokin',
        sentAt: new Date('2023-03-02T09:03:00Z'),
        isChatOwner: true,
    },
    {
        text: 'Hey, devlazar!',
        sentBy: 'ChatPDF',
        sentAt: new Date('2023-03-02T09:01:00Z'),
        isChatOwner: false,
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
    {
        text: 'Looks nice!',
        sentBy: 'Julian Sarokin',
        sentAt: new Date('2023-03-02T09:03:00Z'),
        isChatOwner: true,
    },
]

const chats = [
    {
        id: 1,
        name: '9604 Harland Ave',
        documents: [
            { id: 1, name: 'LeaseExample.pdf' },
            { id: 2, name: 'LeaseExample.pdf' },
            { id: 3, name: 'LeaseExample.pdf' },
        ],
    },
    {
        id: 2,
        name: '727 Wilcox Blvd',
        documents: [
            { id: 4, name: 'LeaseExample.pdf' },
            { id: 5, name: 'LeaseExample.pdf' },
        ],
    },
    {
        id: 3,
        name: '9389 Westmoreland St',
        documents: [
            { id: 6, name: 'LeaseExample.pdf' },
            { id: 7, name: 'LeaseExample.pdf' },
            { id: 8, name: 'LeaseExample.pdf' },
            { id: 9, name: 'LeaseExample.pdf' },
            { id: 10, name: 'LeaseExample.pdf' },
        ],
    },
]

export { messages, chats }
