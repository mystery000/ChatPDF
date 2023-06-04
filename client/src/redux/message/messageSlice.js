import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
    messages: [],
    loading: false,
    error: {},
    // states for prompt
    waiting: false,
    promptError: {},
    // states for delete functionality
    reseting: false,
    resetingError: {}
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
            state.reseting = true;
            state.resetingError = {};
        },
        deleteMessagesSuccess(state) {
            state.reseting = false;
            state.messages = [];
            message.success('Removed all messages.')
        },
        deleteMessagesFailure(state, action) {
            state.reseting = false;
            state.resetingError = action.payload.error;
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
