import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { fetchProductsFromAPI } from "../services/api";
import {
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
} from "./actions";

function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProductsFromAPI);
    console.log("products:", products);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
    toast.error(error.message);
  }
}

function* rootSaga() {
  yield takeLatest(fetchProductsRequest, fetchProductsSaga);
}

export default rootSaga;
