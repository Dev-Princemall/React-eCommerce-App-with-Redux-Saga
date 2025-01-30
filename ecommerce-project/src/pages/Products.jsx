import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../Redux/actions";
import ProductList from "../Components/ProductList";
import "../styles/products.css";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const resetCategory = () => {
    setCategory("");
  };
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

  return (
    <>
      {error && <p className="error">Error: {error}</p>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="filter-container">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="electronics">Electronics</option>
              <option value="men's clothing">Mens Clothing</option>
              <option value="women's clothing">Womens Clothing</option>
              <option value="jewelery">Jewelery </option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort By</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
            </select>

            <button onClick={resetCategory}>Reset</button>
          </div>
          <ProductList products={sortedProducts} />
        </>
      )}
    </>
  );
}
