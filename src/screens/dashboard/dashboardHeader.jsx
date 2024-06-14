import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">TELUS</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#"><i className="fa fa-bell"></i></Nav.Link>
                    <Nav.Link href="#"><i className="fa fa-user"></i></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default DashboardHeader;
