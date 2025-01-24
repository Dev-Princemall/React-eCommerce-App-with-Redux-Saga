import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        width: '200px',
        textAlign: 'center',
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100px', height: '100px' }}
      />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductItem;
