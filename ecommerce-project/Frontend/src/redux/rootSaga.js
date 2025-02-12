import { all } from "redux-saga/effects";
import authSaga from "./auth/sagas";
import productSaga from "./product/sagas";

export default function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}
