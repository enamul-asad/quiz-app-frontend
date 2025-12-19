import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
        // Send request to Django
        await api.post('password-reset/', { email });
        setStatus('success');
    } catch (error) {
        console.error(error);
        // For security, we usually don't tell the user if the email failed, 
        // but for dev we can set error state.
        setStatus('success'); // Fake success to prevent email enumeration attacks
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-500 mb-6 text-sm">Enter your email and we'll send you a reset link.</p>

        {status === 'success' ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-sm border border-green-200">
                <p className="font-bold">Check your inbox!</p>
                <p>If an account exists for {email}, we have sent a password reset link.</p>
                <p className="mt-2 text-xs text-gray-500">(Check your server console if running locally)</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                    <input 
                        type="email" 
                        required
                        placeholder="Enter your email address" 
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#512da8] text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button 
                    disabled={status === 'loading'}
                    className="w-full bg-[#512da8] text-white py-3 rounded-lg font-bold hover:bg-indigo-900 transition disabled:opacity-50"
                >
                    {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
        )}

        <div className="mt-6">
            <Link to="/" className="text-gray-500 text-sm hover:text-[#512da8] flex items-center justify-center">
                <FaArrowLeft className="mr-2" /> Back to Login
            </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;