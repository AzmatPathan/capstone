import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    Row,
    Table,
} from 'react-bootstrap';
import Sidebar from '../../components/sidebar';
import { useGetDashboardDataQuery } from '../../slices/dashboardSlice';
import { useNavigate } from 'react-router-dom';

const UserScreen = () => {
    const { data, isLoading, error } = useGetDashboardDataQuery()
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [lastLogin, setLastLogin] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleUserIdChange = (e) => {
      setUserId(e.target.value);
  };

  const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  };

  const handleCreatedAtChange = (e) => {
      setCreatedAt(e.target.value);
  };

  const handleRoleChange = (e) => {
      setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };

  const handleLastLoginChange = (e) => {
      setLastLogin(e.target.value);
  };
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNewEquipment = () => {
        // TODO: Implement logic to add a new equipment item
        navigate('/upload-image');
    };

    const handleExport = () => {
        // TODO: Implement logic to export equipment data
    };

    const handleRowClick = (equipmentId) => {
        navigate(`/equipments/${equipmentId}`);
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
                        </Col>
                    </Row>
                    <Row className="mb-3">
                    <Col md={3}>
    <Form.Group controlId="userId">
        <Form.Label>User ID</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={handleUserIdChange}
        />
    </Form.Group>
</Col>
<Col md={3}>
    <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
        />
    </Form.Group>
</Col>
<Col md={3}>
    <Form.Group controlId="createdAt">
        <Form.Label>Created At</Form.Label>
        <Form.Control
            type="date"
            value={createdAt}
            onChange={handleCreatedAtChange}
        />
    </Form.Group>
</Col>
<Col md={3}>
    <Form.Group controlId="role">
        <Form.Label>Role</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={handleRoleChange}
        />
    </Form.Group>
</Col>
<Col md={3}>
    <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
        />
    </Form.Group>
</Col>
<Col md={3}>
    <Form.Group controlId="lastLogin">
        <Form.Label>Last Login</Form.Label>
        <Form.Control
            type="date"
            value={lastLogin}
            onChange={handleLastLoginChange}
        />
    </Form.Group>
</Col>

                    </Row>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error fetching data</div>}
                    {data && data.success && (
                        <Table striped bordered hover className="bg-white">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Created At</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>last_login</th>
                                    <th>is_active</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.data.map((user, index) => (
                                    <tr key={index} onClick={() => handleRowClick(user.user_id)} style={{ cursor: 'pointer' }}>
                                        <td>{user.user_id}</td>
                                        <td>{user.username}</td>
                                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td>{user.role}</td>
                                        <td>{user.email}</td>
                                        <td>{user.last_login}</td>
                                        <td>{user.active}</td>
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