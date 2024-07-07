import React, { useState } from 'react'
import LiveWallpaper from './LiveWallpaper';
import WallPaper from './WallPaper';


function ParentWall() {

    const [activeLink, setActiveLink] = useState('/index/wallpapers');

    const handleColorChange = (link) => {
        setActiveLink(link);
    }
    return (
        <div className='p-8'>
            <div className='w-full h-14'>

                <div className='w-72 bg-[#e7e7e7] flex justify-between items-center border border-[#ededed]  rounded-full'>
                    <ul className='p-[5px] w-full flex items-center justify-between space-x-3 rounded-full'>

                        <li className={` w-2/5 my-4  ${activeLink == '/index/wallpapers' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-3 flex justify-center items-center'
                                onClick={() => handleColorChange('/index/wallpapers')}
                            >
                                Wallpaper
                            </button>

                        </li>
                        <li className={`my-4w-3/5 ${activeLink == '/index/livewallpapers' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-4 flex justify-center items-center'
                                onClick={() => handleColorChange('/index/livewallpapers')}
                            >
                                Live Wallpaper
                            </button>
                        </li>
                    </ul>

                </div>
            </div>

            <div>
                {activeLink === '/index/wallpapers' && <WallPaper/> }
                {activeLink === '/index/livewallpapers' && <LiveWallpaper />}
            </div>


        </div>
    )
}

export default ParentWall;