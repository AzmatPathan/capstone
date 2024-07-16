import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaCog, FaUsers, FaStar, FaUpload } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('dashboard')) {
            setActiveItem('Equipments');
        } else if (path.includes('reviews')) {
            setActiveItem('Reviews');
        } else if (path.includes('uploads')) {
            setActiveItem('Uploads');
        } else if (path.includes('user')) {
            setActiveItem('Users');
        } else if (path.includes('profile')) {
            setActiveItem('Profile');
        }
    }, [location]);

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            height: '100vh',
            overflowY: 'auto',
            display: sidebarOpen ? 'block' : 'none',
            position: 'fixed',
            top: '56px', // Adjust according to your header height
            left: 0,
            width: '16.666%', // Approximately 2 columns width
            zIndex: 1000 // Ensure sidebar appears above other content
        }}>
            <Nav className="flex-column">
                <Nav.Link
                    as={NavLink}
                    to="/dashboard"
                    className={activeItem === 'Equipments' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => setActiveItem('Equipments')}
                >
                    <FaHome className="mr-2" /> Equipments
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/reviews"
                    className={activeItem === 'Reviews' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => setActiveItem('Reviews')}
                >
                    <FaUsers className="mr-2" /> Reviews
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/uploads"
                    className={activeItem === 'Uploads' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => setActiveItem('Uploads')}
                >
                    <FaUpload className="mr-2" /> Uploads
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/user"
                    className={activeItem === 'Users' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => setActiveItem('Users')}
                >
                    <FaCog className="mr-2" /> Users
                </Nav.Link>
                <Nav.Link
                    as={NavLink}
                    to="/profile"
                    className={activeItem === 'Profile' ? 'text-primary font-weight-bold' : 'text-dark'}
                    onClick={() => setActiveItem('Profile')}
                >
                    <FaStar className="mr-2" /> Profile
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
