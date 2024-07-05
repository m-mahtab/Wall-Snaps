import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import WallModel from './WallModel';
import EditWal from './EditWal';


function Category() {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 4;

    useEffect(() => {
        fetch('http://localhost:5000/wallpaper_gallery')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);




    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const handleEditClick = (item) => {
        setEditItem(item);
    };


    const handleDeleteClick = (id) => {
        fetch(`http://localhost:5000/wallpaper_gallery/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                setData(data.filter(item => item.id !== id));
            })
            .catch((error) => console.log(error));
    };

    const handleWallpaperAdded = (newWallpaper) => {
        setData([...data, newWallpaper]);
        setIsModalOpen(false);
    };

    const handleWallpaperEdit = (updatedData) => {
        console.log(updatedData)
        setData([...data, updatedData]);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const totalcount = data.length;


    return (
        <div className='h-auto py-8'>


            <div className=" h-auto py-4 bg-white rounded-2xl shadow-xl">
                <div className='h-auto py-5 relative'>
                    <div className='flex justify-between px-8'>

                        <h2 className='font-bold text-xl cat-bar'>WallPaper</h2>
                        <button onClick={openModal} className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-2xl">
                            Add Wallpaper
                        </button>
                    </div>
                </div>
                <div className='h-auto py-4 bg-white flex justify-between px-5 border-t-2 border-t-slate-200'>
                    <div className='flex items-center justify-center space-x-3 w-1/3 '>
                        <p className='text-lg'>Show</p>
                        <span className='flex items-center justify-center border border-slate-200 rounded-full p-3 w-16'>{totalcount}</span>
                        <p className='text-lg'>entries </p>

                    </div>
                    <div className='flex items-center justify-between px-3 w-1/3'>
                        <p>Search:</p>
                        <input
                            type="text"

                            // onChange={(e) => setTitle(e.target.value)}
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
                    />
                )}

                <table className="w-full">
                    <thead className="bg-person py-5  h-auto">
                        <tr className=''>
                            <th className="w-1/6 py-2">Image</th>
                            <th className="w-1/6 py-2">Category</th>
                            <th className="w-1/6 py-2">Tags</th>
                            <th className="w-1/6 py-2">Type</th>
                            <th className="w-1/6 py-2">Featured</th>
                            <th className="w-1/6 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((item) => (
                            <tr key={item.id} className="text-center border-b-2  border-gray-300 py-10">
                                <td className=" pl-8 py-2">
                                    <img src={`http://localhost:5000/${item.image}`} alt={item.title} className="h-40 w-24 mx-auto rounded-lg" />
                                </td>
                                <td className="px-4 py-2">{item.category}</td>
                                <td className="px-4 py-2">{item.tags}</td>
                                <td className="type">
                                    <span className="badge badge-info border-radius-5">{item.type} </span></td>
                                <td className="px-4 py-2">{item.featured}</td>
                                <td className="flex space-x-3 pr-8 items-center justify-center text-white">
                                    <button onClick={() => handleEditClick(item)} className="h-8 w-16 bg-green-500 font-semibold shadow-xl rounded-md">Edit</button>
                                    <button onClick={() => handleDeleteClick(item.id)} className="h-8 w-16 bg-red-500 font-semibold shadow-xl rounded-md">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(data.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    activeLinkClassName={'active'}
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

export default Category;
