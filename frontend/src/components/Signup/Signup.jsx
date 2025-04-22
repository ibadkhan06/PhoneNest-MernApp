import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useRegisterMutation}from "../../redux/api/userApiSlice"
import { login } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

function Signup(){
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    city: ''
  });
  const [userData, setuserData] = useState(null);

  const handleChange = (e) => {
    setFormData(prevState=>({...prevState,[e.target.name]:e.target.value}))   //This means that the property in formData corresponding to the input field's name attribute will be updated with the new value from e.target.value.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      email: formData.email || '',
      password: formData.password || '',
      phone: formData.phone || '', 
      city: formData.city || ''    
    };

    try {
      const response = await register(dataToSend).unwrap();
      if (response.user) {
        dispatch(login({ userData: response.user }));
        setuserData(response.user);
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  }, [userData, navigate]);

  return (
    <div className="max-w-md mx-auto  p-6 bg-white shadow-md rounded-lg mb-36 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      
    {/* {isError && error && (
  <div className="text-red-500 text-sm">
    {Object.keys(error).map((key) => {
      const errorMessage = typeof error[key] === 'string' ? error[key] : JSON.stringify(error[key]);
      return <p key={key}>{errorMessage}</p>;
    })}
  </div>
)} */}
{isError && error && (
  <div className="text-red-500 text-sm">
    {Object.values(error).map((errorValue, index) => {
      const errorMessage = typeof errorValue === 'string' ? errorValue : JSON.stringify(errorValue);
      return <p key={index}>{errorMessage}</p>;
    })}
  </div>
)}

    


      </form>
    </div>
  );
};

export default Signup;
//error returned from hook generally contain errors from server side like validation errros

// and error caught in catch block are client side error,network and syntax error,unexpected exception


// catch block errors:
//"Network error. Please check your connection and try again."

// Example: An issue in the code logic or an incorrect implementation in the component that leads to errors during form submission.
// Error Message: "Unexpected error occurred. Please try again later."
