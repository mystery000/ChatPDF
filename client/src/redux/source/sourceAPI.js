import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getSources,
    getSourcesSuccess,
    getSourcesFailure,
    uploadSource,
    uploadSourceSuccess,
    uploadSourceFailure,
} from "./sourceSlice";

import { setSelectedSource } from "../app/appSlice";

import { getRequest, postRequestWithFiles } from "../../services/axiosClient";

function* getSourcesAPI() {
    try {
        const response = yield call(() => getRequest("sources"));
        yield put(getSourcesSuccess(response.data));
    } catch (err) {
        yield put(
            getSourcesFailure({
                error: { message: "Network connection error" },
            })
        );
    }
}

function* uploadSourceAPI(action) {
    try {
        const response = yield call(() =>
            postRequestWithFiles("sources/upload", action.payload)
        );
        yield put(uploadSourceSuccess(response.data));
        yield put(setSelectedSource(response.data));
    } catch (error) {
        yield put(
            uploadSourceFailure({
                error: {
                    message: `Failed to upload files due to ${error?.message}`,
                },
            })
        );
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(getSources, getSourcesAPI),
        takeLatest(uploadSource, uploadSourceAPI),
    ]);
}
