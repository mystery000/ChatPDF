import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getMessages,
    getMessagesSuccess,
    getMessagesFailure,
    deleteMessages,
    deleteMessagesSuccess,
    deleteMessagesFailure,
} from "./messageSlice";

import { getRequest, deleteRequest } from "../../services/axiosClient";

function* getMessagesAPI(action) {
    try {
        const { sourceId } = action.payload;
        const response = yield call(() =>
            getRequest(`sources/${sourceId}/messages`)
        );
        yield put(getMessagesSuccess(response.data));
    } catch (err) {
        yield put(
            getMessagesFailure({
                error: { message: "Network connection error" },
            })
        );
    }
}

function* deleteMessagesAPI(action) {
    try {
        const { sourceId } = action.payload;
        const response = yield call(() =>
            deleteRequest(`sources/${sourceId}/messages`)
        );
        yield put(deleteMessagesSuccess(response.data));
    } catch (err) {
        yield put(
            deleteMessagesFailure({
                error: { message: "Network connection error" },
            })
        );
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(getMessages, getMessagesAPI),
        takeLatest(deleteMessages, deleteMessagesAPI),
    ]);
}
