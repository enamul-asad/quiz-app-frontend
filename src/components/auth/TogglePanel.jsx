import React from 'react';

const TogglePanel = ({ isActive, setIsActive }) => {
  return (
    <div className={`
        hidden md:block /* COMPLETELY HIDDEN ON MOBILE */
        absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-100
        ${isActive ? '-translate-x-full rounded-l-[30px] rounded-r-[100px]' : 'rounded-r-[30px] rounded-l-[100px]'}
    `}>
      <div className={`
        bg-linear-to-r from-[#5c6bc0] to-[#512da8] text-white relative -left-full h-full w-[200%] transform transition-all duration-600 ease-in-out
        ${isActive ? 'translate-x-1/2' : 'translate-x-0'}
      `}>
        
        {/* Left Panel (Shows when Sign In is active) */}
        <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-8 text-center transition-all duration-600 ease-in-out ${isActive ? 'translate-x-0' : '-translate-x-[20%]'}`}>
          <h1 className="font-bold text-3xl mb-4">Welcome Back!</h1>
          <p className="text-sm leading-5 tracking-wide mt-5">If you have an Account</p>
          <p className="text-sm leading-5 tracking-wide mb-5">Enter your personal details to use all of site features</p>
          <button onClick={() => setIsActive(false)} className="bg-transparent border border-white text-white text-xs py-2 px-8 rounded-lg font-semibold uppercase tracking-wide cursor-pointer hover:bg-white hover:text-[#512da8] transition-colors">Sign In</button>
        </div>

        {/* Right Panel (Shows when Sign Up is active) */}
        <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-8 text-center transition-all duration-600 ease-in-out ${isActive ? 'translate-x-[20%]' : 'translate-x-0'}`}>
          <h1 className="font-bold text-3xl mb-4">Hello, Friend!</h1>
          <p className="text-sm leading-5 tracking-wide mt-5">If you don't have an Account</p>
          <p className="text-sm leading-5 tracking-wide mb-5">Register with your personal details to use all of site features</p>
          <button onClick={() => setIsActive(true)} className="bg-transparent border border-white text-white text-xs py-2 px-8 rounded-lg font-semibold uppercase tracking-wide cursor-pointer hover:bg-white hover:text-[#512da8] transition-colors">Sign Up</button>
        </div>

      </div>
    </div>
  );
};

export default TogglePanel;