import React, { useState } from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import SignInForm from '../components/auth/SignInForm';
import TogglePanel from '../components/auth/TogglePanel';

const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-200 to-blue-200 p-4">
      <div className={`
          relative bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] 
          overflow-hidden 
          w-full max-w-3xl 
          min-h-150 /* Fixed height helps the  positioning work */
          md:min-h-120
      `}>
        <SignUpForm isActive={isActive} setIsActive={setIsActive} />
        <SignInForm isActive={isActive} setIsActive={setIsActive} />
        <TogglePanel isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
};

export default Auth;