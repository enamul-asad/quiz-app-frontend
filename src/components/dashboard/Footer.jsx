import React from 'react';
import { FaHeart, FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent dark:bg-gray-900  border-gray-200 dark:border-gray-800 py-3 mt-5 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copyright */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {currentYear} QuizApp. All rights reserved.
        </div>

        {/* Center: Developed By */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <FaCode className="text-[#512da8]" />
          <span>Developed by</span>
          <a 
            href="https://enamulportfolio.netlify.app/" // Add your portfolio link here if you have one
            className="text-[#512da8] font-bold hover:underline decoration-2 underline-offset-4"
          >
            Enamulhaq
          </a>
        </div>

        {/* Right Side: Social Icons (Optional) */}
        <div className="flex gap-4">
          <a href="https://github.com/enamul-asad" target = '_blank' className="text-gray-400 hover:text-[#512da8] transition-colors text-xl">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/enamul-haq-asf" target='_blank' className="text-gray-400 hover:text-[#512da8] transition-colors text-xl">
            <FaLinkedin />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;