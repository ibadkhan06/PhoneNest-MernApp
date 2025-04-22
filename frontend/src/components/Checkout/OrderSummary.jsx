import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePlaceOrderMutation } from '../../redux/api/OrderApiSlice';
import { clearOrder } from '../../redux/features/cartSlice';

function OrderSummary() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [placeOrder, { isLoading, error }] = usePlaceOrderMutation();

  const handleSubmit = async () => {
    try {
      const order = await placeOrder(cart).unwrap();
      if (order) {
        dispatch(clearOrder());
        setOrderPlaced(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16 mb-24">
      {orderPlaced ? (
        <div className="text-center text-green-600">
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p>Your order has been placed successfully. Thank you for shopping with us!</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mt-10 mb-2">Order Details</h3>
            {cart.cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
                <img src={`http://localhost:4000${item.image}`} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-md text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-md text-gray-600">Price: PKR {item.price}</p>
                </div>
                <p className="text-md font-semibold text-gray-800">Total: PKR {item.price * item.quantity}</p> 
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
            <p className="text-md text-gray-600">Address: {cart.shippingAddress.address}</p>
            <p className="text-md text-gray-600">City: {cart.shippingAddress.city}</p>
            <p className="text-md text-gray-600">Country: {cart.shippingAddress.country}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
            <p className="text-md text-gray-600">
              {cart.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}
            </p>
          </div>

          <div className="text-right text-lg font-semibold">
            <p>Total Price: PKR {cart.totalPrice}</p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
            {error && <p className="text-red-600 mt-4">{error.message}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
