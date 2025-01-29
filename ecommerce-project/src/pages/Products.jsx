import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../Redux/actions";
import ProductList from "../Components/ProductList";
import "../styles/products.css";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <>
      {error && <p className="error">Error: {error}</p>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
