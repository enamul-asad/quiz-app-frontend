import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get token & uid from the URL (e.g. ?uid=...&token=...)
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    setStatus('loading');
    try {
        await api.post('password-reset/confirm/', {
            uid,
            token,
            new_password: password
        });
        setStatus('success');
        
        // Redirect to login after 3 seconds
        setTimeout(() => navigate('/'), 3000);
    } catch (error) {
        console.error(error);
        setStatus('error');
    }
  };

  if (status === 'success') {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Password Reset!</h2>
                <p className="text-gray-500 mt-2">Your password has been updated successfully.</p>
                <p className="text-sm text-gray-400 mt-4">Redirecting to login...</p>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Set New Password</h2>

        {status === 'error' && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
                Link is invalid or expired. Please try again.
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                <div className="relative mt-1">
                    <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                    <input 
                        type="password" 
                        required
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#512da8]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                <div className="relative mt-1">
                    <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                    <input 
                        type="password" 
                        required
                        className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#512da8]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <button 
                disabled={status === 'loading'}
                className="w-full bg-[#512da8] text-white py-3 rounded-lg font-bold hover:bg-indigo-900 transition mt-4 disabled:opacity-50"
            >
                {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;