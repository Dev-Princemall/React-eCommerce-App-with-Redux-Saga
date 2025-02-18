import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_FAILURE,
  FETCH_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
} from "../constants";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case FETCH_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
        success: true,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case FETCH_USER_PROFILE_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
        success: false,
      };

    case UPDATE_USER_PROFILE_SUCCESS:
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        success: true,
      };

    default:
      return state;
  }
};

export default authReducer;
