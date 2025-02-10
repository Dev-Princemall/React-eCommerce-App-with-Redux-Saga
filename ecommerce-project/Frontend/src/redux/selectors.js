export const selectProducts = (state) => state.products;

export const selectLoading = (state) => state.loading;

export const selectError = (state) => state.error;

export const selectAuthError = (state) => state.authError;
export const selectSuccess = (state) => state.success;

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

export const selectCategoryFilter = (state) => state.filters.category;
export const selectSortBy = (state) => state.filters.sortBy;
export const selectFilteredAndSortedProducts = (state) => {
  const products = selectProducts(state);
  const category = selectCategoryFilter(state);
  const sortBy = selectSortBy(state);

  const filteredProducts = products.filter((product) =>
    category ? product.category === category : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price;
    if (sortBy === "priceHighToLow") return b.price - a.price;
    if (sortBy === "nameAsc") return a.title.localeCompare(b.title);
    if (sortBy === "nameDesc") return b.title.localeCompare(a.title);
    return 0;
  });

  return sortedProducts;
};

export const selectLoggedUserDeliveryInfo = (state) => {
  const logged_user = selectLoggedUsers(state);
  return logged_user && state.deliveryInfo
    ? state.deliveryInfo[logged_user.id] || null
    : null;
};
export const selectLoggedUserPaymentInfo = (state) => {
  const logged_user = selectLoggedUsers(state);
  return (logged_user && state.payment_info) || null;
};

export const selectLoggedUserOrderHistory = (state) => {
  const logged_user = selectLoggedUsers(state);
  return logged_user && state.order_history
    ? state.order_history[logged_user.id] || null
    : null;
};
