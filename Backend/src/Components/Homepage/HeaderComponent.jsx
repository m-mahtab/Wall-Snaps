import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function HeaderComponent({ toggleSidebar, toggleMinSidebar }) {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const navigate = useNavigate();

  const toggleLogout = () => {
    setLogoutVisible(!logoutVisible);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className='w-full py-2 flex items-center justify-between border-b-[#f2f2f2] border-b-2'>
      <div className='px-3 py-2 cursor-pointer'>
        <FiMenu className='text-xl opacity-70' onClick={toggleSidebar} />
      </div>
      <div className='flex items-center justify-center px-2'>
        <div className='h-12 w-12 bg-[#ededed] rounded-full flex items-center justify-center'>
          <GoPerson onClick={toggleLogout} className='cursor-pointer text-xl' />
          {logoutVisible && (
            <div onClick={logout} className='w-48 h-auto cursor-pointer text-red-600 absolute z-10 py-3 top-16  right-5 flex items-center justify-center space-x-1 bg-white shadow-md rounded-md'>
              <FaArrowRight className='' />
              <span className='font-semibold'>Log Out</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
