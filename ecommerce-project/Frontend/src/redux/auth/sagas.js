import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { REGISTER_REQUEST, LOGIN_REQUEST } from "../constants";
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  getCartRequest,
} from "../actions";
import { registerUserApi, loginUserApi } from "../../services/authApi";

function* registerSaga(action) {
  try {
    const { token, ...user } = yield call(registerUserApi, action.payload);
    yield call([localStorage, "setItem"], "token", token);
    yield call([localStorage, "setItem"], "user", JSON.stringify(user));
    yield put(registerSuccess({ user, token }));
    toast.success("Registration successful!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    yield put(registerFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* loginSaga(action) {
  try {
    const { token, ...user } = yield call(loginUserApi, action.payload);
    yield call([localStorage, "setItem"], "token", token);
    yield call([localStorage, "setItem"], "user", JSON.stringify(user));
    yield put(loginSuccess({ token, user }));
    yield call(getCartRequest(user?._id));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    yield put(loginFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
