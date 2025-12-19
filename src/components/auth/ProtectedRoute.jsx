import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // 1. If we are still checking if the user is logged in, show a spinner
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#512da8]"></div>
            </div>
        );
    }

    // 2. If checking is done and no user is found, kick them out to Login Page
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // 3. If user exists, let them see the page (Dashboard)
    return children;
};

export default ProtectedRoute;