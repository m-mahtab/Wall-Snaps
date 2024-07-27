import React from "react";
import { Link } from 'react-router-dom';

function Card({ title, icon, totalcount, url }) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between  p-5 bg-white h-64  xl:w-64 rounded-3xl  border-2 border-[#d9d9d9]">
        <div className="h-[70px] w-full  ">
          <div className="icon-shadow w-[60px] h-[60px] flex items-center justify-center rounded-full bg-cus-black  ">
            <span className="text-white text-3xl ">{icon}</span>
          </div>
        </div>
        <ul className="flex flex-col justify-between h-[120px] w-full">
          <li className="text-2xl  py-[10px]">{totalcount}</li>
          <li className="text-2xl mb-2">{title}</li>
          <li>
            <Link to={url}>
              <button className="bg-cus-black py-[6px] text-white w-full h-8 mt-2 rounded-full font-semibold">
                View More
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
