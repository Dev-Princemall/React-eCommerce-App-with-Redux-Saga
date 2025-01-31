export const selectProducts = (state) => state.products;

export const selectLoading = (state) => state.loading;

export const selectError = (state) => state.error;

export const selectAuthError = (state) => state.authError;

export const selectUsers = (state) => state.users;

export const selectLoggedUsers = (state) => state.logged_user;

export const selectLoggedUsersCart = (state) => {
  const logged_user = selectLoggedUsers(state);
  if (logged_user) {
    return state.carts[logged_user.id]?.cartItems || [];
  }
  return [];
};

export const selectCartCount = (state) => {
  const logged_user = selectLoggedUsers(state);
  return logged_user ? state.carts[logged_user.id]?.cartItems.length || 0 : 0;
};
