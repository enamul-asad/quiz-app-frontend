import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; 

const SignInForm = ({ isActive }) => {
  // 2. State for inputs and errors
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 3. Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // 4. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Call the login function from AuthContext
    const success = await login(username, password);

    if (success) {
        navigate('/dashboard'); // Redirect to Dashboard on success
    } else {
        setError('Invalid username or password');
    }
  };

  return (
    <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${isActive ? 'translate-x-full' : ''}`}>
      <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col h-full px-10 text-center">
        <h1 className="font-bold text-4xl mb-3">Sign In</h1>

        {/* Social Icons Container */}
        <div className="flex space-x-3 my-4">
          <a href="#" className="social-icon"><FaGooglePlusG /></a>
          <a href="#" className="social-icon"><FaFacebookF /></a>
          <a href="#" className="social-icon"><FaGithub /></a>
          <a href="#" className="social-icon"><FaLinkedinIn /></a>
        </div>

        <span className="text-sm mb-3">or use your username password</span>
        
        {/* Error Message Display */}
        {error && (
            <div className="bg-red-100 text-red-600 text-xs p-2 rounded w-full mb-2 border border-red-200">
                {error}
            </div>
        )}

        {/* 5. Inputs wired to state */}
        <input 
            type="text" 
            placeholder="Username" 
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-200 border-none my-2 py-2.5 px-3 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-800 transition-all" 
        />
        <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 border-none my-2 py-2.5 px-3 text-sm rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-800 transition-all" 
        />
        
        <Link to="/forgot-password" className="text-gray-800 text-xs mt-4 mb-2 hover:text-[#512da8] transition-colors font-medium">
          Forget Your Password?
        </Link>
        
        <button type="submit" className="bg-indigo-800 text-white text-xs py-2.5 px-10 rounded-lg font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:bg-indigo-900 transition-colors shadow-lg">
            Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;