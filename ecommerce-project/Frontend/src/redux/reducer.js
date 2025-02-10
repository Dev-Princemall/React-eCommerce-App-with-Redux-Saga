import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CATEGORY_FILTER,
  SET_SORT_BY,
  CLEAR_ERROR_SUCCESS_STATE,
  CLEAR_CART,
  ADD_DELIVERY_INFO,
  EDIT_DELIVERY_INFO,
  SAVE_PAYMENT_INFO,
  ADD_ORDER_HISTORY,
} from "./constants";

const initialState = {
  products: [],
  users: [],
  carts: {}, // Stores cart items by userId
  logged_user: null,
  loading: false,
  error: null,
  success: null,
  authError: null,
  filters: {
    category: "",
    sortBy: "",
  },
  deliveryInfo: {}, // Stores delivery info by userId
  payment_info: null, // Store user's selected payment details
  order_history: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case FETCH_PRODUCTS_FAILURE:
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

    case ADD_USER:
      if (state.users.some((user) => user.name === action.payload.name)) {
        return { ...state, authError: "User already exists" };
      }
      return {
        ...state,
        users: [...state.users, action.payload],
        authError: null,
        success: "User Registered Successfully",
      };

    case ADD_TO_CART: {
      if (!state.logged_user) {
        return state; // If no user is logged in, do nothing
      }

      const userId = state.logged_user.id;
      const existingCart = state.carts[userId]?.cartItems || [];

      const updatedCartItems = existingCart.some(
        (item) => item.id === action.payload.id
      )
        ? existingCart.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...existingCart, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        carts: {
          ...state.carts,
          [userId]: { id: userId, cartItems: updatedCartItems },
        },
      };
    }

    case REMOVE_FROM_CART: {
      if (!state.logged_user) {
        return state; // If no user is logged in, do nothing
      }

      const userId = state.logged_user.id;
      const existingCart = state.carts[userId]?.cartItems || [];

      const updatedCartItems = existingCart
        .map((item) =>
          item.id === action.payload
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(Boolean);

      return {
        ...state,
        carts: {
          ...state.carts,
          [userId]: {
            id: userId,
            cartItems: updatedCartItems,
          },
        },
      };
    }

    case LOGIN_USER: {
      const user = state.users.find(
        (u) =>
          u.name === action.payload.name &&
          u.password === action.payload.password
      );
      if (user) {
        return {
          ...state,
          logged_user: user,
          authError: null,
          success: "Login Successful",
        };
      }
      return { ...state, authError: "Invalid credentials" };
    }

    case LOGOUT_USER:
      return { ...state, logged_user: null, authError: null, filters: {} };

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

    case CLEAR_ERROR_SUCCESS_STATE:
      return { ...state, authError: null, success: null };

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
    case CLEAR_CART:
      if (!state.logged_user) return state;
      const uid = state.logged_user.id;

      console.log("Before CLEAR_CART:", state.carts[uid]);

      const newState = {
        ...state,
        carts: {
          ...state.carts,
          [uid]: { id: uid, cartItems: [] },
        },
      };

      console.log("After CLEAR_CART:", newState.carts[uid]);

      return newState;

    default:
      return state;
  }
};

export default reducer;
