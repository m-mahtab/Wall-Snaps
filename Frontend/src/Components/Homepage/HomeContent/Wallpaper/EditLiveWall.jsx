import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import { LuPlayCircle } from "react-icons/lu";

function EditLiveWall({
  onLiveWallpaperEdit,
  currentImage,
  currentVideo,
  setEditItem,
  editItem,
}) {
  const customStyles = {
    content: {
      height: "auto",
      width: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "",
      borderRadius: "0.5rem",
      overflowY: "auto",
      overflowX: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };
  const [id, setId] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editItem) {
      setId(editItem.id);
      setCategory(editItem.category);
      setTags(editItem.tags);
      setThumbnail(null); // Reset thumbnail state for new selection
      setVideo(null); // Reset video state for new selection
      setSelectedImage(currentImage);
      setSelectedMedia(currentVideo);
      setIsModalOpen(true);
    }
  }, [editItem, currentImage, currentVideo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("thumbnail", thumbnail); // Append new thumbnail file if changed
    formData.append("video", video); // Append new video file if changed
    formData.append("category", category);
    formData.append("tags", tags);

    try {
      const response = await fetch(
        `http://localhost:5000/livewallpapers/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      const data = await response.json();
      onLiveWallpaperEdit(data); // Update state with new data
      setEditItem(null); // Reset edit item
      setIsModalOpen(false); // Close modal
      window.location.reload(); // Reload page after successful update (consider better UX approach)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setEditItem(null); // Reset edit item
    setIsModalOpen(false); // Close modal
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedMedia({ file, preview: reader.result });
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
      <div className="w-full bg-white">
        <div className=" h-14 w-full border-b-2 border-b-[#f2f2f2]">
          <div className="relative">
            <h2 className="font-bold text-xl cat-bar-add my-5 px-4">
              Edit Live Wallpaper
            </h2>
          </div>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="w-full">
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

            <div className="mb-4 space-x-4 flex w-full">
              <div className="w-1/2">
                <label className="block text-gray-700">Select Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 py-3 border rounded-full w-full text-[#787878]"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Nature">Nature</option>
                  <option value="Technology">Technology</option>
                  <option value="Animals">Animals</option>
                  <option value="Abstract">Abstract</option>
                </select>
              </div>
            </div>

            <div className="mb-4 w-full flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Image</label>
                <div className="mt-1 p-2 bg-[#ededed] border rounded-3xl flex items-center justify-center h-44">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      className="rounded-3xl"
                    />
                  ) : (
                    <img
                      src={currentImage}
                      alt="Current"
                      className="rounded-3xl p-0"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileInputImage"
                  placeholder="Upload Image"
                  
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("fileInputImage").click()
                  }
                  className="my-3 p-3 font-semibold bg-cus-black w-3/5 rounded-full text-white shadow-lg"
                >
                  Upload Image
                </button>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Video</label>
                <div className="mt-1 bg-[#ededed] border rounded-3xl flex items-center justify-center h-44">
                  {selectedMedia ? (
                    selectedMedia.file ? (
                      <ReactPlayer
                        url={selectedMedia.preview}
                        controls
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <ReactPlayer
                        url={currentVideo}
                        controls
                        width="100%"
                        height="100%"
                      />
                    )
                  ) : (
                    <LuPlayCircle className="opacity-40 text-5xl" />
                  )}
                </div>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={handleMediaChange}
                  className="hidden"
                  id="fileInputVideo"
                  placeholder="Upload Video"
                  
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("fileInputVideo").click()
                  }
                  className="my-3 p-3 font-semibold bg-cus-black w-3/5 rounded-full text-white shadow-lg"
                >
                  Upload Video
                </button>
              </div>
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
                className="bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="h-9 w-9 absolute z-40 top-0 -right-0 rounded-xl bg-white flex justify-center items-center">
        <div
          onClick={closeModal}
          className="flex justify-center items-center close-button"
        >
          &times;
        </div>
      </div>
    </Modal>
  );
}

export default EditLiveWall;
