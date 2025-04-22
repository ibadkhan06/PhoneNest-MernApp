import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, } from '../../redux/features/cartSlice';
import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons
import { Link } from 'react-router-dom';
function Cart() {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (item, quantity) => {
    dispatch(addToCart({ ...item, quantity }));
  };
  const handleShopping = () => {
    navigate("/")
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="p-6 bg-white text-black-600 mb-60">
      <h1 className="text-2xl font-bold text-center mb-4 mt-12 ml-20">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg ml-20 mb-40">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
              {/* Product Information */}
              <div className="flex items-center w-2/4">
                <img src={`http://localhost:4000${item.image}`} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-md text-blue-600">PKR {item.price}</p>
                </div>
              </div>
              
              {/* Quantity, Price, and Delete Icon */}
              <div className="flex items-center justify-between w-2/4 ">
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-blue-600 text-white py-1 px-2 rounded-md disabled:opacity-50"
                    onClick={() => handleChange(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="bg-blue-600 text-white py-1 px-2 rounded-md"
                    onClick={() => handleChange(item, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="text-red-600 ml-2"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrashAlt size={20} />
                  </button>
                  
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-md font-semibold text-blue-600">
                    PKR {(item.price * item.quantity).toFixed(2)}
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right text-lg font-semibold">
            Total Price: PKR {totalPrice.toFixed(2)}
          </div>
          <div className='flex justify-end mb-4'>
          <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-md ml-3 hover:bg-blue-700 transition duration-200">Proceed to Checkout</Link>
          <button
                onClick={handleShopping}
                className="bg-blue-600 text-white px-6 py-2 rounded-md ml-3 hover:bg-blue-700 transition duration-200"
              >
               Continue Shopping
              </button>
              
        </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
