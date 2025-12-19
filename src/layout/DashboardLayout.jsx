import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Footer from '../components/dashboard/Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-montserrat">

      {/* Sidebar stays fixed here */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header toggleSidebar={toggleSidebar} />

        {/* 1. Added 'flex flex-col' and removed 'p-6' from here */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 flex flex-col">
          
          {/* 2. Create a Content Wrapper with 'flex-1' and 'p-6' */}
          {/* flex-1 makes this div grow to fill all available space, pushing Footer down */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>

          {/* 3. Footer sits outside the padding, at the very bottom */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;