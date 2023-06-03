import { all, call, put, takeLatest } from "redux-saga/effects";

import {
    getDocuments,
    getDocumentsSuccess,
    getDocumentsFailure,
} from "./documentSlice";

import { getRequest } from "../../services/axiosClient";

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

export default function* rootSaga() {
    yield all([takeLatest(getDocuments, getDocumentsAPI)]);
}
