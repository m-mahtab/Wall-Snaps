import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import LiveCategory from "./LiveCategory";
import Category from "./Category";

function ParentCategory() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(() => {
    return location.pathname.includes('livecategory') ? 'livecategory' : 'category';
  });

  useEffect(() => {
    setActiveLink(location.pathname.includes('livecategory') ? 'livecategory' : 'category');
  }, [location]);

  return (
    <div className="p-2 md:p-4 lg:p-6 xl:p-8">
      <div className="w-full h-8 md:h-10 lg:h-12 xl:h-14 ">
      <div className="w-40  md:w-72 bg-[#e7e7e7] flex justify-between items-center border border-[#ededed] rounded-full">
  <ul className="text-sm sm:text-base p-1 xl:p-[5px] w-full flex items-center justify-between space-x-1 sm:space-x-2 xl:space-x-3 rounded-full">
    <li
      className={`w-2/5 ${
        activeLink === "category"
          ? "bg-cus-black text-white rounded-full h-full"
          : ""
      }`}
    >
      <Link to="/category">
        <button
          className="px-3 sm:px-4 md:px-6 py-2 xl:py-3 flex justify-center items-center w-full"
        >
          Category
        </button>
      </Link>
    </li>
    <li
      className={`w-3/5 ${
        activeLink === "livecategory"
          ? "bg-cus-black text-white rounded-full h-full"
          : ""
      }`}
    >
      <Link to="/livecategory">
        <button
          className="px-3 sm:px-4 md:px-6 py-2 xl:py-3 flex justify-center items-center w-full"
        >
          Live Category
        </button>
      </Link>
    </li>
  </ul>
</div>
      </div>

      {activeLink === "category" && <Category />}
      {activeLink === "livecategory" && <LiveCategory />}
    </div>
  );
}

export default ParentCategory;