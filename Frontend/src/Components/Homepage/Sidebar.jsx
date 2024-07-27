import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCategory, BiImages, BiHomeAlt } from "react-icons/bi";
import { FiSettings, FiBell, FiClipboard } from "react-icons/fi";
import { MdOutlinePolicy } from "react-icons/md";

function Sidebar({ openSidebarToggle, closeSidebar }) {
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();

  const handleColorChange = (link) => {
    setActiveLink(link);
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
    navigate(link);
  };

  return (
    <div>
      <aside
        className={`h-full lg:block sidebar border-r-[#f2f2f2] border-r-2 ${
          openSidebarToggle ? "" : "hidden"
        }`}
      >
        <Link to="/index">
          <div className="hidden md:flex h-[70px]  items-center justify-center bg-wallsnaps border-b-[#f2f2f2] border-b-2">
            <div className="font-semibold text-2xl flex items-center justify-center ">
              WallSnaps.
            </div>
          </div>
        </Link>
        <div className="h-auto ">
          <div className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7">
            <ul>
              <li
                className={`icons my-4 ${
                  activeLink === "dashboard"
                    ? "bg-cus-black text-white rounded-full w-full h-full "
                    : ""
                }`}
              >
                <div className={``}>
                  <Link
                    to="/"
                    className="flex items-center justify-center  "
                    onClick={() => handleColorChange("dashboard")}
                  >
                    <BiHomeAlt className="icon-set" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              </li>
              <li
                className={`icons my-4 ${
                  activeLink === "category"
                    ? "bg-cus-black text-white rounded-full"
                    : ""
                }`}
              >
                <Link
                  to="category"
                  className="flex items-center justify-center"
                  onClick={() => handleColorChange("category")}
                >
                  <BiCategory className="icon-set" />
                  <span>Category</span>
                </Link>
              </li>
              <li
                className={`icons my-4 ${
                  activeLink === "wallpapers"
                    ? "bg-cus-black text-white rounded-full"
                    : ""
                }`}
              >
                <Link
                  to="wallpapers"
                  className="flex items-center justify-center "
                  onClick={() => handleColorChange("wallpapers")}
                >
                  <BiImages className="icon-set" />
                  <span>Wallpapers</span>
                </Link>
              </li>
              <li
                className={`icons my-4 ${
                  activeLink === "notifications"
                    ? "bg-cus-black text-white rounded-full"
                    : ""
                }`}
              >
                <Link
                  to="notifications"
                  className="flex items-center justify-center"
                  onClick={() => handleColorChange("notifications")}
                >
                  <FiBell className="icon-set" />
                  <span>Notifications</span>
                </Link>
              </li>
              <li
                className={`icons my-4 ${
                  activeLink === "settings"
                    ? "bg-cus-black text-white rounded-full"
                    : ""
                }`}
              >
                <Link
                  to="settings"
                  className="flex items-center justify-center"
                  onClick={() => handleColorChange("settings")}
                >
                  <FiSettings className="icon-set" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-b-[#f2f2f2] border-t-2 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7">
            <ul>
              <li
                className={`icons my-4 ${
                  activeLink === "privacy"
                    ? "bg-cus-black text-white rounded-full"
                    : ""
                }`}
              >
                <Link
                  to="privacy"
                  className="flex items-center justify-center"
                  onClick={() => handleColorChange("privacy")}
                >
                  <MdOutlinePolicy className="icon-set" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li
                className={`icons my-4 ${
                  activeLink === "terms"
                    ? "bg-cus-black text-white rounded-full"
                    : ""
                }`}
              >
                <Link
                  to="terms"
                  className="flex items-center justify-center"
                  onClick={() => handleColorChange("terms")}
                >
                  <FiClipboard className="icon-set" />
                  <span>Terms of Use</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
