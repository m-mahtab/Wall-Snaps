import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { LuPlayCircle } from "react-icons/lu";
import LiveWallModel from "./LiveWallModel";
import EditLiveWall from "./EditLiveWall";
import VideoModal from "./VideoModal";

function LiveWallpaper() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/livewallpapers")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filteredData with all data
      })
      .catch((error) => console.log(error));
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handlePreviewClick = (videoUrl) => {
    setCurrentVideoUrl(`http://localhost:5000/${videoUrl}`);
    setIsVideoModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5000/livewallpapers/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        setFilteredData(filteredData.filter((item) => item.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleWallpaperAdded = (newWallpaper) => {
    setData([...data, newWallpaper]);
    setFilteredData([...filteredData, newWallpaper]);
    setIsModalOpen(false);
  };

  const handleWallpaperEdit = (updatedData) => {
    const updatedList = data.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    setData(updatedList);
    setFilteredData(updatedList);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredItems = data.filter(
      (item) =>
        item.category.toLowerCase().includes(searchTerm) ||
        item.tags.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredItems);
    setCurrentPage(0); // Reset to first page when searching
  };

  const toggleFeatured = (id, currentFeatured) => {
    const newFeatured = !currentFeatured;

    fetch(`http://localhost:5000/livewallpapers/${id}/featured`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ featured: newFeatured }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then(() => {
        const updatedItems = data.map((item) =>
          item.id === id ? { ...item, featured: newFeatured } : item
        );
        setData(updatedItems);
        setFilteredData(updatedItems); // Update filteredData after toggle
      })
      .catch((error) => console.log(error));
  };

  const totalcount = filteredData.length;

  return (
    <div className="h-auto py-8">
      <div className=" h-auto py-4 bg-white rounded-2xl shadow-xl">
        <div className="h-auto py-5 relative">
          <div className="flex justify-between px-8">
            <h2 className="font-bold text-xl cat-bar">Live WallPaper</h2>
            <button
              onClick={openModal}
              className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-2xl"
            >
              Add Live Wallpaper
            </button>
          </div>
        </div>
        <div className="h-auto py-4 bg-white flex justify-between px-5 border-t-2 border-t-slate-200">
          <div className="flex items-center justify-center space-x-3 w-1/3 ">
            <p className="text-lg">Show</p>
            <span className="flex items-center justify-center border border-slate-200 rounded-full p-3 w-16">
              {totalcount}
            </span>
            <p className="text-lg">entries </p>
          </div>
          <div className="flex items-center justify-between px-3 w-fit">
            <p>Search:</p>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 p-3 border border-slate-200 rounded-full"
              required
            />
          </div>
        </div>
        {editItem && (
          <EditLiveWall
            editItem={editItem}
            onLiveWallpaperEdit={handleWallpaperEdit}
            setEditItem={setEditItem}
            currentImage={`http://localhost:5000/${editItem.thumbnail}`}
            currentVideo={`http://localhost:5000/${editItem.video}`}
          />
        )}

        <table className="w-full">
          <thead className="bg-person py-5  h-auto">
            <tr className="">
              <th className="w-1/6 py-2">Thumbnail</th>
              <th className="w-1/6 py-2">Live Wallpapers</th>
              <th className="w-1/6 py-2">Category</th>
              <th className="w-1/6 py-2">Tags</th>
              <th className="w-1/6 py-2">Type</th>
              <th className="w-1/6 py-2">Featured</th>
              <th className="w-1/6 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr
                key={index}
                className="text-center border-b-2  border-gray-300 py-5"
              >
                <td className=" px-7 flex items-center justify-center py-5">
                  <div className=" h-36 flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/${item.thumbnail}`}
                      alt={item.title}
                      className="h-full rounded-lg w-max"
                    />
                  </div>
                </td>
                <td className="preview preview-info ">
                  <div className=" flex items-center justify-center">
                    <button
                      onClick={() => handlePreviewClick(item.video)}
                      className=" font-bold px-4 h-9  text-white text-md flex items-center justify-center bg-cus-black rounded-full"
                    >
                      <LuPlayCircle className="text-xl mr-2" />
                      Preview
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.tags}</td>
                <td className="type">
                  <span className="badge badge-info border-radius-5">
                    {item.type}{" "}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.featured}
                      onChange={() => toggleFeatured(item.id, item.featured)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-200 dark:peer-focus:ring-slate-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"></div>
                  </label>
                </td>
                <td className=" pr-8 text-white">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="h-8 w-16 bg-[#54ca68] font-semibold shadow-xl rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="h-8 w-16 bg-[#fc544b] font-semibold shadow-xl rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          activeLinkClassName={"active"}
        />
        <LiveWallModel
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onWallpaperAdded={handleWallpaperAdded}
        />
        <VideoModal
          isOpen={isVideoModalOpen}
          onRequestClose={() => setIsVideoModalOpen(false)}
          videoUrl={currentVideoUrl}
        />
      </div>
    </div>
  );
}

export default LiveWallpaper;
