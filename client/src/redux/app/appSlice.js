import { createSlice } from "@reduxjs/toolkit";
import { setStorage } from "../../helpers";

const initialState = {
    selectedSource: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSelectedSource(state, action) {
            if(action.payload.sourceId) {
                setStorage('latestKey', action.payload.sourceId);
                state.selectedSource = action.payload.sourceId;
            }
        },
    },
});

export const { setSelectedSource } = appSlice.actions;

export default appSlice.reducer;
