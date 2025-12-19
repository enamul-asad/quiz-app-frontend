import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors focus:outline-none ${
        theme === 'dark' ? 'bg-[#512da8]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`flex items-center justify-center w-6 h-6 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
        }`}
      >
        {theme === 'dark' ? (
          <FaMoon className="text-[#512da8] text-xs" />
        ) : (
          <FaSun className="text-orange-400 text-xs" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;