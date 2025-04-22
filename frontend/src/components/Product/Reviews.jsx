import React from 'react';
import StarRating from './StarRating'; // Import the StarRating component

const Reviews = ({ reviews }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <div className="flex items-center">
              <StarRating rating={review.rating} setRating={() => {}} /> {/* Read-only stars */}
              <p className="ml-2 text-gray-700">{review.rating} out of 5</p>
            </div>
            <p className="mt-2 text-gray-700">{review.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No reviews yet. Be the first to review this product.</p>
      )}
    </div>
  );
};

export default Reviews;
