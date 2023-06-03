import { all } from "redux-saga/effects";
import authSaga from "./auth/authAPI";
import planSaga from "./plan/planAPI";
import sourceSaga from "./source/sourceAPI";
import messageSaga from "./message/messageAPI";

// Here you can include all the saga which you write for components
export default function* rootSaga() {
    yield all([authSaga(), planSaga(), sourceSaga(), messageSaga()]);
}
