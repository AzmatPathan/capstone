import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isProfilePage = location.pathname === '/profile';

    const handleLogoutClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="header d-flex align-items-center justify-content-between p-3">
            <img
                className="element-telus-logo"
                alt="Element telus logo"
                src="/images/telus.png"
                height="40"
            />
            {isProfilePage ? (
                <div>
                    <img
                        src="/images/bell.png"
                        alt="Bell"
                        height="50"
                        className="mx-2"
                        style={{ cursor: 'pointer' }}
                    />
                    <img
                        src="/images/Logout.jpeg"
                        alt="Logout"
                        height="30"
                        className="mx-2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleLogoutClick}
                    />
                </div>
            ) : (
                <div>
                    <Link to="/login" className="btn btn-success rounded-pill mx-2">
                        LOGIN
                    </Link>
                    <Link to="/register" className="btn btn-success rounded-pill mx-2">
                        SIGN UP
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
