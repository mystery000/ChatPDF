import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
    sources: [],
    loading: false,
    error: {},
    uploading: false,
    uploadingError: {},
    deleting: false,
    deletingError: {},
    renaming: false,
    renamingError: {},
};

const sourceSlice = createSlice({
    name: "source",
    initialState,
    reducers: {
        getSources(state) {
            state.loading = true;
            state.error = {};
        },
        getSourcesSuccess(state, action) {
            state.loading = false;
            state.sources = action.payload.sources;
        },
        getSourcesFailure(state, action) {
            state.loading = false;
            state.sources = [];
            state.error = action.payload.error;
        },
        uploadSource(state) {
            state.uploading = true;
            state.uploadingError = {};
        },
        uploadSourceSuccess(state, action) {
            state.uploading = false;
            const {documents, ...rest} = action.payload;
            state.sources = [...state.sources, rest];
            message.success("Uploaded property successfully!");
        },
        uploadSourceFailure(state, action) {
            state.uploading = false;
            state.uploadingError = action.payload.error;
            message.error("Oops! Failed to upload property.");
        },
        deleteSource(state) {
            state.deleting = true;
            state.deletingError = {};
        },
        deleteSourceSuccess(state, action) {
            state.deleting = false;
            state.sources = state.sources.filter(
                ({ sourceId }) => sourceId != action.payload.sourceId
            );
            message.success("Deleted property");
        },
        deleteSourceFailure(state, action) {
            state.deleting = false;
            state.error = action.payload.error;
            message.error("Failed to delete property.");
        },
        renameSource(state) {
            state.renaming = true;
            state.renamingError = {};
        },
        renameSourceSuccess(state, action) {
            state.renaming = false;
            const { sourceId, name } = action.payload;
            state.sources = state.sources.map((source) => {
                if (source.sourceId === sourceId) {
                    source.name = name;
                    return source;
                }
                return source;
            });
        },
        renameSourceFailure(state, action) {
            state.renaming = false;
            state.renamingError = action.payload.error;
        },
    },
});

export const {
    getSources,
    getSourcesSuccess,
    getSourcesFailure,
    uploadSource,
    uploadSourceSuccess,
    uploadSourceFailure,
    deleteSource,
    deleteSourceSuccess,
    deleteSourceFailure,
    renameSource,
    renameSourceSuccess,
    renameSourceFailure,
} = sourceSlice.actions;

export default sourceSlice.reducer;
