import React from 'react'
import Modal from 'react-modal';
import AddLiveWall from './AddLiveWall';

const customStyles = {
    content: {
        height: 'auto', // Customize height
        width: '600px',  // Customize width
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        borderRadius: '0.5rem', // Rounded corners
        overflowY: 'auto',
        overflowX :'hidden'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Overlay background color
    },
};

function WallModel({ isOpen, onRequestClose, onWallpaperAdded }) {
    return (
        <div className='wallpaper'>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customStyles}
                className="modal  flex items-center justify-center p-0"
                overlayClassName="overlay "
            >
                <AddLiveWall
                    onWallpaperAdded={onWallpaperAdded}
                    onRequestClose={onRequestClose}
                    
                />
                <div className='h-9 w-9 absolute z-40 top-0 -right-0 rounded-xl bg-white flex justify-center items-center '>

                    <div onClick={onRequestClose} className="flex justify-center items-center close-button">X</div>
                </div>
            </Modal>
        </div>
    )
}

export default WallModel