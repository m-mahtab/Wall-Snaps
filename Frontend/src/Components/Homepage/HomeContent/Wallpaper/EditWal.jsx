import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function EditWal({ onWallpaperEdit, currentImage, setEditItem, editItem }) {
  const customStyles = {
    content: {
      height: "auto",
      width: "500px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "",
      borderRadius: "1.5rem",
      overflowY: "auto",
      overflowX: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editItem) {
      setId(editItem.id);
      setCategory(editItem.category);
      setTags(editItem.tags);
      setSelectedImage(currentImage);
      setIsModalOpen(true);
    }
  }, [editItem, currentImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("tags", tags);

    if (image) {
      formData.append("image", image);
    }

    fetch(`http://localhost:5000/wallpaper_gallery/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        onWallpaperEdit((prevData) =>
          prevData.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        setEditItem(null);
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => console.log(error));
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
      style={customStyles}
      className="modal flex items-center justify-center p-0"
      overlayClassName="overlay"
    >
      <div className="wallpaper bg-white add-wall">
        <div className=" w-full border-b-2 border-b-[#f2f2f2]">
          <div className="relative">
            <h2 className="font-bold text-xl  cat-bar-add my-5 px-4">
              Edit Wallpaper
            </h2>
          </div>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label className="block text-gray-700">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 px-3 py-2 md:px-3  xl:py-4 border rounded-full w-full"
                required
              />
            </div>

            <div className="mb-4 flex space-x-3">
              <div className="w-1/2">
                <label className="block text-gray-700">Select Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 p-2 md:p-3 xl:px-6 xl:py-3 border rounded-full w-full  text-[#787878]"
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
              <div className="mt-1 bg-[#ededed] border rounded-3xl flex items-center justify-center w-3/5 h-32">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="rounded-3xl p-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentImage}
                    alt="Current"
                    className="rounded-3xl p-0 w-full h-full object-cover"
                  />
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
                onClick={() => document.getElementById("fileInput").click()}
                className="my-3 p-3 font-semibold bg-cus-black w-2/5 rounded-full text-white shadow-[#766f85e6] shadow-lg"
              >
                Upload Image
              </button>
            </div>

            <div className="flex justify-end items-center space-x-3 border-t-2 border-t-[#f2f2f2]">
              <button
                type="button"
                onClick={closeModal}
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
      <div
        onClick={closeModal}
        className="text-2xl absolute z-50 top-2 right-2 shadow-xl shadow-slate-200 rounded-xl h-9 w-9 bg-white flex justify-center items-center close-button"
      >
        &times;
      </div>
    </Modal>
  );
}

export default EditWal;
