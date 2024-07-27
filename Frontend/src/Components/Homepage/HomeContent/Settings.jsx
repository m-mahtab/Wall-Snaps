import React, { useState , useEffect} from "react";
import axios from "axios";

function Settings() {
  const [appName, setAppName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSaveAppName = () => {
    console.log(`App Name: ${appName}`);
    // Implement save functionality here
  };
  useEffect(() => {
    // Retrieve username from session
    const sessionUsername = localStorage.getItem('username'); // or however you're storing session info
    if (sessionUsername) {
      console.log(sessionUsername)
      setUsername(sessionUsername);
    }
  }, []);

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
        username : username
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="bg-white h-auto rounded-3xl shadow-lg p-6">
            <div className="border-b-2 border-gray-300 mb-4 pb-2">
              <p className="font-bold text-xl">Settings</p>
            </div>
            <div className="h-auto">
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
        <div className="w-full md:w-1/2">
          <div className="bg-white h-auto rounded-3xl shadow-lg p-6">
            <div className="border-b-2 border-gray-300 mb-4 pb-2">
              <p className="text-lg">Change Password</p>
            </div>
            <div className="h-auto">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2  lg:space-x-4">
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
