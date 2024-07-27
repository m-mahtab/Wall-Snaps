import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function EditCat({ editItem,  onLiveCategoryEdit, setLiveEditItem, currentLiveImage }) {
  const customStyles = {
    content: {
      height: "auto", // Customize height
      width: "500px", // Customize width
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "",
      borderRadius: "1.5rem", // Rounded corners
      overflowY: "auto",
      overflowX: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)", // Overlay background color
    },
  };
  const [formData, setFormData] = useState({ id: "", title: "" });
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
    updatedFormData.append("title", formData.title);

    if (image) {
      updatedFormData.append("image", image);
    }

    fetch(`http://localhost:5000/livecategories/${formData.id}`, {
      method: "PUT",
      body: updatedFormData,
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        onLiveCategoryEdit((prevData) =>
          prevData.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        setLiveEditItem(null);
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const closeModal = () => {
    setLiveEditItem(null);
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
      style={customStyles}
    >
      <div className="h-auto w-full bg-white rounded-3xl">
      <div className=" w-full border-b-2 border-b-[#f2f2f2]">
          <div className="relative">
            <h2 className="font-bold text-xl  cat-bar-add my-5 px-4">
              Edit Live Category
            </h2>
          </div>
        </div>
        <div className="p-5 h-full">
          <form onSubmit={handleFormSubmit} className="">
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Title"
                className="mt-1 p-1 md:p-2 xl:px-2 xl:py-4 border rounded-full w-full"
              />
            </div>

            <div>
              <div className="mt-1  bg-[#ededed] border rounded-3xl flex items-center justify-center w-3/5 h-44">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-3xl p-0"
                  />
                ) : (
                  <img
                    src={currentLiveImage}
                    alt="Current"
                    className="w-full h-full object-cover rounded-3xl p-0"
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
                className="my-3 p-2 font-semibold bg-cus-black w-3/5 rounded-full text-white"
              >
                Add Image
              </button>
            </div>

            <div className="border-t-2 border-t-[#f2f2f2]">
              <div className="flex justify-end items-center space-x-3 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-black px-9 py-3 rounded-full font-semibold shadow-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-2xl"
                >
                  Save
                </button>
              </div>
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

export default EditCat;
