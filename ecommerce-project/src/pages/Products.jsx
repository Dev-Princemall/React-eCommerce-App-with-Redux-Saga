import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRequest } from "../Redux/actions";
import ProductList from "../Components/ProductList";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <>
      <h1>Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ProductList products={products} />
    </>
  );
}
