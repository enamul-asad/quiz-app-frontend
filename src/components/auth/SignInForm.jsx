import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const SignInForm = ({ isActive, setIsActive }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={`
        /* Mobile: Standard stacking */
        absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out
        ${isActive ? 'invisible opacity-0' : 'visible opacity-100 z-20'}
        
        /* Desktop: Sliding logic overrides */
        md:w-1/2 md:visible md:opacity-100
        ${isActive ? 'md:translate-x-full md:opacity-0 md:invisible' : ''} 
    `}>
      <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col h-full px-8 md:px-10 text-center">
        <h1 className="font-bold text-3xl mb-3">Sign In</h1>
        
        <div className="flex space-x-3 my-4">
          <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaGooglePlusG /></a>
          <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaFacebookF /></a>
          <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaGithub /></a>
          <a href="#" className="border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center hover:bg-gray-100"><FaLinkedinIn /></a>
        </div>
        
        <span className="text-sm mb-3">or use your username password</span>
        
        {error && <div className="bg-red-100 text-red-600 text-xs p-2 rounded w-full mb-2">{error}</div>}
        
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="bg-gray-200 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-gray-200 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" />
        
        <Link to="/forgot-password" className="text-gray-800 text-xs mt-4 mb-2 hover:text-[#512da8] font-medium">Forget Your Password?</Link>
        
        <button type="submit" className="bg-[#512da8] text-white text-xs py-3 px-10 rounded-lg font-semibold uppercase tracking-wide mt-4 shadow-lg">Sign In</button>

        {/* MOBILE ONLY SWITCH */}
        <div className="mt-6 md:hidden">
            <p className="text-sm">Don't have an account?</p>
            <button type="button" onClick={() => setIsActive(true)} className="text-[#512da8] font-bold text-sm mt-1">Sign Up Here</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;