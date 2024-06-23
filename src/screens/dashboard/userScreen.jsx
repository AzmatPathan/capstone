import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Sidebar from '../../components/sidebar';
import { useGetUserDataQuery } from '../../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { csvExport } from '../../utils/csvExport';
import { DASHBOARD_URL } from '../../constants';

const UserScreen = () => {
    const { data, isLoading, error } = useGetUserDataQuery();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        createdAt: '',
        role: '',
        email: '',
        lastLogin: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNewUser = () => {
        navigate('/upload-image');
    };

    const handleExport = async () => {
        try {
            await csvExport(`${DASHBOARD_URL}/export/user`,'users.csv');
        } catch (error) {
            console.error('Error exporting users:', error);
            alert('Failed to export users');
        }
    };

    const handleRowClick = (userId) => {
        navigate(`/users/${userId}`);
    };

    return (
        <Container fluid>
            <Row>
                {sidebarOpen && (
                    <Col md={2} className="d-flex flex-column justify-content-between" style={{ backgroundColor: '#f8f9fa', maxHeight: 'calc(100vh - 56px)', position: 'sticky', top: '56px' }}>
                        <Sidebar sidebarOpen={sidebarOpen} />
                    </Col>
                )}
                <Col md={{ span: sidebarOpen ? 10 : 12, offset: sidebarOpen ? 2 : 0 }} className="pt-3" style={{ backgroundColor: '#f8f9fa', marginLeft: sidebarOpen ? '16.666%' : 0 }}>
                    <Row className="mb-4">
                        <Col>
                            <h2>User Information</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleToggleSidebar} className="mr-2">
                                {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                            </Button>
                            <Button variant="success" onClick={handleNewUser} className="mr-2">
                                New
                            </Button>
                            <Button variant="secondary" onClick={handleExport}>
                                Export
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={3}>
                            <Form.Group controlId="userId">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter User ID"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="createdAt">
                                <Form.Label>Created At</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="createdAt"
                                    value={formData.createdAt}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="lastLogin">
                                <Form.Label>Last Login</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="lastLogin"
                                    value={formData.lastLogin}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error fetching data</div>}
                    {data && (
                        <Table striped bordered hover className="bg-white">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Created At</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Last Login</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={index} onClick={() => handleRowClick(user.user_id)} style={{ cursor: 'pointer' }}>
                                        <td>{user.user_id}</td>
                                        <td>{user.username}</td>
                                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>{new Date(user.last_login).toLocaleDateString()}</td>
                                        <td>{user.is_active ? 'Active' : 'Inactive'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserScreen;
