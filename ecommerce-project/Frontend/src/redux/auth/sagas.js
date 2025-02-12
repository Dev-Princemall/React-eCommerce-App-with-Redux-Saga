import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { REGISTER_REQUEST, LOGIN_REQUEST } from "../constants";
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
} from "../actions";
import { registerUserApi, loginUserApi } from "../../services/authApi";

function* registerSaga(action) {
  try {
    const user = yield call(registerUserApi, action.payload);
    yield put(registerSuccess(user));
    toast.success("Registration successful!");
  } catch (error) {
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
    toast.error(error.response?.data?.message || "Registration failed");
  }
}

function* loginSaga(action) {
  try {
    const user = yield call(loginUserApi, action.payload);
    localStorage.setItem("user", JSON.stringify(user)); // Store user token
    yield put(loginSuccess(user));
    toast.success("Login successful!");
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
    toast.error(error.response?.data?.message || "Login failed");
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
