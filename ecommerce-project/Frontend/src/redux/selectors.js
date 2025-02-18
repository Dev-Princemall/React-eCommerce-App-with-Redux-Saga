// Product selectors
export const selectProducts = (state) => state.product?.products || [];

export const selectProductLoading = (state) => state.product?.loading || false;
export const selectProductError = (state) => state.product?.error || null;

export const selectCategoryFilter = (state) =>
  state.product?.filters?.category || "";
export const selectSortBy = (state) => state.product?.filters?.sortBy || "";

export const selectFilteredAndSortedProducts = (state) => {
  const products = selectProducts(state);
  console.log("selectors Product in FIlterandsort: ", products);
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

// Users selectors
export const selectLoggedUser = (state) => state.auth?.user || null;
export const selectAuthToken = (state) => state.auth?.token || null;
export const selectAuthError = (state) => state.auth?.error || null;
export const selectAuthLoading = (state) => state.auth?.loading || null;
export const selectAuthSuccess = (state) => state.auth?.success || false;
export const selectUserData = (state) => state.auth?.user || null;
export const selectLoggedUserDeliveryInfo = (state) =>
  state.auth?.user?.address || null;

export const selectLoggedUserPaymentInfo = (state) => {
  const logged_user = selectLoggedUser(state);
  return logged_user ? state.payment_info?.[logged_user._id] || null : null;
};

// cart selectors
export const selectCart = (state) => {
  const logged_user = selectLoggedUser(state);
  return logged_user ? state.cart?.cart || [] : [];
};

export const selectCartSuccess = (state) => state.cart?.success || false;
export const selectCartError = (state) => state.cart?.error || false;

export const selectCartCount = (state) => {
  const logged_user = selectLoggedUser(state);
  return logged_user ? state.cart?.cart?.items?.length || 0 : 0;
};

export const selectLoggedUserOrderHistory = (state) => {
  const logged_user = selectLoggedUser(state);
  return logged_user ? state.order_history?.[logged_user._id] || [] : [];
};
