import React, { useState } from "react";
import { BiImages } from "react-icons/bi";
import ReactPlayer from "react-player";
import { LuPlayCircle } from "react-icons/lu";


function AddLiveWall({ onWallpaperAdded, onRequestClose }) {
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState(null);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("media", media);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("tags", tags);
    formData.append("featured", featured);

    fetch("http://localhost:5000/livewallpapers", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        onWallpaperAdded(data);
        setId("");
        setImage(null);
        setMedia(null);
        setCategory("");
        setType("");
        setTags("");
        setFeatured("");
        window.location.reload();
      })
      .catch((error) => console.error("Error:", error));
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
    setMedia(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedMedia({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-full bg-white  ">
        <div className="relative h-14  w-full border-b-2 border-b-[#f2f2f2]">
          <h2 className="font-bold text-xl py-6  cat-bar-add mb-4 px-4">
            Add Live Wallpaper
          </h2>
        </div>
        <div className=" p-5">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 ">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 p-3 border rounded-full w-full"
                required
              />
            </div>

            <div className="mb-4 space-x-4 flex w-full ">
              <div className="w-1/2">
                    <label className="block text-gray-700">Select Category </label>
                    <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 py-3  border rounded-full w-full text-[#787878] "
                    required
                    >
                    <option value="">Select Category</option>
                    <option value="Nature">Nature</option>
                    <option value="Technology">Technology</option>
                    <option value="Animals">Animals</option>
                    <option value="Abstract">Abstract</option>
                    </select>
              </div>
              <div className="w-1/2">
                    <label className="block text-gray-700">Select Type</label>
                    <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 py-3  border rounded-full w-full text-[#787878]"
                    required
                    >
                    <option value="">Select Type</option>
                    <option value="Premium">Premium</option>
                    <option value="Locked">Locked</option>
                    <option value="None">None</option>
                    </select>
              </div>
            </div>

            <div className="mb-4 w-full flex space-x-4">
              <div className="w-1/2">
                    <label className="block text-gray-700">Image</label>
                    <div className="mt-1 p-2 bg-[#ededed] border rounded-3xl flex items-center justify-center h-44 ">
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
                    id="fileInput"
                    placeholder="Upload Image"
                    required
                    />
                    <button
                    type="button"
                    onClick={() => document.getElementById("fileInput").click()} // Trigger the hidden file input
                    className="my-3 p-3 font-semibold bg-cus-black w-3/5 rounded-full text-white shadow-[#766f85e6] shadow-lg"
                    >
                    Upload Image
                    </button>
              </div>
              <div className="w-1/2">
                    <label className="block text-gray-700">Video</label>
                    <div className="mt-1 p-2 bg-[#ededed] border rounded-3xl flex items-center justify-center h-44">
                    {selectedMedia ? (
                                selectedMedia.file.type.startsWith('video') ? (
                                    <img src={selectedMedia.preview} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <ReactPlayer url={selectedMedia.preview} controls width="100%" height="100%" />
                                )
                            ) : (
                                <LuPlayCircle className='opacity-40 text-5xl' />
                            )}

                    </div>
                    <input
                    type="file"
                    accept="video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                    id="fileInput"
                    placeholder="Upload Media"
                    required
                    />
                    <button
                    type="button"
                    onClick={() => document.getElementById("fileInput").click()} // Trigger the hidden file input
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
