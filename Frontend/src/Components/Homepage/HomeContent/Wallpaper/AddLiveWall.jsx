import React, { useState } from "react";
import { BiImages } from "react-icons/bi";
import ReactPlayer from "react-player";
import axios from "axios";

function AddLiveWall({ onWallpaperAdded, onRequestClose }) {
  const [id, setId] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("featured", featured);

    try {
      const response = await axios.post("http://localhost:5000/livewallpapers", formData);
      onWallpaperAdded(response.data);
      setId("");
      setImage(null);
      setThumbnail(null);
      setVideo(null);
      setCategory("");
      setTags("");
      setFeatured("");
      setSelectedImage(null);
      setSelectedMedia(null);
      onRequestClose(); // Close the modal after successful upload
    } catch (error) {
      console.error("Error:", error);
    }
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

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedMedia({ file, preview: fileUrl });
    }
  };

  return (
    <>
      <div className="w-full bg-white">
        <div className="w-full border-b-2 border-b-[#f2f2f2]">
          <div className="relative">
            <h2 className="font-bold text-xl cat-bar-add my-5 px-4">Add Live Wallpaper</h2>
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
                className="mt-1 px-3 py-2 md:px-3  xl:py-4 border rounded-full w-full"
                required
              />
            </div>

            <div className="mb-4 space-x-4 flex w-full">
              <div className="w-1/2">
                <label className="block text-gray-700">Select Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 p-2 md:p-3 xl:px-6 xl:py-3 border rounded-full w-full text-[#787878]"
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
                <div className="mt-1 bg-[#ededed] border rounded-3xl flex items-center justify-center h-44">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  ) : (
                    <BiImages className="opacity-40 text-5xl" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                  placeholder="Upload Image"
                  required
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("imageInput").click()} // Trigger the hidden file input
                  className="my-3 p-3 font-semibold bg-cus-black w-3/5 rounded-full text-white shadow-[#766f85e6] shadow-lg"
                >
                  Upload Image
                </button>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Video</label>
                <div className="p-2 bg-[#ededed] border rounded-3xl flex items-center justify-center h-44">
                  {selectedMedia && selectedMedia.file && (
                    <ReactPlayer
                      url={selectedMedia.preview}
                      controls
                      width="100%"
                      height="100%"
                      className="rounded-3xl"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={handleMediaChange}
                  className="hidden rounded-full"
                  id="videoInput"
                  placeholder="Upload Media"
                  required
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("videoInput").click()} // Trigger the hidden file input
                  className="my-3 p-3 font-semibold bg-cus-black w-3/5 rounded-full text-white shadow-[#766f85e6] shadow-lg"
                >
                  Upload Video
                </button>
              </div>
            </div>

            <div className="flex justify-end items-center space-x-3 border-t-2 border-t-[#f2f2f2]">
              <button
                type="button"
                onClick={onRequestClose}
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
  );
}

export default AddLiveWall;
