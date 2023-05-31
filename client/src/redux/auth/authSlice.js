import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  loader: false,
  user: {},
  errors: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.loader = true;
    },
    register(state) {
      state.loader = true;
    },
    logout(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
    },
    loginSuccess(state, action) {
      state.loader = false;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
      state.errors = {};
    },
    loginFailure(state, action) {
      state.loader = false;
      state.isAuthenticated = false;
      state.errors = action.payload.errors;
    },
    clearErrors(state) {
      state.errors = {};
    },
    getUser(state) {
      state.loader = true;
    },
    getUserSuccess(state, action) {
      state.loader = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    getUserFailure(state) {
      state.loader = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    updateProfile(state) {
      state.loader = true;
    },
    updateProfileSuccess(state, action) {
      state.loader = false;
      state.user = action.payload.user;
    },
    updateProfileFailure(state, action) {
      state.loader = false;
      state.errors = action.payload.errors;
    },
    updatePassword(state) {
      state.loader = true;
    },
    updatePasswordSuccess(state, action) {
      state.loader = false;
    },
    updatePasswordFailure(state, action) {
      state.loader = false;
      state.errors = action.payload.errors;
    },
  },
});

export const { 
  login,
  register,
  logout,
  getUser, 
  getUserSuccess, 
  getUserFailure, 
  loginSuccess, 
  loginFailure, 
  clearErrors,
  updateProfile, 
  updateProfileSuccess,
  updateProfileFailure, 
  updatePassword,
  updatePasswordSuccess,
  updatePasswordFailure,
} = authSlice.actions;
export default authSlice.reducer;
