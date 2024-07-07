import React, { useState } from 'react';


function Settings() {
    const [appName, setAppName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSaveAppName = () => {
        console.log(`App Name: ${appName}`);
        // Implement save functionality here
    };

    const handleChangePassword = () => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('An error occurred');
        });
    };


    return (
        <div className='w-full '>



            <div className='flex flex-wrap p-6 justify-between '>
                <div className='w-1/2 pr-3'>

                    <div className=' p-4 bg-white h-56  rounded-3xl shadow-lg'>
                        <div className='h-10 w-full border-b-gray-300 border-b-2 mb-4'>
                            <p className='font-bold text-md'>Settings</p>
                        </div>
                        <div className='h-auto'>
                            <label htmlFor='appName' className='block mb-2 font-semibold'>
                                App Name Title
                            </label>
                            <input
                                id='appName'
                                type='text'
                                value={appName}
                                onChange={(e) => setAppName(e.target.value)}
                                className='w-full p-2 mb-4 border border-gray-300 rounded-full'
                            />
                            <div className='flex justify-end'>

                                <button
                                    onClick={handleSaveAppName}
                                    className='bg-cus-black text-white px-6 py-2 rounded-full shadow-[#90899de6]  shadow-lg '
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 pl-3'>

                    <div className=' p-4 bg-white h-56  rounded-3xl shadow-lg'>
                        <div className='h-10 w-full border-b-gray-300 border-b-2 mb-4'>
                            <p className='text-lg px-3'>Change Password</p>
                        </div>
                        <div className='h-auto'>
                            <div className='flex justify-between px-3'>
                                <div>
                                    <label htmlFor='oldPassword' className='block mb-2 font-semibold'>
                                        Old Password
                                    </label>
                                    <input
                                        id='oldPassword'
                                        type='password'
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded-full'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='newPassword' className='block mb-2 font-semibold'>
                                        New Password
                                    </label>
                                    <input
                                        id='newPassword'
                                        type='password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className='w-full p-2 border border-gray-300 rounded-full'
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end'>

                                <button
                                     onClick={handleChangePassword}
                                    className='bg-cus-black text-white px-6 py-2 rounded-full mt-4 shadow-[#90899de6]  shadow-lg '
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Settings;
