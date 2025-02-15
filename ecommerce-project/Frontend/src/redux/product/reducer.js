import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  SET_CATEGORY_FILTER,
  SET_SORT_BY,
  CLEAR_CART,
  ADD_DELIVERY_INFO,
  EDIT_DELIVERY_INFO,
  SAVE_PAYMENT_INFO,
  ADD_ORDER_HISTORY,
} from "../constants";

const initialState = {
  products: [],
  carts: {},
  loading: false,
  error: null,
  filters: {
    category: "",
    sortBy: "",
  },
  deliveryInfo: {}, // Stores delivery info by userId
  payment_info: null, // Store user's selected payment details
  order_history: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case ADD_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case FETCH_PRODUCTS_FAILURE:
    case ADD_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_CATEGORY_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload,
        },
      };

    case SET_SORT_BY:
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload,
        },
      };

    case ADD_DELIVERY_INFO:
      if (!state.logged_user) {
        console.error("No logged-in user found.");
        return state; // Prevent errors if no user is logged in
      }

      const userId = state.logged_user.id;
      console.log("Updating delivery info in Redux:", action.payload);

      return {
        ...state,
        deliveryInfo: {
          ...state.deliveryInfo,
          [userId]: { ...action.payload }, // Ensure a new reference
        },
      };

    case EDIT_DELIVERY_INFO: {
      if (!state.logged_user) return state; // Ensure user is logged in

      const userId = state.logged_user.id;

      return {
        ...state,
        deliveryInfo: {
          ...state.deliveryInfo,
          [userId]: {
            ...state.deliveryInfo[userId], // Keep existing data
            ...action.payload, // Update only the changed fields
          },
        },
      };
    }

    case SAVE_PAYMENT_INFO:
      return { ...state, payment_info: action.payload };

    case ADD_ORDER_HISTORY:
      if (!state.logged_user) return state;
      const user_id = state.logged_user.id;
      const newOrder = action.payload;
      return {
        ...state,
        order_history: {
          ...state.order_history,
          [user_id]: [...(state.order_history[user_id] || []), newOrder],
        },
      };

    default:
      return state;
  }
};

export default productReducer;
