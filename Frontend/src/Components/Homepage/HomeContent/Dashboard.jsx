import React from 'react';
import Card from './Card';
import { BiCategory } from "react-icons/bi";
import { BiImages } from "react-icons/bi";


function Dashboard() {
  const cardData = [
    { title: 'Category', icon: <BiCategory />, url: 'index/category' },
    { title: 'Live Category', icon: <BiCategory />, url: 'index/livecategory' },
    { title: 'Wallpaper', icon: <BiImages />, url: 'index/wallpapers' },
    { title: 'Live Wallpaper', icon: <BiImages />, url: 'index/livewallpapers' }
  ];

  return (
    <div>

      <div className='px-6 pt-7 flex flex-wrap justify-between'>
        {cardData.map((item, index) => (
          <div key={item.id}>
            <a href={item.url}>

              <Card key={index} title={item.title} icon={item.icon} />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
