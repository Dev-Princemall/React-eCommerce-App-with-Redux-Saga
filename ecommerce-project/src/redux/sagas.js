import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "./constants";

function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, "https://fakestoreapi.com/products");
    console.log(response);
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}

export default rootSaga;
