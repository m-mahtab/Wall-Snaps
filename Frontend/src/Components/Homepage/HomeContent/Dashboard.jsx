import React, { useEffect, useState } from "react";
import Card from "./Card";
import { BiCategory } from "react-icons/bi";
import { BiImages } from "react-icons/bi";

function Dashboard() {
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalLiveCat, setTotalliveCat] = useState(0);
  const [totalWallpapers, setTotalWallpapers] = useState(0);
  const [totalLivewal, setTotalLivewal] = useState(0);

  const cardData = [
    {
      title: "Category",
      icon: <BiCategory />,
      url: "category",
      count: totalCategories,
    },
    {
      title: "Live Category",
      icon: <BiCategory />,
      url: "livecategory",
      count: totalLiveCat,
    },
    {
      title: "Wallpaper",
      icon: <BiImages />,
      url: "wallpapers",
      count: totalWallpapers,
    },
    {
      title: "Live Wallpaper",
      icon: <BiImages />,
      url: "livewallpapers",
      count: totalLivewal,
    },
  ];

  useEffect(() => {
    // Fetch the total count of categories
    fetch("http://localhost:5000/new_cat")
      .then((response) => response.json())
      .then((data) => setTotalCategories(data.length))
      .catch((error) => console.log(error));

    // Fetch the total count of wallpapers
    fetch("http://localhost:5000/livecategories")
      .then((response) => response.json())
      .then((data) => setTotalliveCat(data.length))
      .catch((error) => console.log(error));

    // Fetch the total count of wallpaper
    fetch("http://localhost:5000/wallpaper_gallery")
      .then((response) => response.json())
      .then((data) => setTotalWallpapers(data.length))
      .catch((error) => console.log(error));

    // Fetch the total count of live wallpaper
    fetch("http://localhost:5000/livewallpapers")
      .then((response) => response.json())
      .then((data) => setTotalLivewal(data.length))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="px-8 pt-7 ">
        <div className="container item">
          {cardData.map((item, index) => (
            <div key={index}>
              <Card
                key={index}
                title={item.title}
                icon={item.icon}
                totalcount={item.count}
                url={item.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
