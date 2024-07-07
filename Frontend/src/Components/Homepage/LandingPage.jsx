import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent';
import Sidebar from './Sidebar';
import MinSidebar from './MinSidebar';
import HomeContent from './HomeContent';

function LandingPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [openMinSidebarToggle, setOpenMinSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const toggleMinSidebar = () => {
    setOpenMinSidebarToggle(!openMinSidebarToggle);
  };

  return (
    <div className='flex-container'>
      {openSidebarToggle && (
        <div className='sidebar'>
          <Sidebar openSidebarToggle={openSidebarToggle} />
        </div>
      )}
      {openMinSidebarToggle && (
        <div className='min-sidebar'>
          <MinSidebar openMinSidebarToggle={openMinSidebarToggle} />
        </div>
      )}
      <div className='content w-full'>
        <div className='header'>
          <HeaderComponent toggleSidebar={toggleSidebar} toggleMinSidebar={toggleMinSidebar} />
        </div>
        <div className='home-content'>
          <HomeContent />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
