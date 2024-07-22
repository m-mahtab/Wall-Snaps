import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import LiveCatModel from "./LiveCatModel";
import EditLiveCat from "./EditLiveCat";
import axios from "axios";

function LiveCategory() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesCount, setImagesCount] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchLiveCategories();
  }, []);

  useEffect(() => {
    const result = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(result);
  }, [searchQuery, data]);

  const fetchLiveCategories = () => {
    fetch("http://localhost:5000/livecategories")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filtered data with all categories
      })
      .catch((error) => console.log(error));
  };

  const totalcount = filteredData.length;

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5000/livecategories/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setData(data.filter((item) => item.id !== id));
        setFilteredData(filteredData.filter((item) => item.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleLiveAdded = (newCategory) => {
    setData([...data, newCategory]);
    setFilteredData([...filteredData, newCategory]);
    setIsModalOpen(false);
  };

  const handleCategoryEdit = (updatedData) => {
    const updatedList = data.map(item =>
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
  useEffect(() => {
    const fetchImagesCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/image-count-livecat');
        setImagesCount(response.data);
      } catch (error) {
        console.error('Error fetching images count', error);
      }
    };

    fetchImagesCount();
  }, []);

    // Helper function to get count for a specific title
    const getCountForTitle = (title) => {
      const countItem = imagesCount.find(item => item.title === title);
      return countItem ? countItem.count : 0;
    };
  return (
    <div className="h-auto py-8">
      <div className="h-auto bg-white rounded-2xl shadow-xl">
        <div className="h-auto relative py-5">
          <div className="flex justify-between px-8">
            <h2 className="font-bold text-xl cat-bar">Live Category</h2>
            <button
              onClick={openModal}
              className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold cat-button-shadow"
            >
              Add Live Category
            </button>
          </div>
        </div>
        <div className="h-auto py-4 bg-white flex justify-between px-5 border-t-2 border-t-[#f2f2f2]">
          <div className="flex items-center justify-center space-x-3 w-1/3">
            <p className="text-lg">Show</p>
            <span className="flex items-center justify-center border border-[#f2f2f2] rounded-full p-3 w-16">
              {totalcount}
            </span>
            <p className="text-lg">entries</p>
          </div>
          <div className="flex items-center justify-between px-3 w-fit">
            <p>Search:</p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1 p-3 border border-slate-200 rounded-full"
              required
            />
          </div>
        </div>
        {editItem && (
          <EditLiveCat
            editItem={editItem}
            onLiveCategoryEdit={handleCategoryEdit}
            setLiveEditItem={setEditItem}
            currentLiveImage={`http://localhost:5000/${editItem.image}`}
          />
        )}

        <table className="min-w-full">
          <thead className="bg-[#f2f2f2] py-5 h-auto">
            <tr>
              <th className="w-1/4 py-2">Image</th>
              <th className="w-1/4 py-2">Title</th>
              <th className="w-1/4 py-2">Wallpaper count</th>
              <th className="w-1/4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item) => (
              <tr
                key={item.id}
                className="text-center border-b-2 border-[#f2f2f2] py-10"
              >
                <td className="p-4 flex items-center justify-center">
                  <div className="w-36 h-24 flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.title}
                      className="h-full rounded-lg w-max"
                    />
                  </div>
                </td>
                <td>{item.title}</td>
                <td className="text-white">
                  <div className="flex items-center justify-center">
                    <div className="bg-cus-black rounded-full w-20 h-12 flex justify-center items-center">
                    {getCountForTitle(item.title)}
                    </div>
                  </div>
                </td>
                <td className="pr-5 text-white">
                  <div className="flex space-x-3 items-center justify-center">
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
          className="p-7 flex justify-end"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(totalcount / itemsPerPage)}
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
        <LiveCatModel
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onLiveAdded={handleLiveAdded}
        />
      </div>
    </div>
  );
}

export default LiveCategory;
