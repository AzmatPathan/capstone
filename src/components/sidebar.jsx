import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FaHome, FaCog, FaUsers, FaStar, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 position-fixed" style={{ left: 0, top: 0, width: '16.66667%' }}>
            <Navbar expand="md" className="flex-column align-items-start p-3">
                <Nav className="flex-column w-100">
                    <Nav.Link href="#" className="text-white">
                        <FaHome className="mr-2" /> Equipments
                    </Nav.Link>
                    <Nav.Link href="#" className="text-white">
                        <FaCog className="mr-2" /> Users
                    </Nav.Link>
                    <Nav.Link href="#" className="text-white">
                        <FaUsers className="mr-2" /> Reviews
                    </Nav.Link>
                    <Nav.Link href="#" className="text-white">
                        <FaStar className="mr-2" /> Profile
                    </Nav.Link>
                    <Nav.Link href="#" className="text-white">
                        <FaUser className="mr-2" /> Settings
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Sidebar;
