import React, { useState } from 'react';
import { addShipping} from '../../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const[form,setForm]=useState({
    city:"",
    country:"",
    address:"",
    paymentMethod:""
  })
const dispatch=useDispatch()
const navigate=useNavigate()

    const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})          //array for dynamically changing
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(addShipping({address:{city:form.city,country:form.country,address:form.address},paymentMethod:form.paymentMethod}))
        navigate("/order-summary")
    }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-16 mb-24">
      <h2 className="text-2xl font-bold text-center mb-6">Shipping Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-1">Payment Method</span>
          <div className="flex items-center">
            <input
              type="radio"
              id="online"
              name="paymentMethod"
              value="online"
              checked={form.paymentMethod==="online"}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label htmlFor="online" className="mr-4">Online Payment</label>
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === 'cod'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
        </div>

        <div className="text-center mt-3">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
          >
         Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
