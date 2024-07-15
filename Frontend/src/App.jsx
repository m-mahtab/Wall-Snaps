import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Components/Homepage/LandingPage";
import Dashboard from "./Components/Homepage/HomeContent/Dashboard";
import Settings from "./Components/Homepage/HomeContent/Settings";
import ParentCategory from "./Components/Homepage/HomeContent/Category/ParentCategory";
import LiveWallpaper from "./Components/Homepage/HomeContent/Wallpaper/LiveWallpaper";
import ParentWall from "./Components/Homepage/HomeContent/Wallpaper/ParentWall";
import PrivacyPolicy from "./Components/Homepage/HomeContent/PrivacyPolicy";
import Login from "./Components/Login";
import LiveCategory from "./Components/Homepage/HomeContent/Category/LiveCategory";
import DummyLogin from "./Components/DymmyLogin";
import { AuthContext } from "./AuthContext";

import "./App.css";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
    
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="app-h">
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/*" element={<LandingPage />}/>
          </>
        ) : (
          <Route path="/" element={<DummyLogin />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
