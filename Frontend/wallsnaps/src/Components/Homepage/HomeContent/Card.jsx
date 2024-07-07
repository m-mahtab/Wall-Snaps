import React from 'react';
import { BiCategory } from "react-icons/bi";

function Card({ title, icon }) {
  return (
    <div className=''>

      <div className='flex flex-wrap justify-between  p-5 bg-white h-64 w-64 rounded-3xl  border-2 border-[#d9d9d9]'>
        <div className='h-[70px] w-full  '>
          <div className='icon-shadow w-[60px] h-[60px] flex items-center justify-center rounded-full bg-cus-black  '>
            <span className='text-white text-3xl '>{icon}</span>

          </div>
        </div>
        <ul className='flex flex-col justify-between h-[120px] w-full'>
          <li className='text-2xl  py-[10px]'>6</li>
          <li className='text-2xl mb-2'>{title}</li>
          <li>
            <button className='bg-cus-black py-[6px] text-white w-full h-8 mt-2 rounded-full font-semibold'>View More</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
