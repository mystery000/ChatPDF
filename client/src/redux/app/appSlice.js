import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedSource: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSelectedSource(state, action) {
            state.selectedSource = action.payload.sourceId;
        },
    },
});

export const { setSelectedSource } = appSlice.actions;

export default appSlice.reducer;
