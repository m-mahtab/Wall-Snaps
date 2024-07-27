import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LiveWallpaper from "./LiveWallpaper";
import WallPaper from "./WallPaper";

function ParentWall() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(() => {
    return location.pathname.includes('livewallpapers') ? 'livewallpapers' : 'wallpapers';
  });

  useEffect(() => {
    setActiveLink(location.pathname.includes('livewallpapers') ? 'livewallpapers' : 'wallpapers');
  }, [location]);

  return (
    <div className="p-2 md:p-4 lg:p-6 xl:p-8">
      <div className="w-full h-8 md:h-10 lg:h-12 xl:h-14 ">
        <div className="w-40  md:w-72 bg-[#e7e7e7] flex justify-between items-center border border-[#ededed] rounded-full">
          <ul className="text-sm md:text-base p-1 xl:p-[5px] w-full flex items-center justify-between space-x-1 md:space-x-2 xl:space-x-3 rounded-full">
            <li
              className={`w-2/5 ${
                activeLink === "wallpapers"
                  ? "bg-cus-black text-white rounded-full h-full"
                  : ""
              }`}
            >
              <Link to="/wallpapers">
                <button
                  className="px-3 py-2 xl:py-3 flex justify-center items-center w-full"
                >
                  Wallpaper
                </button>
              </Link>
            </li>
            <li
              className={`w-3/5 ${
                activeLink === "livewallpapers"
                  ? "bg-cus-black text-white rounded-full h-full"
                  : ""
              }`}
            >
              <Link to="/livewallpapers">
                <button
                  className="py-2 xl:py-3 px-4 flex justify-center items-center w-full"
                >
                  Live Wallpaper
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        {activeLink === "wallpapers" && <WallPaper />}
        {activeLink === "livewallpapers" && <LiveWallpaper />}
      </div>
    </div>
  );
}

export default ParentWall;