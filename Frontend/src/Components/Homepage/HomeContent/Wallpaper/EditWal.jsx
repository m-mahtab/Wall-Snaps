import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

function EditWal({ editItem, onWallpaperEdit, setEditItem }) {
  const [formData, setFormData] = useState({ id : '', src: '', category: '', type: '', tags: '', featured: ''  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editItem) {
      setFormData({ id: editItem.id, src: editItem.src, category: editItem.category, type: editItem.type, tags: editItem.tags, featured: editItem.featured });
      setIsModalOpen(true);
    }
  }, [editItem]);

  const handleFormChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/wallpaper_gallery/${editItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(updatedItem => {
      
        onWallpaperEdit(prevData => prevData.map(item => item.id === updatedItem.id ? updatedItem : item));
        setEditItem(null);
        setIsModalOpen(false);
      })
      .catch(error => console.log(error));
  };

  const closeModal = () => {
    setEditItem(null);
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className="overlay-edit modal flex items-center justify-center py-10"
    >
      <div className='h-auto w-full bg-white rounded-3xl '>
        <div>

          <h2 className="font-bold text-xl p-5 mb-4">Edit Wallpaper</h2>
          <form onSubmit={handleFormSubmit} className="p-4  rounded-lg mb-4">
            
            <input
              type="text"
              name="src"
              value={formData.src}
              onChange={handleFormChange}
              placeholder="Image URL"
              className="p-2 m-2 border rounded"
            />
            <input
              type="text"
              name="title"
              value={formData.category}
              onChange={handleFormChange}
              placeholder="Title"
              className="p-2 m-2 border rounded"
            />
            <input
              type="text"
              name="count"
              value={formData.type}
              onChange={handleFormChange}
              placeholder="Count"
              className="p-2 m-2 border rounded"
            />
            <input
              type="text"
              name="count"
              value={formData.tags}
              onChange={handleFormChange}
              placeholder="Count"
              className="p-2 m-2 border rounded"
            />
            <input
              type="text"
              name="count"
              value={formData.featured}
              onChange={handleFormChange}
              placeholder="Count"
              className="p-2 m-2 border rounded"
            />
            <button type="submit"   onWallpaperEdit={onWallpaperEdit} className="bg-green-500 text-white p-2 rounded">Save</button>
            <button type="button" onClick={closeModal} className="bg-red-500 text-white p-2 rounded ml-2">Cancel</button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default EditWal;
