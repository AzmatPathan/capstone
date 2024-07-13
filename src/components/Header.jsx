import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice'; // Assuming logout action is defined in authSlice

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout()); // Dispatch logout action
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link to="/dashboard" className="navbar-brand">
    <img
        className="element-telus-logo"
        alt="Element telus logo"
        src="/images/telus.png"
        height="40"
    />
</Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {!userInfo ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
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
            </div>
        </nav>
    );
};

export default Header;
