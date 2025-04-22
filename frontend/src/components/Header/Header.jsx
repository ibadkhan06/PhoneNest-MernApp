import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/authSlice';
function Header() {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [temp, setTemp] = useState("");

    const handleEnter = (e) => {
        if (e.key === 'Enter' && temp.trim()) {
            navigate(`search/?temp=${temp.trim()}&page=1`);
        }
    };
    const handleChange=()=>{
        dispatch(logout())
    }
const status=useSelector((state)=>state.auth.loginStatus)
const user=useSelector((state)=>state.auth.userData)
const {cartItems}=useSelector(state=>state.cart)

useEffect(() => {
    // Check session expiration when the component mounts
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime && new Date().getTime() > parseInt(expirationTime)) {
        // Session expired, log out user
        dispatch(logout());
    }
}, [dispatch]);        //checking expiry time when comp mounts everytime,dispatch does not change usually it is for good practice

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center p-4 ">
                {/* Logo */}
                <div className="text-2xl font-bold mr-4 ml-44 ">
                    <Link to="/" className="text-blue-600 text-">E-Shop</Link>
                </div>

                {/* Search Bar */}
                <div className="flex-grow mx-4 max-w-lg"> {/* Adjusted max-width */}
                    <input
                        type="text"
                        value={temp}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Search for products..."
                        onChange={(e) => setTemp(e.target.value)}
                        onKeyDown={handleEnter}
                    />
                </div>

                {/* Login/Signup and Cart */}
                <div className="flex items-center space-x-4">
                    {!status ? (
                        <>
                            <Link to="/login" className="text-gray-700 border border-black p-2 rounded ">Login</Link>
                            <Link to="/signup" className="text-gray-700  border border-black p-2 rounded">Signup</Link>
                        </>
                    ) : (
                        <>
                        <span className="text-gray-700 border border-black p-2 rounded">Welcome {user.email}</span>
                        <button onClick={handleChange} className="text-gray-700 border border-black p-2 rounded">Logout</button>
                        </>
                    )}
                    <Link to="/cart" className="relative">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1.2-6H6.2L7 13zm0 0l-1 5h13l-1-5H7zM5 21h2m10 0h2m-6-4h2m-6 4h2m-4-4v1m12-1v1m0-2H5m10-2H9m4-3H8l1.4-5h5.2L13 9z" />
                        </svg>
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartItems.length}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;

//when user logged out or logged in state changes in redux  and comp re-renders:

// when the state changes in Redux, any component that relies on that state via the useSelector hook will automatically re-render. 
// This re-rendering happens to ensure that the component reflects the updated state.