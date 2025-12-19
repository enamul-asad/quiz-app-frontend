import { FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Import Hook
import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Ensure correct path

const Header = ({ toggleSidebar }) => {
  
  // 2. GET USER FROM CONTEXT
  const { user } = useAuth();
   const [avatar, setAvatar] = useState(null);

    // Fetch Avatar on Mount
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await api.get('user/avatar/');
                // Only use the image if it is NOT the default placeholder
                if (response.data.avatar && !response.data.avatar.includes('placehold.co')) {
                    setAvatar(response.data.avatar);
                }
            } catch (error) {
                // Keep default (null) which shows initials
            }
        };
        fetchAvatar();
    }, []);

    // Get the first letter of username (e.g., "Asad" -> "A")
    const initial = user?.username ? user.username.charAt(0).toUpperCase() : '?';

    return (
        // CHANGE 1: Update background, border, and shadows
        <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="mr-4 text-gray-600 dark:text-gray-300 focus:outline-none md:hidden">
                    <FaBars className="text-2xl" />
                </button>
                {/* CHANGE 2: Update text color */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
                {/* CHANGE 3: Update text color */}
                <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
          <strong className='text-xl'><i>{user ? user.username : 'Guest'}</i></strong>
          </span>
                <div className="relative">
            {avatar ? (
                // 1. SHOW IMAGE (If uploaded)
                <img 
                    src={avatar} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600 shadow-sm" 
                />
            ) : (
                // 2. SHOW INITIAL (If no image)
                <div className="w-10 h-10 rounded-full bg-[#512da8] text-white flex items-center justify-center font-bold shadow-sm">
                    {initial}
                </div>
            )}
        </div>
            </div>
        </header>
    );
};

export default Header;