import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import './Header.css'; // Import the CSS file

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/dashboard" className="navbar-brand">
                    <img
                        className="element-telus-logo"
                        alt="Element telus logo"
                        src="/images/telus.png"
                        height="40"
                    />
                </Link>
                <ul className="navbar-nav ms-auto">
                    {!userInfo ? (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link nav-link-custom">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link nav-link-custom">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
