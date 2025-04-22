import React from 'react'
import { Link } from 'react-router-dom';

function Footer(){
  return (
    <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
            <div>
                <h5 className="text-lg font-bold">E-Shop</h5>
                <p>&copy; 2023 E-Shop. All rights reserved.</p>
            </div>

            <div className="flex space-x-4">
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
            </div>
        </div>
    </footer>
);
};




export default Footer