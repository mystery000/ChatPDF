import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getSources,
    getSourcesSuccess,
    getSourcesFailure,
    uploadSource,
    uploadSourceSuccess,
    uploadSourceFailure,
    deleteSource,
    deleteSourceSuccess,
    deleteSourceFailure,
    renameSource,
    renameSourceSuccess,
    renameSourceFailure,
} from "./sourceSlice";

import { setSelectedSource } from "../app/appSlice";
import { uploadDocumentSucess } from "../document/documentSlice";

import {
    getRequest,
    postRequestWithFiles,
    deleteRequest,
    putRequest,
} from "../../services/axiosClient";

import { setStorage } from "../../helpers";

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
        yield put(uploadDocumentSucess(response.data));
        if(response.data?.sourceId) {
            yield put(setSelectedSource(response.data));
            yield put(uploadSourceSuccess(response.data));
        }
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

function* deleteSourceAPI(action) {
    try {
        const { sourceId } = action.payload;
        const response = yield call(() => deleteRequest(`sources/${sourceId}`));
        yield setStorage('latestKey');
        yield put(deleteSourceSuccess(response.data));
        yield put(setSelectedSource(''));
    } catch (error) {
        yield put(
            deleteSourceFailure({
                error: {
                    message: `Failed to upload files due to ${error?.message}`,
                },
            })
        );
    }
}

function* renameSourceAPI(action) {
    try {
        const { sourceId } = action.payload;
        const response = yield call(() =>
            putRequest(`sources/${sourceId}`, action.payload)
        );
        yield put(renameSourceSuccess(response.data));
    } catch (error) {
        yield put(
            renameSourceFailure({
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
        takeLatest(deleteSource, deleteSourceAPI),
        takeLatest(renameSource, renameSourceAPI),
    ]);
}
