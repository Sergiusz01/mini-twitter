import React, { useState } from 'react';
import './LogoSearch.css';
import Logo from '../../Img/logo.png';
import { Link } from 'react-router-dom';
import ShareModal from '../ShareModal/ShareModal';

const LogoSearch = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="LogoSearch">
            <Link to="../home">
                <img src={Logo} alt="Logo" />
            </Link>

            <div className="button rg-button" onClick={() => setModalOpened(true)}>
                Share
            </div>

            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
    );
};

export default LogoSearch;

