import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import Sidebar from '../../components/sidebar';
import './profile.css';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main-content">
                <div className="content-container">
                    <Container>
                        <Card className="p-4 shadow profile-card">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="mb-0">User Information</h2>
                                <Button
                                    variant="secondary"
                                    className="edit-profile-btn"
                                    onClick={handleEditClick}
                                >
                                    <FaPencilAlt className="mr-1" />
                                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                                </Button>
                            </div>
                            <Form>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="userName">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "Jane" : "Jane"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="userLastName">
                                            <Form.Label>User Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "Doe" : "Doe"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="userId">
                                            <Form.Label>User ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "9987001801" : "9987001801"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="accountNumber">
                                            <Form.Label>Account Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "#AHGA68" : "#AHGA68"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder={isEditing ? "janeDoe@gmail.com" : "janeDoe@gmail.com"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="addressLine">
                                            <Form.Label>Address Line</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "123 Main St" : "123 Main St"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "Toronto" : "Toronto"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="stateProvince">
                                            <Form.Label>State/Province</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "Ontario" : "Ontario"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="zipCode">
                                            <Form.Label>ZIP Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "M6L 0A2" : "M6L 0A2"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group controlId="phoneContact">
                                            <Form.Label>Phone Contact</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder={isEditing ? "+1 (555) 123-4567" : "+1 (555) 123-4567"}
                                                readOnly={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {isEditing && (
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="mt-3 save-all-btn"
                                    >
                                        Save All
                                    </Button>
                                )}
                            </Form>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Profile;
