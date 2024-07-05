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
            <div className='w-72 h-16 border border-[#ededed] bg-[#ededed] rounded-full'>

                <div className='w-full flex justify-between items-center'>
                    <ul className='py-2 px-3 w-full flex items-center justify-between space-x-3 rounded-full'>

                        <li className={`  my-4 ${activeLink == '/index/category' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-3 flex justify-center items-center'
                                onClick={() => handleColorChange('/index/category')}
                            >
                                Category
                            </button>

                        </li>
                        <li className={`my-4 ${activeLink == '/index/livecategory' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-3 flex justify-center items-center'
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