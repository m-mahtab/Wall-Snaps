import React, { useState } from "react";
import axios from "axios";

function Settings() {
  const [appName, setAppName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [id, setId] = useState("")
  const [message, setMessage] = useState("");

  const handleSaveAppName = () => {
    console.log(`App Name: ${appName}`);
    // Implement save functionality here
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword === "") {
      setMessage("New password cannot be empty");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        oldPassword: oldPassword,
        newPassword: newPassword,
        id : id
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-grow p-6 justify-between">
        <div className="w-1/2 pr-3">
          <div className="bg-white h-64 rounded-3xl shadow-lg">
            <div className="relative h-auto w-full border-b-gray-300 border-b-2 mb-4">
              <p className="font-bold text-xl py-4 px-5 cat-bar">Settings</p>
            </div>
            <div className="h-auto p-4">
              <label htmlFor="appName" className="block mb-2 font-semibold">
                App Name Title
              </label>
              <input
                id="appName" 
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-full"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAppName}
                  className="bg-cus-black text-white px-6 py-2 rounded-full btn-shadow"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-3">
          <div className="bg-white h-64 rounded-3xl shadow-lg">
            <div className="h-auto w-full border-b-gray-300 border-b-2 mb-4 relative">
              <p className="text-lg cat-bar p-4">Change Password</p>
            </div>
            <div className="h-auto p-4">
              <div className="flex justify-between px-3">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block mb-2 font-semibold"
                  >
                    Old Password
                  </label>
                  <input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 font-semibold"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleChangePassword}
                  className="bg-cus-black text-white px-6 py-2 rounded-full mt-4 btn-shadow"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}

export default Settings;
