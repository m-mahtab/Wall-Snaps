import React, { useState } from 'react';
import { BiImages } from "react-icons/bi";

function AddLiveCat({ onLiveAdded, onRequestClose }) {

    const [id, setId] = useState('');
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [count, setCount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', image);
        formData.append('title', title);
        formData.append('count', count);

        fetch('http://localhost:5000/livecategories', {
            method: 'POST',
          
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                onLiveAdded(data);
                setId('');
                setImage(null);
                setTitle('');
                setCount('');
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
        <div className="h-auto w-full bg-white rounded-5xl">
            <div className='relative h-10 w-full border-b-2 border-b-[#f2f2f2]'>
                <h2 className="font-bold text-xl cat-bar-add mb-4 px-4">Add Live Category</h2>
            </div>
            <div className='px-5'>
                <form onSubmit={handleSubmit} className='py-6'>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 px-2 py-4 border rounded-full w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Image</label>
                        <div className="mt-1 p-2 bg-[#ededed] border rounded-3xl flex items-center justify-center w-3/5 h-44">
                            {selectedImage ? (
                                <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            ) : (
                                <BiImages className='opacity-40 text-5xl' />
                            )}
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            onChange={handleImageChange}
                            className="hidden"
                            id="fileInput"
                            placeholder='Add Image'
                            required
                        />
                         <button
                            type="button"
                            onClick={() => document.getElementById('fileInput').click()} // Trigger the hidden file input
                            className="my-3 p-2 font-semibold bg-cus-black w-3/5 rounded-full text-white"
                        >
                            Add Live Image
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
    );
}

export default AddLiveCat;
