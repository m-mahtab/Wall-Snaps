import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function resetForm() {
    setUsername('');
    setPassword('');
  }




 async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await  axios.post('/users', { username, password })
      console.log(res.data);
      if (res.data.message === "Login Successful") {
        localStorage.setItem('token', res.data.token);

        resetForm();
        navigate('/index');
      } else {
        alert("Invalid Credentials");
      }
    } catch(err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
finally{
    setLoading(false);
  };
}


useEffect(() => {
  axios.get('http://localhost:5000/users').then((res) => {
    console.log(res)
  })
    .catch((err) => {
      console.error(err);
    });
}, [])

return (
  <div className='bg-white flex flex-wrap justify-center items-center'>
    <div className='h-auto ' >
      <div className='flex justify-center items-center'>
        <h1 className='font-semibold text-3xl mb-5'>Wallsnaps.</h1>
      </div>
      <div className='shadow-slate-200 shadow-xl rounded-xl border-t-3 border-black'>
        <div className='py-7 text-xl border-b-2 border-b-slate-100'>
          <h2 className='black-bar relative px-8 font-semibold text-2xl '>Log In</h2>
        </div>
        <form className='p-10 w-450 ' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 py-4 px-5 rounded-full border bg-white border-slate-200 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 py-4 px-5 rounded-full border border-slate-200 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-cus-black mt-4 text-white px-9 py-3 rounded-full font-semibold shadow-slate-500 shadow-lg"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  </div>
);
}


export default Login;
