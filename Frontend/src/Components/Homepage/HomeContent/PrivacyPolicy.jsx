import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  
    const [content, setContent] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch current privacy policy content from your database
        fetch('http://localhost:5000/privacy_policies',{
            method : 'GET',
           
        })
        .then(response => response.json())
        .then(data=>setContent(data.content))
        .catch(error => console.error('Error:', error));
    }, []);


    const handleSaveChanges = () => {
        fetch('http://localhost:5000/privacy_policies',{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({content})
        })
        .then(response =>response.json())
        .then(data=>{
            alert('Changes Saved')

            setContent(data.content)
        }

        )
       
    };
    const handlePreview = () => {
        const previewWindow = window.open('http://localhost:5000/public/policy_preview.html', '_blank');
        previewWindow.onload = function() {
          previewWindow.postMessage(content, 'http://localhost:5173');  
        };
      };
    
    

   
    return (
        <div className='border border-slate-200 h-auto'>
            <div className='m-8 h-auto bg-white rounded-2xl shadow-xl'>
                <div className='h-auto border-b-2 border-slate-100 relative px-6 py-3'>
                    <div className='h-auto py-3 flex items-center  justify-start'>
                        <p className='font-bold text-lg cat-bar'>Privacy Policy</p>
                        <button onClick={handlePreview} className='btn-shadow mx-5 bg-cus-black text-white px-6 py-1 rounded-full font-semibold'>Preview</button>
                    </div>
                </div>  
                <div className='px-6 h-auto'>
                    <div className='py-2 px-4 my-5 '>
                        <ReactQuill 
                            value={content} onChange={setContent}
                            className='custom-quil' 
                            />
                    </div>
                    <button onClick={handleSaveChanges} className="my-5 bg-cus-black text-white px-9 py-3 rounded-full font-semibold shadow-2xl">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;



