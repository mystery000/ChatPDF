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
        deleteDocument(state) {
            state.loading = true;
        },
        deleteDocumentSuccess(state, action) {
            state.loading = false;
            state.documents = state.documents.filter(doc => doc._id !== action.payload);
        },
        deleteDocumentFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        updateDocument(state) {
            state.loading = true;
        },
        updateDocumentSuccess(state, action) {
            state.loading = false;
            state.documents = state.documents.filter(doc => doc._id !== action.payload.document._id);
            state.documents.push(action.payload.document);
        },
        updateDocumentFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
});

export const { 
    getDocuments, 
    getDocumentsSuccess, 
    getDocumentsFailure, 
    uploadDocument, 
    uploadDocumentSucess, 
    uploadDocumentFailure,
    deleteDocument,
    deleteDocumentSuccess,
    deleteDocumentFailure,
    updateDocument,
    updateDocumentSuccess,
    updateDocumentFailure,
} =
    documentSlice.actions;

export default documentSlice.reducer;
