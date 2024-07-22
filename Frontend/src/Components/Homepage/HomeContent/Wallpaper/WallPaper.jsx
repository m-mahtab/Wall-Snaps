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
    <div className="h-auto py-8">
      <div className="h-auto py-4 bg-white rounded-2xl shadow-xl">
        <div className="h-auto py-5 relative">
          <div className="flex justify-between px-8">
            <h2 className="font-bold text-xl cat-bar">Wallpaper</h2>
            <button
              onClick={openModal}
              className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold cat-button-shadow"
            >
              Add Wallpaper
            </button>
          </div>
        </div>
        <div className="h-auto py-4 bg-white flex justify-between px-5 border-t-2 border-t-slate-200">
          <div className="flex items-center justify-center space-x-3 w-1/3">
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
          <EditWal
            editItem={editItem}
            onWallpaperEdit={handleWallpaperEdit}
            setEditItem={setEditItem}
            currentImage={`http://localhost:5000/${editItem.image}`}
          />
        )}

        <table className="w-full">
          <thead className="bg-person py-5  h-auto">
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
                className="text-center border-b-2  border-gray-300 "
              >
                <td className=" py-5 px-10 flex items-center justify-center">
                  <div className=" h-36 flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/${item.thumbnail}`}
                      alt={item.title}
                      className="h-full rounded-lg w-max"
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
                <td className="  pr-8  text-white">
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
