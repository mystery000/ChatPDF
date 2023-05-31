import {all, call, put, takeLatest} from 'redux-saga/effects'
import {message } from 'antd';

import { 
  login, 
  register, 
  loginSuccess, 
  updateProfile, 
  loginFailure, 
  logout, 
  getUserSuccess, 
  getUserFailure, 
  getUser, 
  updateProfileSuccess, 
  updateProfileFailure, 
  updatePasswordSuccess,
  updatePasswordFailure,
  updatePassword,
 } from './authSlice';
import { getRequest, postRequest } from '../../services/axiosClient';
import { setStorage } from '../../helpers';


function* loginAPI(action) {
  try {
    const response = yield call(() => postRequest('auth/login', action.payload));
    yield setStorage('token', response.data.token);
    yield put(loginSuccess(response.data));
  } catch (e) {
    yield put(loginFailure({
      errors: {
        email: 'These credentials do not match our records.'
      }
    }));
  }
}

function* registerAPI(action) {
  try {
    const response = yield call(() => postRequest('auth/register', action.payload));
    yield setStorage('token', response.data.token);
    yield put(loginSuccess(response.data));
  } catch (e) {
    yield put(loginFailure(e.response.data));
  }
}

function* updateProfileAPI(action) {
  try {
    const response = yield call(() => postRequest('users/updateProfile', action.payload));
    message.success('Profile updated successfully!');
    yield put(updateProfileSuccess(response.data));
  } catch (e) {
    yield put(updateProfileFailure());
  }
}

function* updatePasswordAPI(action) {
  try {
    const response = yield call(() => postRequest('users/updatePassword', action.payload));
    message.success('Passowrd updated successfully!');
    yield put(updatePasswordSuccess());
  } catch (e) {
    yield put(updatePasswordFailure(e.response.data));
  }
}

function* logoutAPI() {
  try {
    // const response = yield call(() => postRequest('auth/register', action.payload));
    yield setStorage('token');
    // yield put(loginSuccess(response.data));
  } catch (e) {
    // yield put(loginFailure(e.response.data));
  }
}

function* getUserAPI() {
  try {
    const response = yield call(() => getRequest('users/me'));
    yield put(getUserSuccess(response.data));
  } catch (e) {
    yield setStorage('token');
    yield put(getUserFailure());
  }
}

export default function* rootSaga() {
  yield all([takeLatest(login, loginAPI), takeLatest(register, registerAPI), takeLatest(logout, logoutAPI), takeLatest(getUser, getUserAPI), takeLatest(updateProfile, updateProfileAPI), takeLatest(updatePassword, updatePasswordAPI)]);
}
