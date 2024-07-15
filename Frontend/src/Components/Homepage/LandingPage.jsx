import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import Sidebar from "./Sidebar";
import MinSidebar from "./MinSidebar";
import HomeContent from "./HomeContent";
import axios from "axios";

function LandingPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [openMinSidebarToggle, setOpenMinSidebarToggle] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyUserSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users", { withCredentials: true });
        if (isMounted) {
          if (res.data.valid) {
            setName(res.data.username);
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

  const toggleMinSidebar = () => {
    setOpenMinSidebarToggle(!openMinSidebarToggle);
  };

  return (
    <div className="flex-container">
      {openSidebarToggle && (
        <div className="sidebar">
          <Sidebar openSidebarToggle={openSidebarToggle} />
        </div>
      )}
      {openMinSidebarToggle && (
        <div className="min-sidebar">
          <MinSidebar openMinSidebarToggle={openMinSidebarToggle} />
        </div>
      )}
      <div className="content">
        <div className="header">
          <HeaderComponent
            toggleSidebar={toggleSidebar}
            toggleMinSidebar={toggleMinSidebar}
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
