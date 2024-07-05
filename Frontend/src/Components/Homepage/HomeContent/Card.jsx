import React from 'react';
import { BiCategory } from "react-icons/bi";

function Card({ title, icon }) {
  return (
    <div className='w-full'>

      <div className='flex flex-wrap justify-between  p-5 bg-white h-64 w-60 rounded-3xl  border-2 border-slate-200'>
        <ul className='flex flex-col justify-between h-full w-full'>
          <li>
            <div className='h-16 w-16 rounded-full shadow-[#90899de6] shadow-lg bg-cus-black flex items-center justify-center'>
              <span className='text-white text-2xl '>{icon}</span>
            </div>
          </li>
          <li className='text-2xl mt-9 pt-2'>6</li>
          <li className='text-2xl '>{title}</li>
          <li>
            <button className='bg-cus-black text-white w-full h-8 mt-2 rounded-full font-semibold'>View More</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
