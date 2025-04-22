import React, { useState, useEffect,useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddReviewMutation, useGetProductQuery } from '../../redux/api/ProductApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import StarRating from './StarRating';
import Reviews from './Reviews';
import { useFetchReviews } from './useFetchReviews';
import io from 'socket.io-client';
import debounce from 'lodash.debounce'; // Import debounce if needed

const socket = io('http://localhost:4000');

function ProductDetail() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const { reviews, error: reviewsError, isLoading: reviewsLoading, refetch } = useFetchReviews(id);
  const [addReview] = useAddReviewMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState('');
  const typingTimeoutRef = useRef(null);

  const status = useSelector((state) => state.auth.loginStatus);

  useEffect(() => {
    // Socket event listeners
    const handleChat = (data) => {
      setChat((prevChat) => [...prevChat, data]);
    };

    const handleTyping = (data) => {
      setTyping(data);
    };

    socket.on('chat', handleChat);
    socket.on('typing', handleTyping);

    return () => {
      // Clean up socket listeners
      socket.off('chat', handleChat);
      socket.off('typing', handleTyping);
    };
  }, []);

  if (isLoading || reviewsLoading) return <div>Loading...</div>;
  if (error || reviewsError) return <div>Error loading product</div>;

  const handleAddToCart = () => {
    if (status) {
      dispatch(addToCart({ ...product, quantity }));
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      navigate('/login');
    }
  };

  const handleShopping = () => {
    navigate('/');
  };

  const handleRating = async () => {
    try {
      const dataToSend = {
        content: content,
        rating: rating
      };
      console.log('Data to send:', dataToSend);
      const review = await addReview({ id, dataToSend }).unwrap();
      if (review) {
        refetch();
        setContent('');
        setRating(0);
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      console.error('Adding Review Failed:', errorMessage);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('chat', { message, user: 'User' });
      setMessage('');
    }
  };

  // Debounce the typing event to avoid too many emissions
 // Create a ref to store the timeout


const handleTyping = () => {
  socket.emit('typing', 'User is typing...');

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  // Emit 'typing' stopped after 1.5 seconds of inactivity
  typingTimeoutRef.current = setTimeout(() => {
    socket.emit('typing', '');
  }, 1500);
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 py-12">
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`http://localhost:4000${product.image}`}
            srcSet={`http://localhost:4000${product.image} 1x, http://localhost:4000${product.image.replace('.jpg', '@2x.jpg')} 2x`}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg border border-gray-200 mb-4 md:mb-0"
          />
          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold text-gray-800 mb-4">Rs. {product.price}</p>
              <p className="text-lg text-gray-700 mb-6">Brand: {product.brand}</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  -
                </button>
                <span className="px-4 py-2 border-t border-b text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded-md ml-20 hover:bg-blue-700 transition duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={handleShopping}
                className="bg-blue-600 text-white px-6 py-2 rounded-md ml-3 hover:bg-blue-700 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        <Reviews reviews={reviews} />

        {status && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
            <StarRating rating={rating} setRating={setRating} />
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your review here..."
            />
            <button
              onClick={handleRating}
              className="bg-blue-600 text-white px-6 py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-200"
            >
              Submit Review
            </button>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Community Chat</h2>
          <div className="border p-4 rounded-md mb-4">
            <div className="h-64 overflow-y-auto mb-4">
              {chat.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.user}: </strong>{msg.message}
                </div>
              ))}
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}  // if the variable is tied to state then everychnage in input field cause the re render of the component.
              onKeyUp={handleTyping} // Call handleTyping on keyup
              placeholder="Type your message here..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-200"
            >
              Send
            </button>
          </div>
          {typing && <p>{typing}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
