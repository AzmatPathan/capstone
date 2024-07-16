import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useEffect } from 'react';
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
        barcode: '',
        equipmentId: '',
        username: '',
        startDate: '',
        endDate: ''
    });

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data && data.success) {
            const filtered = data.filter(user => {
                const matchesBarcode = user.barcode.toLowerCase().includes(formData.barcode.toLowerCase());
                const matchesEquipmentId = user.equipment_id.toString().toLowerCase().includes(formData.equipmentId.toLowerCase());
                const matchesUsername = user.username.toLowerCase().includes(formData.username.toLowerCase());
                const matchesStartDate = formData.startDate ? new Date(user.created_at) >= new Date(formData.startDate) : true;
                const matchesEndDate = formData.endDate ? new Date(user.created_at) <= new Date(formData.endDate) : true;

                return matchesBarcode && matchesEquipmentId && matchesUsername && matchesStartDate && matchesEndDate;
            });
            setFilteredData(filtered);
        }
    }, [data, formData]);

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
            await csvExport(`${DASHBOARD_URL}/export/user`, 'users.csv');
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
                <Col xs={12} md={sidebarOpen ? 2 : 0} className="p-0">
                    {sidebarOpen && <Sidebar sidebarOpen={sidebarOpen} />}
                </Col>
                <Col xs={12} md={sidebarOpen ? 10 : 12} className="pt-3" style={{ backgroundColor: '#f8f9fa', marginTop: '56px' }}>
                    <Row className="mb-4">
                        <Col>
                            <h2>User Management</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
    <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="primary" onClick={handleToggleSidebar}>
            {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </Button>
        <Button variant="outline-secondary" onClick={handleExport}>
            Export
        </Button>
    </div>
</Col>            
                    </Row>
                    <Row className="mb-3">
                    
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
                                    <tr key={index} style={{ cursor: 'pointer' }}>
                                        <td>{user.user_id}</td>
                                        <td>{user.username}</td>
                                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>{new Date(user.last_login).toLocaleDateString()}</td>
                                        <td style={{
    backgroundColor: user.is_active ? '#E8F5E9' : '#FFEBEE',
    color: user.is_active ? '#388E3C' : '#D32F2F',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: user.is_active ? '0 4px 8px rgba(56, 142, 60, 0.3)' : '0 4px 8px rgba(211, 47, 47, 0.3)',
    transition: 'background-color 0.3s ease, transform 0.3s ease'
}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
    {user.is_active ? 'Active' : 'Inactive'}
</td>

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
