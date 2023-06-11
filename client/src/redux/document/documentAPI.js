import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getDocuments,
    getDocumentsSuccess,
    getDocumentsFailure,
    uploadDocument,
    uploadDocumentSucess,
    uploadDocumentFailure,
    deleteDocument,
    deleteDocumentSuccess,
    deleteDocumentFailure,
    updateDocument,
    updateDocumentSuccess,
    updateDocumentFailure,
} from "./documentSlice";

import { deleteRequest, getRequest, postRequest, putRequest } from "../../services/axiosClient";

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
            postRequest("sources/addSource", action.payload)
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

function* deleteDocumentAPI(action) {
    try {
        yield call(() => deleteRequest("documents/" + action.payload));
        yield put(deleteDocumentSuccess(action.payload));
    } catch (error) {
        yield put(
            deleteDocumentFailure({
                error: {
                    message: `Failed to delete document.`,
                },
            })
        );
    }
}

function* updateDocumentAPI(action) {
    try {
        const response = yield call(() => putRequest("documents/" + action.payload.id, action.payload));
        yield put(updateDocumentSuccess(response.data));
    } catch (error) {
        yield put(
            updateDocumentFailure({
                error: {
                    message: `Failed to update document.`,
                },
            })
        );
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(getDocuments, getDocumentsAPI), 
        takeLatest(uploadDocument, uploadDocumentAPI),
        takeLatest(deleteDocument, deleteDocumentAPI),
        takeLatest(updateDocument, updateDocumentAPI),
    ]);
}
