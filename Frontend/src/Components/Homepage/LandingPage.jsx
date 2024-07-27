import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Sidebar from "./Sidebar";
import HomeContent from "./HomeContent";
import axios from "axios";

function LandingPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpenSidebarToggle(false);
      } else {
        setOpenSidebarToggle(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setOpenSidebarToggle(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const verifyUserSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users", { withCredentials: true });
        if (isMounted) {
          if (res.data.valid) {
            setName(res.data.username);
            localStorage.setItem('username', res.data.username);
            console.log('Logged in as:', res.data.username);
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    verifyUserSession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

 

  return (
    <div className="flex-container">
      {openSidebarToggle && (
        <div className="sidebar">
          <Sidebar openSidebarToggle={openSidebarToggle} closeSidebar={closeSidebar} />
        </div>
      )}
     
      <div className="content">
        <div className="header">
          <HeaderComponent
            toggleSidebar={toggleSidebar}
           
          />
        </div>
        <div className="home-content">
          <HomeContent/>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
