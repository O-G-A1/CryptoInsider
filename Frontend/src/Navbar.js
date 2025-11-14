import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onSignupClick, onLoginClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-6 py-4 bg-white shadow">
      <div className="flex justify-between items-center">
        {/* Brand with Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="CryptoInsider Logo"
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold text-indigo-700 hover:text-indigo-900">
            CryptoInsider
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
          <li><Link to="/features" className="hover:text-indigo-600">Features</Link></li>
          <li>
            <button onClick={onLoginClick} className="hover:text-indigo-600">
              Login
            </button>
          </li>
          <li>
            <button
              onClick={onSignupClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-indigo-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 font-medium text-gray-700">
          <Link to="/about" className="hover:text-indigo-600">About Us</Link>
          <Link to="/features" className="hover:text-indigo-600">Features</Link>

          {/* Styled mobile Login button */}
          <button
            onClick={onLoginClick}
            className="px-4 py-2 border border-indigo-600 text-indigo-700 rounded hover:bg-indigo-50 transition"
          >
            Login
          </button>

          {/* Primary mobile Sign Up button */}
          <button
            onClick={onSignupClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}