import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from "../../redux/api/userApiSlice";
import { login } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form data and user data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userData, setUserData] = useState(null);

  // Handle changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      email: formData.email || "",
      password: formData.password || "",
    };

    try {
      const response = await loginUser(dataToSend).unwrap();
      if (response.user) {
        dispatch(login({ userData: response.user }));
        setUserData(response.user); // Set user data to state
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 mb-36 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
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
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        {isError && error && (
          <div className="text-red-500 text-sm mt-4">
            <p>
              {typeof error.error === 'string'
                ? error.error
                : error.error?.message || 'An error occurred. Please try again.'}
            </p>
          </div>
        )}
      </form>

      {/* Display user data for debugging */}
      {userData && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
          <h3 className="text-lg font-bold mb-2">User Data:</h3>
          <pre className="text-sm">{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Login;
