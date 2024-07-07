import React, { useState } from 'react'
import LiveCategory from './LiveCategory';
import Category from './Category';


function ParentCategory() {

    const [activeLink, setActiveLink] = useState('/index/category');

    const handleColorChange = (link) => {
        setActiveLink(link);
    }
    return (
        <div className='p-8'>
            <div className='w-full h-14 '>

                <div className='w-72 bg-[#e7e7e7] flex justify-between items-center border border-[#ededed]  rounded-full'>
                    <ul className='p-[5px] w-full flex items-center justify-between space-x-3 rounded-full'>

                        <li className={` w-2/5 my-4 ${activeLink == '/index/category' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-6 flex justify-center items-center'
                                onClick={() => handleColorChange('/index/category')}
                            >
                                Category
                            </button>

                        </li>
                        <li className={`my-4 w-3/5 ${activeLink == '/index/livecategory' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-6 flex justify-center items-center'
                                onClick={() => handleColorChange('/index/livecategory')}
                            >
                                Live Category
                            </button>
                        </li>
                    </ul>

                </div>
            </div>

            <div>
                {activeLink === '/index/category' && <Category />}
                {activeLink === '/index/livecategory' && <LiveCategory />}
            </div>


        </div>
    )
}

export default ParentCategory;