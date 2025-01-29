import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from "./constants";

const initialState = {
  products: [],
  users: [],
  carts: {}, // Stores cart items by userId
  logged_user: null,
  loading: false,
  error: null,
  authError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_USER:
      if (state.users.some((user) => user.name === action.payload.name)) {
        return { ...state, authError: "User already exists" };
      }
      return {
        ...state,
        users: [...state.users, action.payload],
        authError: null,
      };

    case ADD_TO_CART: {
      if (!state.logged_user) {
        return state; // If no user is logged in, do nothing
      }

      const userId = state.logged_user.id;
      const existingCart = state.carts[userId]?.cartItems || [];
      const existingCartItem = existingCart.find(
        (item) => item.id === action.payload.id
      );

      const updatedCartItems = existingCartItem
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
          [userId]: {
            id: userId,
            cartItems: updatedCartItems,
          },
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
              ? { ...item, quantity: item.quantity - 1 } // Reduce quantity
              : null // Remove item if quantity is 1
            : item
        )
        .filter(Boolean); // Remove null items

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
        return { ...state, logged_user: user, authError: null };
      }
      return { ...state, authError: "Invalid credentials" };
    }

    case LOGOUT_USER:
      return { ...state, logged_user: null, authError: null };

    default:
      return state;
  }
};

export default reducer;
