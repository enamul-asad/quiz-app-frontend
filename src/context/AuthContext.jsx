import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // removing navigate from here to avoid circular dependency errors in some setups
    // We will return login success/fail and let the component navigate.

    useEffect(() => {
        // Check if user is already logged in when app loads
        const token = localStorage.getItem('access');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ username: decoded.username || 'User', id: decoded.user_id });
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('login/', { username, password });
            
            // Save tokens to browser memory
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            
            // Decode token to get user info
            const decoded = jwtDecode(response.data.access);
            setUser({ username: username, id: decoded.user_id });
            
            return true; // Success
        } catch (error) {
            console.error("Login failed", error);
            return false; // Failed
        }
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);