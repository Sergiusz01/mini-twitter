import React from 'react';
import { Link } from 'react-router-dom';
import  './LogoSearch.css';  // Import the CSS module

const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <Link to="/home">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
                    alt="Logo"
                    className="logo"
                />
            </Link>
        </div>
    );
};

export default LogoSearch;
