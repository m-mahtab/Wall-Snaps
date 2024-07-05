import React from 'react';
import Modal from 'react-modal';
import AddCategory from './AddCategory';

Modal.setAppElement('#root');

function CategoryModal({ isOpen, onRequestClose, onCategoryAdded }) {
    const customStyles = {
        content: {
            height: 'auto', // Customize height
            width: '500px',  // Customize width
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            borderRadius: '0.5rem', // Rounded corners
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Overlay background color
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            className="modal flex items-center justify-center p-0"
            overlayClassName="overlay shadow-xl"
        >
            <AddCategory onCategoryAdded={onCategoryAdded} isOpen={isOpen}
                onRequestClose={onRequestClose} />

            <div className='h-9 w-9 absolute z-50 top-0 right-0 rounded-xl bg-white flex justify-center items-center '>

                <div onClick={onRequestClose} className="flex justify-center items-center close-button">X</div>
            </div>


        </Modal>
    );
}

export default CategoryModal;
