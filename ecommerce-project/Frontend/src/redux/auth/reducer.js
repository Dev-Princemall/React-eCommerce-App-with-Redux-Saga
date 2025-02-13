import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../constants";

const initialState = {
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
      };

    default:
      return state;
  }
};

export default authReducer;
