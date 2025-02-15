import { takeLatest, put, call } from "redux-saga/effects";
import {
  GET_CART_REQUEST,
  ADD_TO_CART_REQUEST,
  UPDATE_CART_ITEM_REQUEST,
  INCREASE_QUANTITY_REQUEST,
  DECREASE_QUANTITY_REQUEST,
  REMOVE_CART_ITEM_REQUEST,
  CLEAR_CART_REQUEST,
} from "../constants";

import {
  getCart,
  addToCart,
  updateCartItem,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  clearCart,
} from "../../services/cartApi";
import {
  addToCartFailure,
  addToCartSuccess,
  clearCartFailure,
  clearCartSuccess,
  decreaseQuantityFailure,
  decreaseQuantitySuccess,
  getCartFailure,
  getCartSuccess,
  increaseQuantityFailure,
  increaseQuantitySuccess,
  removeCartItemFailure,
  removeCartItemSuccess,
  updateCartItemFailure,
  updateCartItemSuccess,
} from "../actions";

// Worker Sagas
function* fetchCart(action) {
  try {
    const cart = yield call(getCart, action.payload);
    yield put(getCartSuccess(cart));
  } catch (error) {
    yield put(getCartFailure(error.message));
  }
}

function* addCartItem(action) {
  try {
    const cart = yield call(
      addToCart,
      action.payload.productId,
      action.payload.userId,
      action.payload.quantity
    );
    yield put(addToCartSuccess(cart));
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}

function* updateCartItemSaga(action) {
  try {
    const cart = yield call(
      updateCartItem,
      action.payload.productId,
      action.payload.userId,
      action.payload.quantity
    );
    yield put(updateCartItemSuccess(cart));
  } catch (error) {
    yield put(updateCartItemFailure(error.message));
  }
}

function* increaseCartItemSaga(action) {
  try {
    const cart = yield call(
      increaseQuantity,
      action.payload.productId,
      action.payload.userId
    );
    yield put(increaseQuantitySuccess(cart));
  } catch (error) {
    yield put(increaseQuantityFailure(error.message));
  }
}

function* decreaseCartItemSaga(action) {
  try {
    const cart = yield call(
      decreaseQuantity,
      action.payload.productId,
      action.payload.userId
    );
    yield put(decreaseQuantitySuccess(cart));
  } catch (error) {
    yield put(decreaseQuantityFailure(error.message));
  }
}

function* removeCartItemSaga(action) {
  try {
    const cart = yield call(
      removeCartItem,
      action.payload.productId,
      action.payload.userId
    );
    yield put(removeCartItemSuccess(cart));
  } catch (error) {
    yield put(removeCartItemFailure(error.message));
  }
}

function* clearCartSaga(action) {
  try {
    const cart = yield call(clearCart, action.payload.userId);
    yield put(clearCartSuccess(cart));
  } catch (error) {
    yield put(clearCartFailure(error.message));
  }
}

// Watcher Saga
function* cartSaga() {
  yield takeLatest(GET_CART_REQUEST, fetchCart);
  yield takeLatest(ADD_TO_CART_REQUEST, addCartItem);
  yield takeLatest(UPDATE_CART_ITEM_REQUEST, updateCartItemSaga);
  yield takeLatest(INCREASE_QUANTITY_REQUEST, increaseCartItemSaga);
  yield takeLatest(DECREASE_QUANTITY_REQUEST, decreaseCartItemSaga);
  yield takeLatest(REMOVE_CART_ITEM_REQUEST, removeCartItemSaga);
  yield takeLatest(CLEAR_CART_REQUEST, clearCartSaga);
}

export default cartSaga;
