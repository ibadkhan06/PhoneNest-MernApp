import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../redux/api/ProductApiSlice';

export const useFetchReviews = () => {
  const { id } = useParams();
  const { data: product, error, isLoading, refetch } = useGetProductQuery(id);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (product) {
      setReviews(product.reviews);
    }
  }, [product]);

  return { reviews, error, isLoading, refetch };
};
