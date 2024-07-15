import React from "react";
import Dashboard from "./HomeContent/Dashboard";
import Settings from "./HomeContent/Settings";
import ParentCategory from "./HomeContent/Category/ParentCategory";
import LiveCategory from "./HomeContent/Category/LiveCategory";
import LiveWallpaper from "./HomeContent/Wallpaper/LiveWallpaper";
import PrivacyPolicy from "./HomeContent/PrivacyPolicy";
import PolicyPreview from "./HomeContent/PolicyPreview";
import TermsnConditions from "./HomeContent/TermsnConditions";
import ParentWall from "./HomeContent/Wallpaper/ParentWall";
import { Route, Routes } from "react-router-dom";

function HomeContent() {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="settings" element={<Settings />} />
      <Route path="category" element={<ParentCategory />} />
      <Route path="livecategory" element={<LiveCategory />} />
      <Route path="wallpapers" element={<ParentWall />} />
      <Route path="livewallpapers" element={<LiveWallpaper />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="preview" element={<PolicyPreview />} />
      <Route path="terms" element={<TermsnConditions />} />
    </Routes>
  );
}

export default HomeContent;
