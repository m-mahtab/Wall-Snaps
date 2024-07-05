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
            <div className='w-72 h-16 border border-[#ededed] bg-[#ededed] rounded-full'>

                <div className='w-full flex justify-between items-center'>
                    <ul className='py-2 px-3 w-full flex items-center justify-between space-x-3 rounded-full'>

                        <li className={`my-4 ${activeLink == '/index/wallpapers' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-3 flex justify-center items-center'
                                onClick={() => handleColorChange('/index/wallpapers')}
                            >
                                Wallpaper
                            </button>

                        </li>
                        <li className={`my-4 ${activeLink == '/index/livewallpapers' ? 'bg-cus-black text-white rounded-full h-full ' : ''}`}>
                            <button
                                className='px-3 flex justify-center items-center'
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