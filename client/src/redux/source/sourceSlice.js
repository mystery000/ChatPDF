import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sources: [],
    loading: false,
    error: {},
    uploading: false,
    uploadingError: {},
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
            state.sources = [...state.sources, action.payload];
        },
        uploadSourceFailure(state, action) {
            state.uploading = false;
            state.uploadingError = action.payload.error;
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
} = sourceSlice.actions;

export default sourceSlice.reducer;
