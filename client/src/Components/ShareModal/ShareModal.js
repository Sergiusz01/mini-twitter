import React from 'react';
import PostShare from '../PostShare/PostShare';
import './ShareModal.css'; // Dodamy plik stylów

function ShareModal({ modalOpened, setModalOpened }) {
    return (
        modalOpened && (
            <div className="modalBackdrop">
                <div className="modalContent">
                    <span className="closeModal" onClick={() => setModalOpened(false)}>&times;</span>
                    <PostShare />
                </div>
            </div>
        )
    );
}

export default ShareModal;
