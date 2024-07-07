import React, { useState, useEffect } from 'react';


const PolicyPreview = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        // Fetch current privacy policy content from your database
        fetch('http://localhost:5000/privacy_policies', {
            method: 'GET',

        })
            .then(response => response.json())
            .then(data => setContent(data.content))
            .catch(error => console.error('Error:', error));
    }, []);

   

    return (
        <div className='border border-slate-200 h-auto'>
            <div className='m-8 h-auto bg-white rounded-2xl shadow-xl'>
                <div className='h-auto border-b-2 border-slate-100 px-6 py-3'>
                    <div className='h-auto flex items-center justify-start'>
                        <p className='font-bold'>Preview</p>
                    </div>
                </div>
                <div className='px-6 h-auto' dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default PolicyPreview;
