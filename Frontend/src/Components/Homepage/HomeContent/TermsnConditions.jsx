import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current privacy policy content from your database
    fetch("http://localhost:5000/termsof_use", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setContent(data.content))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSaveChanges = () => {
    fetch("http://localhost:5000/termsof_use", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Changes Saved");

        setContent(data.content);
      });
  };
  const handlePreview = () => {
    const previewWindow = window.open(
      "http://localhost:5000/public/terms_preview.html",
      "_blank"
    );
    previewWindow.onload = function () {
      previewWindow.postMessage(content, "http://localhost:5173");
    };
  };

  return (
    <div className="border border-slate-200 h-auto">
      <div className="m-2 sm:m-4 md:m-6 xl:m-8 h-auto bg-white rounded-2xl shadow-xl">
        <div className="h-auto border-b-2 border-slate-100 relative px-3 md:px-4 lg:px-6 py-3">
          <div className="h-auto py-1 md:py-2 xl:py-3 flex items-center justify-between lg:justify-start">
            <p className="font-bold text-lg cat-bar">Terms of Use</p>
            <button
              onClick={handlePreview}
              className="btn-shadow lg:mx-3 xl:mx-5 bg-cus-black text-white  px-3 md:px-4 lg:px-6 py-1 rounded-full font-semibold"
            >
              Preview
            </button>
          </div>
        </div>
        <div className="px-3 md:px-4 lg:px-6 h-auto">
          <div className="md:p-2 md:px-3 xl:px-4 my-2 md:my-3 xl:my-5 ">
            <ReactQuill
              value={content}
              onChange={setContent}
              className="custom-quil"
            />
          </div>
          <button
            onClick={handleSaveChanges}
            className="mb-2 md:my-3 lg:my-4 xl:my-5 bg-cus-black text-white px-3 py-1 md:px-5  md-py-2 lg:px-7 xl:px-9 xl:py-3 rounded-full font-semibold shadow-2xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
