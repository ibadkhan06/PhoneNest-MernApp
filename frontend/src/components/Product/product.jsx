import React from 'react';
import { useTopRatedQuery } from '../../redux/api/ProductApiSlice';
import ProductCard from '../ProductCard/ProductCard';

function Product() {
  const { data: products, error, isLoading } = useTopRatedQuery();
  console.log(products);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
       <div className="w-full">
                <img 
                  src="http://phonenest-frontend.s3-website-us-east-1.amazonaws.com/picture.jpg" 
                  alt="Cover" 
                  className="w-full h-96"
                />
            </div>
    <div className="mt-8 mb-8 ml-3"> {/* Add margin-top for spacing from the top */}
      <h1 className="text-2xl font-bold mb-4 ml-3">Top Rated Mobiles</h1> {/* Heading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Product;
