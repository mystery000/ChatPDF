import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: {},
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
            state.messages = []
        },
        deleteMessagesFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
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
} = messageSlice.actions;

export default messageSlice.reducer;
