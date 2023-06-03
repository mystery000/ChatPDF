import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getMessages,
    getMessagesSuccess,
    getMessagesFailure,
    deleteMessages,
    deleteMessagesSuccess,
    deleteMessagesFailure,
    sendMessage,
    sendMessageSuccess,
    sendMessageFailure,
} from "./messageSlice";

import {
    getRequest,
    deleteRequest,
    postRequest,
} from "../../services/axiosClient";

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
        yield call(() => deleteRequest(`sources/${sourceId}/messages`));
        yield put(deleteMessagesSuccess());
    } catch (err) {
        yield put(
            deleteMessagesFailure({
                error: { message: "Network connection error" },
            })
        );
    }
}

function* sendMessageAPI(action) {
    try {
        const { sourceId, text } = action.payload;
        const response = yield call(() =>
            postRequest(`sources/${sourceId}/chat`, { question: text })
        );
        yield put(sendMessageSuccess(response.data));
    } catch (error) {
        yield put(
            sendMessageFailure({
                error: {
                    message:
                        "An error occurred while fetching the data. Please try again.",
                },
            })
        );
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(getMessages, getMessagesAPI),
        takeLatest(deleteMessages, deleteMessagesAPI),
        takeLatest(sendMessage, sendMessageAPI),
    ]);
}
