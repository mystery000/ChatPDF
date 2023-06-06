import { createSlice } from "@reduxjs/toolkit";
import { getStorage } from "../../helpers";

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
        uploadDocument(state) {
            state.loading = getStorage('latestKey');
        },
        uploadDocumentSucess(state, action) {
            state.loading = false;
            state.documents = [...state.documents, ...action.payload.documents];
        },
        uploadDocumentFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
});

export const { getDocuments, getDocumentsSuccess, getDocumentsFailure, uploadDocument, uploadDocumentSucess, uploadDocumentFailure } =
    documentSlice.actions;

export default documentSlice.reducer;
