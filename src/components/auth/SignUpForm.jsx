import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import api from '../../services/api';

const SignUpForm = ({ isActive, setIsActive }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // <--- 1. New Success State

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('register/', formData);
      
      // 2. Show Success Message
      setSuccess("Account created successfully! Redirecting to login...");
      
      // 3. Wait 2 seconds, then switch to Sign In view automatically
      setTimeout(() => {
        setIsActive(false); // Switch to Login
        setSuccess('');     // Clear message
        setFormData({ username: '', email: '', password: '' }); // Reset form
      }, 2000);

    } catch (err) {
      if (err.response && err.response.data.username) {
        setError("Username already exists.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={`
        absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out flex flex-col items-center
        /* Mobile Visibility */
        ${isActive ? 'visible opacity-100 translate-y-0 z-20' : 'invisible opacity-0 translate-y-10'}
        
        /* Desktop Overrides */
        md:w-1/2 md:left-0 md:translate-y-0
        ${isActive ? 'md:translate-x-full md:opacity-100 md:visible md:z-5' : 'md:opacity-0 md:z-1'}
    `}>
      <form onSubmit={handleSubmit} className="bg-white flex flex-col items-center justify-center h-full px-8 w-full max-w-sm">
        
        <h1 className="font-bold text-3xl mb-3 hidden md:block">Create Account</h1>
        
        <div className="flex space-x-3 my-4">
            <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaGooglePlusG /></a>
            <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaFacebookF /></a>
            <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaGithub /></a>
            <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaLinkedinIn /></a>
        </div>
        
        <span className="text-xs text-gray-400 mb-4">or use your email</span>
        
        {/* Error Message */}
        {error && (
            <div className="bg-red-50 text-red-500 text-xs p-2 rounded w-full mb-3 text-center border border-red-100">
                {error}
            </div>
        )}

        {/* --- SUCCESS MESSAGE (New) --- */}
        {success && (
            <div className="bg-green-50 text-green-600 text-xs p-2 rounded w-full mb-3 text-center border border-green-100 font-medium">
                {success}
            </div>
        )}
        
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="bg-gray-100 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-[#512da8]/50 transition-all" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="bg-gray-100 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-[#512da8]/50 transition-all" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="bg-gray-100 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-[#512da8]/50 transition-all" />
        
        <button 
            type="submit" 
            disabled={!!success} // Disable button while redirecting
            className={`bg-[#512da8] text-white text-xs py-3 px-12 rounded-lg font-bold uppercase tracking-wider shadow-lg hover:bg-[#4527a0] mt-4 transition-transform active:scale-95 ${success ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {success ? 'Success!' : 'Sign Up'}
        </button>

        {/* --- MOBILE TOGGLE BUTTON --- */}
        <div className="mt-8 md:hidden flex flex-col items-center w-full pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Already have an account?</p>
            <button 
                type="button" 
                onClick={() => setIsActive(false)} 
                className="text-[#512da8] font-bold text-xs border border-[#512da8] px-6 py-2 rounded-full hover:bg-[#512da8] hover:text-white transition-all"
            >
                Log In
            </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;