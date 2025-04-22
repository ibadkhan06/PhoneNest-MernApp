import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to ={`/product/${product._id}`} className='block'>
    <div className="bg-white border rounded-md p-4 shadow-lg">
      <img src={`http://localhost:4000${product.image}`} alt={product.name} className="w-full h-32 object-cover mb-4" />
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600">Rs.{product.price}</p>
    </div>
    </Link>
  );
};

export default ProductCard;
