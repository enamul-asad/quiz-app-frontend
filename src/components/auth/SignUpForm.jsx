import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import api from '../../services/api';

const SignUpForm = ({ isActive, setIsActive }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('register/', formData);
      window.location.reload();
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <div className={`
        /* Mobile: Fade In/Out */
        absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out
        ${isActive ? 'visible opacity-100 z-20' : 'invisible opacity-0'}

        /* Desktop: Sliding Logic */
        md:w-1/2 md:left-0 
        ${isActive ? 'md:translate-x-full md:opacity-100 md:visible md:z-5' : 'md:opacity-0 md:z-1'}
    `}>
      <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col h-full px-8 md:px-10 text-center">
        <h1 className="font-bold text-3xl mb-3">Create Account</h1>
        
        <div className="flex space-x-3 my-4">
            <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaGooglePlusG /></a>
            <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaFacebookF /></a>
            <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaGithub /></a>
            <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaLinkedinIn /></a>
        </div>
        
        <span className="text-sm mb-4">or use your email for registration</span>
        {error && <div className="bg-red-100 text-red-600 text-xs p-2 rounded w-full mb-2">{error}</div>}
        
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required className="bg-gray-200 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="bg-gray-200 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="bg-gray-200 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" />
        
        <button type="submit" className="bg-[#512da8] text-white text-xs py-3 px-10 rounded-lg font-semibold uppercase tracking-wide mt-4 shadow-lg">Sign Up</button>

        {/* MOBILE ONLY SWITCH */}
        <div className="mt-6 md:hidden">
            <p className="text-sm">Already have an account?</p>
            <button type="button" onClick={() => setIsActive(false)} className="text-[#512da8] font-bold text-sm mt-1">Sign In Here</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;