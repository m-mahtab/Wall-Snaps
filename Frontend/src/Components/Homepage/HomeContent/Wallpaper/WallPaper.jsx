import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import WallModel from "./WallModel";
import EditWal from "./EditWal";

function WallPaper() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("http://localhost:5000/wallpaper_gallery")
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

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5000/wallpaper_gallery/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setFilteredData(updatedData); // Update filteredData after deletion
      })
      .catch((error) => console.log(error));
  };

  const handleWallpaperAdded = (newWallpaper) => {
    setData([...data, newWallpaper]);
    setFilteredData([...filteredData, newWallpaper]);
    setIsModalOpen(false);
  };

 
  const handleWallpaperEdit = (updatedData) => {
    const updatedItems = data.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );
    setData(updatedItems);
    setFilteredData(updatedItems); // Update filteredData after edit
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
    const filteredItems = data.filter((item) => {
      const categoryMatch = item.category.toLowerCase().includes(searchTerm);
      const tagsMatch = item.tags.toLowerCase().includes(searchTerm);

      // Return true if either category or tags match the searchTerm
      return categoryMatch || tagsMatch;
    });

    setFilteredData(filteredItems);
    setCurrentPage(0); // Reset to first page when searching
  };

  const toggleFeatured = (id, currentFeatured) => {
    const newFeatured = !currentFeatured;

    fetch(`http://localhost:5000/wallpaper_gallery/${id}/featured`, {
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
    <div className="h-auto my-2 md:my-0 py-4   lg:py-6 xl:py-8">
      <div className="h-auto bg-white rounded-2xl shadow-xl">
        <div className="relative py-3 lg:py-4 xl:py-5">
          <div className="flex justify-between item-center px-3 md:px-4 lg:px-6 xl:px-8">
            <h2 className="font-bold text-lg xl:text-xl cat-bar">Wallpaper</h2>
            <button
              onClick={openModal}
              className="text-xs md:text-base bg-cus-black text-white px-3 md:px-7 xl:px-9  py-2  xl:py-3 rounded-full font-semibold cat-button-shadow"
            >
              Add Wallpaper
            </button>
          </div>
        </div>
        <div className="text-sm md:text-base xl:text-lg  h-auto py-2 xl:py-4 bg-white flex flex-col lg:flex-row  justify-center lg:justify-between px-2 lg:px-5 border-t-2 border-t-[#f2f2f2]">
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 lg:space-x-3 w-fit">
            <p className="">Show</p>
            <span className="flex items-center justify-center border border-[#f2f2f2] rounded-full p-1 md:p-2 lg:p-3 w-10 md:w-14 lg:w-16">
              {totalcount}
            </span>
            <p className="">entries </p>
          </div>
          <div className="flex items-center justify-between lg:px-3 w-fit">
            <p>Search:</p>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1  p-1 md:p-2 lg:p-3 border border-slate-200 rounded-full"
              required
            />
          </div>
        </div>
        {editItem && (
          <EditWal
            editItem={editItem}
            onWallpaperEdit={handleWallpaperEdit}
            setEditItem={setEditItem}
            currentImage={`http://localhost:5000/${editItem.image}`}
          />
        )}

        <table className="min-w-full text-xs sm:text-sm md:text-base">
          <thead className="bg-[#f2f2f2] py-5 h-auto">
            <tr className="">
              <th className="w-1/6 py-2">Image</th>
              <th className="w-1/6 py-2">Category</th>
              <th className="w-1/6 py-2">Tags</th>
              <th className="w-1/6 py-2">Featured</th>
              <th className="w-1/6 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item) => (
              <tr
                key={item.id}
                className="text-center border-b-2 border-[#f2f2f2] py-10"
              >
                <td className=" p-2 md-p-3 xl:p-4 flex items-center justify-center">
                  <div className="w-20  h-28 flex items-center justify-center flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/${item.thumbnail}`}
                      alt={item.title}
                      className="h-full rounded-lg w-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.tags}</td>
               
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
                <td className="  pr-2 md:pr-3 xl:pr-5 text-white">
                  <div className="flex space-x-3 text-xs sm:text-sm xl:text-base items-center justify-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="h-6 lg:h-7 xl:h-8 w-12 md:w-14 xl:w-16 bg-[#54ca68] font-semibold shadow-xl rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="h-6  lg:h-7 xl:h-8 w-12 md:w-14 xl:w-16 bg-[#fc544b] font-semibold shadow-xl rounded-md"
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
        <WallModel
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onWallpaperAdded={handleWallpaperAdded}
        />
      </div>
    </div>
  );
}

export default WallPaper;
