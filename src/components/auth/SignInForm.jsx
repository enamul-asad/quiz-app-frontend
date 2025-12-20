import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const SignInForm = ({ isActive, setIsActive }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <--- 1. New State
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // <--- 2. Start Loading

    try {
        const success = await login(username, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    } catch (err) {
        setError('Something went wrong. Please try again.');
    } finally {
        setIsLoading(false); // <--- 3. Stop Loading (always runs)
    }
  };

  return (
    <div className={`
        absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out flex flex-col items-center
        ${isActive ? 'invisible opacity-0 translate-y-10' : 'visible opacity-100 translate-y-0 z-20'}
        md:w-1/2 md:visible md:opacity-100 md:translate-y-0
        ${isActive ? 'md:translate-x-full md:opacity-0 md:invisible' : ''} 
    `}>
      <form onSubmit={handleSubmit} className="bg-white flex flex-col items-center justify-center h-full px-8 w-full max-w-sm">
        
        <h1 className="font-bold text-3xl mb-3">Sign In</h1>
        
        {/* Social Icons */}
        <div className="flex space-x-3 my-4">
          <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaGooglePlusG /></a>
          <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaFacebookF /></a>
          <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaGithub /></a>
          <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700"><FaLinkedinIn /></a>
        </div>
        
        <span className="text-xs text-gray-400 mb-4">or use your account</span>
        
        {error && <div className="bg-red-50 text-red-500 text-xs p-2 rounded w-full mb-3 text-center border border-red-100">{error}</div>}
        
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="bg-gray-100 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-[#512da8]/50 transition-all" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-gray-100 border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-[#512da8]/50 transition-all" />
        
        <Link to="/forgot-password" className="text-gray-500 text-xs mt-2 mb-4 hover:text-[#512da8] font-medium transition-colors">
          Forgot Your Password?
        </Link>
        
        {/* 4. Updated Button with Spinner */}
        <button 
            type="submit" 
            disabled={isLoading}
            className={`bg-[#512da8] text-white text-xs py-3 px-12 rounded-lg font-bold uppercase tracking-wider shadow-lg hover:bg-[#4527a0] transition-transform active:scale-95 flex items-center justify-center
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <div className="mt-8 md:hidden flex flex-col items-center w-full pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Don't have an account?</p>
            <button type="button" onClick={() => setIsActive(true)} className="text-[#512da8] font-bold text-xs border border-[#512da8] px-6 py-2 rounded-full hover:bg-[#512da8] hover:text-white transition-all">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;