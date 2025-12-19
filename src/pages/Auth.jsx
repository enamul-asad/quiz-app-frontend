import React, { useState } from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';
import TogglePanel from '../components/auth/TogglePanel';

// Helper CSS for the social icons to avoid repetition
// You can also put this in your global index.css
const iconStyle = "border border-gray-300 rounded-2xl w-10 h-10 flex items-center justify-center text-gray-800 text-sm hover:bg-gray-100 transition-colors";

const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-200 to-blue-200 p-4">
      {/* Main Container */}
      <div className="relative bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-3xl max-w-full min-h-120">
        
        <SignUpForm isActive={isActive} />
        
        <SignInForm isActive={isActive} />
        
        <TogglePanel isActive={isActive} setIsActive={setIsActive} />
        
      </div>

    </div>
  );
};

export default Auth;