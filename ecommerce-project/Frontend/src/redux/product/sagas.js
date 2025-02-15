import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  fetchProductsFromAPI,
  addProductToAPI,
  deleteProductFromAPI,
  updateProductInAPI,
} from "../../services/productApi";
import {
  fetchProductsFailure,
  fetchProductsSuccess,
  addProductFailure,
  addProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  updateProductFailure,
  updateProductSuccess,
} from "../actions";
import {
  FETCH_PRODUCTS_REQUEST,
  ADD_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
} from "../constants";

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

function* addProductSaga(action) {
  try {
    const newProduct = yield call(addProductToAPI, action.payload);
    yield put(addProductSuccess(newProduct));
    toast.success("Product added successfully!");
  } catch (error) {
    yield put(addProductFailure(error.message));
    toast.error(error.message);
  }
}

// Update Product Saga
function* updateProductSaga(action) {
  try {
    const updatedProduct = yield call(
      updateProductInAPI,
      action.payload.id,
      action.payload.updatedProduct
    );
    yield put(updateProductSuccess(updatedProduct));
    toast.success("Product updated successfully!");
  } catch (error) {
    yield put(updateProductFailure(error.message));
    toast.error(error.message);
  }
}

// Delete Product Saga
function* deleteProductSaga(action) {
  try {
    yield call(deleteProductFromAPI, action.payload);
    yield put(deleteProductSuccess(action.payload));
    toast.success("Product deleted successfully!");
  } catch (error) {
    yield put(deleteProductFailure(error.message));
    toast.error(error.message);
  }
}

function* productSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(ADD_PRODUCT_REQUEST, addProductSaga);
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProductSaga);
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProductSaga);
}

export default productSaga;
