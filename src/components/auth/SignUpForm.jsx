import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import api from '../../services/api'; // <--- 1. Import your API helper

const SignUpForm = ({ isActive }) => {
  // 2. State for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // 3. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        // Send data to Django endpoint: /api/register/
        await api.post('register/', formData);
        
        // On success:
        alert("Account created successfully! Please Sign In.");
        window.location.reload(); // Refresh page to clear form and allow login
    } catch (err) {
        console.error(err);
        // Handle errors (e.g., username already taken)
        if (err.response && err.response.data.username) {
            setError("Username already exists.");
        } else {
            setError("Registration failed. Please try again.");
        }
    }
  };

  return (
    <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 ${isActive ? 'opacity-100 z-5 translate-x-full' : 'opacity-0 z-1'}`}>
      <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col h-full px-10 text-center">
        <h1 className="font-bold text-4xl mb-3">Create Account</h1>
        
        {/* Social Icons Container */}
        <div className="flex space-x-3 my-4">
            <a href="#" className="social-icon"><FaGooglePlusG /></a>
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaGithub /></a>
            <a href="#" className="social-icon"><FaLinkedinIn /></a>
        </div>

        <span className="text-sm mb-4">or use your email for registration</span>

        {/* Error Message */}
        {error && (
            <div className="bg-red-100 text-red-600 text-xs p-2 rounded w-full mb-2 border border-red-200">
                {error}
            </div>
        )}

        {/* 5. Inputs with name, value, and onChange */}
        <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            required
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-200 border-none my-2 py-2.5 px-3 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-800 transition-all" 
        />
        <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-200 border-none my-2 py-2.5 px-3 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-800 transition-all" 
        />
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-200 border-none my-2 py-2.5 px-3 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-800 transition-all" 
        />
        
        <button type="submit" className="bg-indigo-800 text-white text-xs py-2.5 px-10 rounded-lg font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:bg-indigo-900 transition-colors shadow-lg">
            Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;