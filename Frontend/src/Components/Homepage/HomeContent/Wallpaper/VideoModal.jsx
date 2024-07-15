import React from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import axios from "axios";

const VideoModal = ({ isOpen, onRequestClose, videoUrl }) => {
  const customStyles = {
    content: {
      height: "auto", // Customize height
      width: "600px", // Customize width
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "0",
      borderRadius: "0.5rem", // Rounded corners
      overflowY: "auto",
      overflowX: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)", // Overlay background color
    },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen} // Use showModal to control modal visibility
        onRequestClose={onRequestClose} // Use closeModal to handle close request
        style={customStyles}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <span className="absolute bg-white rounded-lg  text-2xl h-8 w-8 top-0 right-0 z-10 flex items-center justify-center cursor-pointer" onClick={onRequestClose}>
            &times;
          </span>
          <ReactPlayer url={videoUrl} controls />
      
        </div>
      </Modal>
    </div>
  );
};

export default VideoModal;
