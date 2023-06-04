import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    documents: [],
    error: {},
    loading: false,
};

const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
        getDocuments(state) {
            state.loading = true;
            state.error = {};
        },
        getDocumentsSuccess(state, action) {
            state.loading = false;
            state.documents = action.payload.documents;
        },
        getDocumentsFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        uploadDocumentSucess(state, action) {
            state.loading = false;
            state.documents = [... state.documents, ...action.payload.documents];
        }
    },
});

export const { getDocuments, getDocumentsSuccess, getDocumentsFailure, uploadDocumentSucess } =
    documentSlice.actions;

export default documentSlice.reducer;
