import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: {},
    // states for prompt
    waiting: false,
    promptError: {}
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        getMessages(state) {
            state.loading = true;
            state.error = {};
        },
        getMessagesSuccess(state, action) {
            state.loading = false;
            state.messages = action.payload.messages;
        },
        getMessagesFailure(state, action) {
            state.loading = false;
            state.messages = [];
            state.error = action.payload.error;
        },
        deleteMessages(state) {
            state.loading = true;
            state.error = {};
        },
        deleteMessagesSuccess(state, action) {
            state.loading = false;
            state.messages = [];
        },
        deleteMessagesFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        sendMessage(state, action) {
            state.messages = [...state.messages, action.payload];
            state.waiting = true;
            state.promptError = {};
        },
        sendMessageSuccess(state, action) {
            state.waiting = false;
            state.messages = [...state.messages, {...action.payload.apiMessage, stream: true}];
        },
        sendMessageFailure(state, action) {
            state.waiting = false;
            state.promptError = action.payload.error;
        },
    },
});

export const {
    getMessages,
    getMessagesSuccess,
    getMessagesFailure,
    deleteMessages,
    deleteMessagesSuccess,
    deleteMessagesFailure,
    sendMessage,
    sendMessageSuccess,
    sendMessageFailure,
} = messageSlice.actions;

export default messageSlice.reducer;
