// Header.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header d-flex align-items-center justify-content-between p-3">
            <img
                className="element-telus-logo"
                alt="Element telus logo"
                src="/images/telus.png"
                height="40"
            />
            <div>
                <Link to="/login" className="btn btn-success rounded-pill mx-2">
                    LOGIN
                </Link>
                <Link to="/register" className="btn btn-success rounded-pill mx-2">
                    SIGN UP
                </Link>
            </div>
        </div>
    );
};

export default Header;
