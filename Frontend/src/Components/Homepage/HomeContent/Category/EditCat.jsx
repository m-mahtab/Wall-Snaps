import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';


function EditCat({ editItem, onCategoryEdit, setEditItem , currentImage}) {
  const [formData, setFormData] = useState({ id: '', title: ''});
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editItem) {
      setFormData({ id: editItem.id, title: editItem.title });
      setSelectedImage(editItem.src);
      setIsModalOpen(true);
    }
  }, [editItem]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append('id', formData.id);
    updatedFormData.append('title', formData.title);
    
    if (image) {
      updatedFormData.append('image', image);
    }

    fetch(`http://localhost:5000/new_cat/:id`, {
      method: 'PUT',
      body: updatedFormData,
    })
      .then(response => response.json())
      .then(updatedItem => {
        onCategoryEdit(prevData => prevData.map(item => item.id === updatedItem.id ? updatedItem : item));
        setEditItem(null);
        setIsModalOpen(false);
        // window.location.reload();
      })
      .catch(error => console.log(error));
  };

  const closeModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
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
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="modal flex items-center justify-center p-0"
      overlayClassName="overlay shadow-xl"
    >
      <div className='h-auto w-full bg-white rounded-3xl'>
        <div className='relative h-10 w-full border-b-2 border-b-[#f2f2f2]'>
          <h2 className="font-bold text-xl cat-bar-add mb-4 px-4">Edit Category</h2>
        </div>
        <div className='p-5'>
          <form onSubmit={handleFormSubmit} className="">
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Title"
                className="mt-1 px-2 py-4 border rounded-full w-full"
              />
            </div>

            <div>
             
              <div className="mt-1 p-2 bg-[#ededed] border rounded-3xl flex items-center justify-center w-3/5 h-44">
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" className='w-full h-full rounded-3xl p-0' />
                ) : (
                  <img src={currentImage} alt='Current' className='w-full h-full rounded-3xl p-0'/>
                )}
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="fileInput"
              />
              <button
                type="button"
                onClick={() => document.getElementById('fileInput').click()}
                className="my-3 p-2 font-semibold bg-cus-black w-3/5 rounded-full text-white"
              >
                Add Image
              </button>
            </div>

            <div className='flex justify-end items-center space-x-3 border-t-2 border-t-[#f2f2f2]'>
              <button type="button" onClick={closeModal} className="text-black px-9 py-3 rounded-full font-semibold shadow-2xl">Cancel</button>
              <button type="submit" className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-2xl">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default EditCat;