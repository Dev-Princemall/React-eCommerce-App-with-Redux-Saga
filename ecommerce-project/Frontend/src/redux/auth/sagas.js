import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  UPDATE_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_REQUEST,
} from "../constants";
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  getCartRequest,
  updateUserProfileSuccess,
  fetchUserProfileRequest,
  fetchUserProfileFailure,
  updateUserProfileFailure,
  fetchUserProfileSuccess,
} from "../actions";
import {
  registerUserApi,
  loginUserApi,
  updateUserProfileApi,
  getUserProfileApi,
} from "../../services/authApi";

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
    yield put(getCartRequest(user?._id));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    yield put(loginFailure(errorMessage));
    toast.error(errorMessage);
  }
}

function* fetchUserProfileSaga() {
  try {
    const userData = yield call(getUserProfileApi);
    console.log("AT FETCH USER PROFILE SAGA", userData);
    yield put(fetchUserProfileSuccess(userData));
  } catch (error) {
    yield put(fetchUserProfileFailure(error.message));
    console.log("AT FETCH USER PROFILE SAGA Error", error);
  }
}
function* updateUserProfileSaga(action) {
  try {
    const userData = yield call(updateUserProfileApi, action.payload);
    yield put(updateUserProfileSuccess(userData));
    console.log("AT UPDATE USER PROFILE SAGA", userData);
  } catch (error) {
    yield put(updateUserProfileFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(UPDATE_USER_PROFILE_REQUEST, updateUserProfileSaga);
  yield takeLatest(FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga);
}
