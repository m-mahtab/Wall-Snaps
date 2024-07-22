import React, { useState } from 'react';
import { BiImages } from "react-icons/bi";

function AddWallpaper({ onWallpaperAdded, onRequestClose }) {

    const [id, setId] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [featured, setFeatured] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', image);
        formData.append('category', category);
        formData.append('tags', tags);
        formData.append('featured', featured);

        fetch('http://localhost:5000/wallpaper_gallery', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                onWallpaperAdded(data);
                setId('');
                setImage(null);
                setCategory('');
                setTags('');
                setFeatured('');
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <div className="wallpaper bg-white add-wall ">
                <div className='  w-full border-b-2 border-b-[#f2f2f2]'>
                    <div className='relative '>

                    <h2 className="font-bold text-xl cat-bar-add my-5 px-4">Add Wallpaper</h2>
                    </div>
                </div>
                <div className=' p-5'>

                    <form onSubmit={handleSubmit} className=''>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tags</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="mt-1 p-3 border rounded-full w-full"
                                required
                            />
                        </div>


                        <div className="mb-4 flex justify-between space-x-3">
                            <div className="w-1/2">
                                <label className="block text-gray-700">Select Category </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 py-3 px-9 border rounded-full w-full text-[#787878] "
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Nature">Nature</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Animals">Animals</option>
                                    <option value="Abstract">Abstract</option>
                                </select>
                            </div>
                    
                        </div>



                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <div className="mt-1  bg-[#ededed] border rounded-3xl flex items-center justify-center w-3/5 h-32">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected" className='w-full h-full rounded-3xl p-0'/>
                                ) : (
                                    <BiImages className='opacity-40 text-5xl' />
                                )}
                            </div>
                            <input
                                type="file"
                                accept='image'
                                onChange={handleImageChange}
                                className="hidden"
                                id="fileInput"
                                placeholder='Upload Image'
                               
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById('fileInput').click()} // Trigger the hidden file input
                                className="my-3 p-3 font-semibold bg-cus-black w-2/5 rounded-full text-white shadow-[#766f85e6] shadow-lg"
                            >
                                Upload Image
                            </button>
                        </div>

                        <div className='flex justify-end items-center space-x-3 border-t-2 border-t-[#f2f2f2]'>
                            <button
                                type="button" onClick={onRequestClose}
                                className="text-black px-9 py-3 rounded-full font-semibold shadow-2xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-[#766f85e6] shadow-lg"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default AddWallpaper