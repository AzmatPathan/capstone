import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { useGetSingleUserDataQuery } from '../../slices/userApiSlice';
import Sidebar from '../../components/sidebar';
import './profile.css';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, error, isLoading } = useGetSingleUserDataQuery(id);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Container fluid>
            <Row>
                {sidebarOpen && (
                    <Col md={2} className="d-flex flex-column justify-content-between sidebar">
                        <Sidebar sidebarOpen={sidebarOpen} />
                    </Col>
                )}
                <Col md={{ span: sidebarOpen ? 10 : 12, offset: sidebarOpen ? 2 : 0 }} className="pt-3 main-area">
                    {isLoading ? (
                        <div className="text-center my-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <div className="main-body">
                            <Card className="custom-card">
                                <div className="button-container">
                                    <Button 
                                        className="smaller-btn back-button" 
                                        onClick={handleBackClick}
                                    >
                                        &#8592; Back
                                    </Button>
                                    <Button 
                                        className="smaller-btn toggle-sidebar-button" 
                                        onClick={handleToggleSidebar}
                                    >
                                        {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                                    </Button>
                                </div>
                                <Card.Body className="text-center">
                                    <div className="d-flex justify-content-center mb-4">
                                        <h2 className="profile-title m-0">User Profile</h2>
                                    </div>
                                    <img
                                        src="/images/user-icon.jpg"
                                        alt="Profile"
                                        className="rounded-circle mb-4 profile-picture"
                                    />
                                    <div className="text-left mx-auto profile-content-box">
                                        <div className="profile-content">
                                            <div className="row mb-3 field-row">
                                                <div className="col-sm-4 field-label">
                                                    <h6 className="mb-0">User ID</h6>
                                                </div>
                                                <div className="col-sm-8 text-secondary field-value">
                                                    {user?.id || 'N/A'}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mb-3 field-row">
                                                <div className="col-sm-4 field-label">
                                                    <h6 className="mb-0">Username</h6>
                                                </div>
                                                <div className="col-sm-8 text-secondary field-value">
                                                    {user?.username || 'N/A'}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mb-3 field-row">
                                                <div className="col-sm-4 field-label">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-8 text-secondary field-value">
                                                    {user?.email || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {error && <div className="text-danger mt-3">Error fetching user data</div>}
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
