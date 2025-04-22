import React from 'react';

const StarRating = ({ rating, setRating }) => {
  const handleStarClick = (index) => {
    if (setRating) {
      setRating(index + 1);
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => (
        <svg
          key={index}
          onClick={() => handleStarClick(index)}
          className={`w-8 h-8 cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049.927c.3-.921 1.603-.921 1.902 0l2.244 6.933 7.279.02c.97.002 1.37 1.253.588 1.816l-5.936 4.293 2.245 6.933c.3.921-.756 1.688-1.545 1.153L10 15.916l-5.527 4.129c-.789.535-1.845-.232-1.545-1.153l2.244-6.933L.236 9.696c-.781-.563-.381-1.814.588-1.816l7.279-.02L9.049.927z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
