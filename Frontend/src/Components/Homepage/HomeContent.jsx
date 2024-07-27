import React from "react";
import Dashboard from "./HomeContent/Dashboard";
import Settings from "./HomeContent/Settings";
import ParentCategory from "./HomeContent/Category/ParentCategory";
import ParentWall from "./HomeContent/Wallpaper/ParentWall";
import Notifications from "./HomeContent/Notifications";
import PrivacyPolicy from "./HomeContent/PrivacyPolicy";
import TermsnConditions from "./HomeContent/TermsnConditions";
import { Route, Routes, Navigate } from "react-router-dom";

function HomeContent() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="category" element={<ParentCategory />} />
      <Route path="livecategory" element={<ParentCategory />} />
      <Route path="wallpapers" element={<ParentWall />} />    
      <Route path="livewallpapers" element={<ParentWall />} />
      <Route path="notifications" element = {<Notifications/>}/>
      <Route path="settings" element={<Settings />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="terms" element={<TermsnConditions />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default HomeContent;