import React from 'react';
import { useNavigate,Link, useLocation } from 'react-router-dom'; // Import hooks
import { FaHome, FaHistory, FaTrophy, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation(); // Get current URL to set active state

    // Helper to check if link is active
    const isActive = (path) => location.pathname === path;
    const { logout } = useAuth();
    const navigate = useNavigate();

    // 3. Create the Logout Handler
    const handleLogout = (e) => {
        e.preventDefault(); // Stop the link from jumping immediately
        logout();           // Destroy the Token (The Real Logout)
        navigate('/');      // Go to Login Page
    };
    return (
        <div className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out flex flex-col h-full
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 md:static md:inset-0
        `}>

            {/* CHANGE 2: Update border color */}
            <div className="flex items-center justify-between h-20 border-b border-gray-200 dark:border-gray-700 px-6 shrink-0">
                <h1 className="text-2xl font-bold text-[#512da8]">QuizApp</h1>
                <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-red-500">
                    <FaTimes size={24} />
                </button>
            </div>

            <div className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
                {/* USE LINKS NOW */}
                <SidebarItem
                    icon={<FaHome />}
                    text="Dashboard"
                    to="/dashboard"
                    active={isActive('/dashboard')}
                />
                <SidebarItem
                    icon={<FaTrophy />}
                    text="Leaderboard"
                    to="/dashboard/leaderboard"
                    active={isActive('/dashboard/leaderboard')}
                />
                <SidebarItem
                    icon={<FaHistory />}
                    text="History"
                    to="/dashboard/history"
                    active={isActive('/dashboard/history')}
                />
                <SidebarItem
                    icon={<FaCog />}
                    text="Settings"
                    to="/dashboard/settings"
                    active={isActive('/dashboard/settings')}
                />
            </div>

           <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0 mt-auto">
                {/* CHANGE: Use onClick instead of just Link to="/" */}
                <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-left"
                >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

// Update Helper: Use Link instead of div
const SidebarItem = ({ icon, text, to, active }) => {
    return (
        <Link
            to={to}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors 
            ${active
                    ? 'bg-[#512da8] text-white shadow-md'
                    // CHANGE 4: Update Inactive state colors for dark mode
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
        >
            <span className="mr-3 text-lg">{icon}</span>
            <span className="font-medium">{text}</span>
        </Link>
    );
};

export default Sidebar;