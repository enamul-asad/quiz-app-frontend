import React from 'react';

const TogglePanel = ({ isActive, setIsActive }) => {
  return (
    <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-1000 ${isActive ? '-translate-x-full rounded-[0_150px_100px_0]' : 'rounded-[150px_0_0_100px]'}`}>
      <div className={`bg-[#512da8] text-white relative -left-full h-full w-[200%] transition-transform duration-600 ease-in-out ${isActive ? 'translate-x-1/2' : 'translate-x-0'}`}>
        
        {/* Left TogglePanel Panel (Shows when Sign Up is active) */}
        <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transform transition-transform duration-600 ease-in-out ${isActive ? 'translate-x-0' : '-translate-x-[200%]'}`}>
          <h1 className="font-bold text-4xl mb-4">Welcome Back!</h1>
          <p className="text-sm mt-1 leading-5 tracking-wide mb-8">Enter your personal details to use all of site features</p>
          <button 
            onClick={() => setIsActive(false)}
            className="bg-transparent border border-white text-white text-xs py-3 px-10 rounded-lg font-semibold uppercase tracking-wide cursor-pointer hover:bg-white/20 transition-colors"
          >
            Sign In
          </button>
        </div>

        {/* Right TogglePanel Panel (Shows when Sign In is active) */}
        <div className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transform transition-transform duration-600 ease-in-out ${isActive ? 'translate-x-[200%]' : 'translate-x-0'}`}>
          <h1 className="font-bold text-4xl mb-4">Hello, Friend!</h1>
          <p className="text-sm leading-5 mt-1 tracking-wide mb-8">Register with your personal details to use all of site features</p>
          <button 
            onClick={() => setIsActive(true)}
            className="bg-transparent border border-white text-white text-xs py-3 px-10 rounded-lg font-semibold uppercase tracking-wide cursor-pointer hover:bg-white/20 transition-colors"
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
};

export default TogglePanel;