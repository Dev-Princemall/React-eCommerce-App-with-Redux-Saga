import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  setCategoryFilter,
  setSortBy,
} from "../Redux/actions";
import ProductList from "../Components/ProductList";
import {
  selectFilteredAndSortedProducts,
  selectCategoryFilter,
  selectSortBy,
  selectProductLoading,
  selectProductError,
} from "../redux/selectors";
import "../styles/Products.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredAndSortedProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const categoryFilter = useSelector(selectCategoryFilter);
  const sortByFilter = useSelector(selectSortBy);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    dispatch(setSortBy(params.get("sortBy") || ""));
    dispatch(setCategoryFilter(params.get("category") || ""));
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const resetFilters = () => {
    dispatch(setCategoryFilter(""));
    dispatch(setSortBy(""));
    navigate({ search: "" });
  };
  const handleCategoryFilterChange = (event) => {
    dispatch(setCategoryFilter(event.target.value));
    updateUrlParams(sortByFilter, event.target.value);
  };
  const handleSortByFilterChange = (event) => {
    dispatch(setSortBy(event.target.value));
    updateUrlParams(event.target.value, categoryFilter);
  };

  const updateUrlParams = (filter, category) => {
    const params = new URLSearchParams();
    if (filter) params.set("sortBy", filter);
    if (category) params.set("category", category);
    navigate({ search: params.toString() });
  };
  return (
    <div className="products-container">
      {error && <p className="error">Error: {error}</p>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        !error && (
          <>
            <div className="filter-section">
              <select
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
                className="filter-dropdown"
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                <option value="electronics">Electronics</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
              </select>
              <select
                value={sortByFilter}
                onChange={handleSortByFilterChange}
                className="filter-dropdown"
              >
                <option value="" disabled hidden>
                  Sort By
                </option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="nameAsc">Name: A to Z</option>
                <option value="nameDesc">Name: Z to A</option>
              </select>
              <button className="reset-button" onClick={resetFilters}>
                Reset
              </button>
            </div>
            <ProductList products={products} />
          </>
        )
      )}
    </div>
  );
}
