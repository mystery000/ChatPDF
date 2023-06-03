import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sources: [],
  loading: false,
  error: {},
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
      state.sources = []
      state.error = action.payload.error;
    },
  },
});

export const { getSources, getSourcesSuccess, getSourcesFailure } =
  sourceSlice.actions;

export default sourceSlice.reducer;
