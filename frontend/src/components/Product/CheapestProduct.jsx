import React from 'react';
import { useCheapProductsQuery } from '../../redux/api/ProductApiSlice';
import ProductCard from '../ProductCard/ProductCard';

function CheapProduct() {
  const { data: products, error, isLoading } = useCheapProductsQuery();
  console.log(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-8 mb-8 ml-3"> {/* Add margin-top for spacing from the top */}
      <h1 className="text-2xl font-bold mb-4 ml-3">Cheapest Products</h1> {/* Heading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CheapProduct;
