import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  INCREASE_QUANTITY_REQUEST,
  INCREASE_QUANTITY_SUCCESS,
  INCREASE_QUANTITY_FAILURE,
  DECREASE_QUANTITY_REQUEST,
  DECREASE_QUANTITY_SUCCESS,
  DECREASE_QUANTITY_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
} from "../constants";

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
    case ADD_TO_CART_REQUEST:
    case UPDATE_CART_ITEM_REQUEST:
    case INCREASE_QUANTITY_REQUEST:
    case DECREASE_QUANTITY_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
    case CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CART_SUCCESS:
    case ADD_TO_CART_SUCCESS:
    case UPDATE_CART_ITEM_SUCCESS:
    case INCREASE_QUANTITY_SUCCESS:
    case DECREASE_QUANTITY_SUCCESS:
    case REMOVE_CART_ITEM_SUCCESS:
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };

    case GET_CART_FAILURE:
    case ADD_TO_CART_FAILURE:
    case UPDATE_CART_ITEM_FAILURE:
    case INCREASE_QUANTITY_FAILURE:
    case DECREASE_QUANTITY_FAILURE:
    case REMOVE_CART_ITEM_FAILURE:
    case CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
