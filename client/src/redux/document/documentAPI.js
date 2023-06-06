import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getDocuments,
    getDocumentsSuccess,
    getDocumentsFailure,
    uploadDocument,
    uploadDocumentSucess,
    uploadDocumentFailure,
} from "./documentSlice";

import { getRequest, postRequestWithFiles } from "../../services/axiosClient";

function* getDocumentsAPI(action) {
    try {
        const response = yield call(() => getRequest(`sources/documents`));
        yield put(getDocumentsSuccess(response.data));
    } catch (error) {
        yield put(
            getDocumentsFailure({
                error: {
                    message: `Failed to get documents due to ${error?.message}`,
                },
            })
        );
    }
}

function* uploadDocumentAPI(action) {
    try {
        const response = yield call(() =>
            postRequestWithFiles("sources/upload", action.payload)
        );
        yield put(uploadDocumentSucess(response.data));
    } catch (error) {
        yield put(
            uploadDocumentFailure({
                error: {
                    message: `Failed to upload files due to ${error?.message}`,
                },
            })
        );
    }
}

export default function* rootSaga() {
    yield all([takeLatest(getDocuments, getDocumentsAPI), takeLatest(uploadDocument, uploadDocumentAPI)]);
}
