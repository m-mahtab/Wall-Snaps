import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import CategoryModal from './CtegoryModal'
import EditCat from "./EditCat";
import axios from "axios";

function Category() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesCount, setImagesCount] = useState([]);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch("http://localhost:5000/new_cat")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filteredData with all data
      })
      .catch((error) => console.log(error));
  }, []);


  useEffect(() => {
    const result = data.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(result);
    setCurrentPage(0); // Reset currentPage when searchQuery changes
  }, [searchQuery, data]);

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
    fetch(`http://localhost:5000/new_cat/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleCategoryAdded = (newCategory) => {
    setData([...data, newCategory]);
    setIsModalOpen(false);
  };

  const handleCategoryEdit = (updatedData) => {
    const updatedList = data.map(item => 
      item.id === updatedData.id ? updatedData : item
    );
    setData(updatedList);
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
        const response = await axios.get('http://localhost:5000/image-count');
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
    <div className="h-auto my-2 md:my-0 py-4  lg:py-6 xl:py-8">
      <div className="h-auto bg-white rounded-2xl shadow-xl">
        <div className="relative py-3 lg:py-4 xl:py-5">
          <div className="flex justify-between item-center px-3 md:px-4 lg:px-6 xl:px-8">
            <h2 className="font-bold text-lg xl:text-xl cat-bar">Category</h2>
            <button
              onClick={openModal}
              className="text-xs md:text-base bg-cus-black text-white px-3 md:px-7 xl:px-9  py-2  xl:py-3 rounded-full font-semibold cat-button-shadow"
            >
              Add Category
            </button>
          </div>
        </div>
        <div className="text-sm md:text-base xl:text-lg  h-auto py-2 xl:py-4 bg-white flex flex-col lg:flex-row  justify-center lg:justify-between px-5 border-t-2 border-t-[#f2f2f2]">
          <div className=" flex items-center justify-center space-x-1 sm:space-x-2 lg:space-x-3 w-1/3">
            <p className="">Show</p>
            <span className="flex items-center justify-center border border-[#f2f2f2] rounded-full  p-1 md:p-2 lg:p-3 w-10 md:w-14 lg:w-16">
              {totalcount}
            </span>
            <p className="">entries</p>
          </div>
          <div className="flex items-center justify-between lg:px-3 w-fit">
            <p>Search:</p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-1 p-1 md:p-2 lg:p-3 border border-slate-200 rounded-full"
              required
            />
          </div>
        </div>
        {editItem && (
          <EditCat
            editItem={editItem}
            onCategoryEdit={handleCategoryEdit}
            setEditItem={setEditItem}
            currentImage={`http://localhost:5000/${editItem.image}`}
          />
        )}

        <table className="min-w-full text-xs sm:text-sm md:text-base ">
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
                <td className="p-2 md-p-3 xl:p-4 flex items-center justify-center">
                  <div className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-24 flex items-center justify-center">
                    <img
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.title}
                      className="h-full rounded-lg w-full object-cover"
                    />
                  </div>
                </td>
                <td>{item.title}</td>
                <td className="text-white">
                  <div className="flex items-center justify-center">
                    <div className="bg-cus-black rounded-full w-10 md:w-14 lg:w-16 xl:w-20 h-8 md:h-10 xl:h-12 flex justify-center items-center">
                    {getCountForTitle(item.title)}
                    </div>
                  </div>
                </td>
                <td className="pr-2 md:pr-3 xl:pr-5 text-white">
                  <div className="text-xs sm:text-sm xl:text-base flex space-x-3 items-center justify-center">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="h-6 lg:h-7 xl:h-8 w-12 md:w-14 xl:w-16 bg-[#54ca68] font-semibold shadow-xl rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="h-6 lg:h-7 xl:h-8 w-12 md:w-14 xl:w-16 bg-[#fc544b] font-semibold shadow-xl rounded-md"
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
        <CategoryModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onCategoryAdded={handleCategoryAdded}
        />
      </div>
    </div>
  );
}

export default Category;
