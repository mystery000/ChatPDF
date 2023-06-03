import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getSources,
  getSourcesSuccess,
  getSourcesFailure,
} from "./sourceSlice";

import { getRequest } from "../../services/axiosClient";

function* getSourcesAPI() {
  try {
    const response = yield call(() => getRequest("sources"));
    yield put(getSourcesSuccess(response.data));
  } catch (err) {
    yield put(getSourcesFailure({error: {message: 'Network connection error'}}));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(getSources, getSourcesAPI)]);
}
