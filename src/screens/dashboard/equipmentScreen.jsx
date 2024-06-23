import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import { DASHBOARD_URL } from '../../constants';
import { useGetDashboardDataQuery } from '../../slices/dashboardSlice'; // Import the correct query hook
import { csvExport } from '../../utils/csvExport';

const EquipmentScreen = () => {
    const navigate = useNavigate();
    const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetDashboardDataQuery();

    const [barcode, setBarcode] = useState('');
    const [equipmentId, setEquipmentId] = useState('');
    const [username, setUsername] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Handle export functionality
    const handleExport = async () => {
        try {
            await csvExport(`${DASHBOARD_URL}/export/equipment`,'equipments.csv');
        } catch (error) {
            console.error('Error exporting equipments:', error);
            alert('Failed to export equipments');
        }
    };

    // Filter data based on search criteria
    useEffect(() => {
        if (dashboardData && dashboardData.success) {
            const filtered = dashboardData.data.filter(equipment => {
                const matchesBarcode = equipment.barcode.toLowerCase().includes(barcode.toLowerCase());
                const matchesEquipmentId = equipment.equipment_id.toString().toLowerCase().includes(equipmentId.toLowerCase());
                const matchesUsername = equipment.created_by.toLowerCase().includes(username.toLowerCase()) || (equipment.reviewed_by && equipment.reviewed_by.toLowerCase().includes(username.toLowerCase()));
                const matchesStartDate = startDate ? new Date(equipment.created_at) >= new Date(startDate) || (equipment.reviewed_at && new Date(equipment.reviewed_at) >= new Date(startDate)) : true;
                const matchesEndDate = endDate ? new Date(equipment.created_at) <= new Date(endDate) || (equipment.reviewed_at && new Date(equipment.reviewed_at) <= new Date(endDate)) : true;
                return matchesBarcode && matchesEquipmentId && matchesUsername && matchesStartDate && matchesEndDate;
            });
            setFilteredData(filtered);
        }
    }, [dashboardData, barcode, equipmentId, username, startDate, endDate]);

    // Event handlers for input changes
    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    // Toggle sidebar visibility
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Navigate to upload image screen
    const handleNewEquipment = () => {
        navigate('/upload-image');
    };

    // Navigate to equipment details screen on row click
    const handleRowClick = (equipmentId) => {
        navigate(`/equipments/${equipmentId}`);
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
                            <h2>Equipments Information</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleToggleSidebar} className="mr-2">
                                {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                            </Button>
                            <Button variant="success" onClick={handleNewEquipment} className="mr-2">
                                +NEW
                            </Button>
                            <Button variant="outline-secondary" onClick={handleExport}>
                                EXPORT
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Group controlId="barcode">
                                <Form.Label>Barcode</Form.Label>
                                <Form.Control type="text" placeholder="Enter Barcode" value={barcode} onChange={(e) => handleInputChange(e, setBarcode)} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="equipmentId">
                                <Form.Label>Equipment ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter Equipment ID" value={equipmentId} onChange={(e) => handleInputChange(e, setEquipmentId)} />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => handleInputChange(e, setUsername)} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" value={startDate} onChange={(e) => handleInputChange(e, setStartDate)} />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="endDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" value={endDate} onChange={(e) => handleInputChange(e, setEndDate)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {isDashboardLoading ? (
                        <div>Loading...</div>
                    ) : dashboardError ? (
                        <div>Error fetching data</div>
                    ) : filteredData && filteredData.length > 0 ? (
                        <Table striped bordered hover className="bg-white">
                            <thead>
                                <tr>
                                    <th>Equipment ID</th>
                                    <th>Barcode</th>
                                    <th>Created By</th>
                                    <th>Created At</th>
                                    <th>Reviewed By</th>
                                    <th>Reviewed At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((equipment, index) => (
                                    <tr key={index} onClick={() => handleRowClick(equipment.equipment_id)} style={{ cursor: 'pointer' }}>
                                        <td>{equipment.equipment_id}</td>
                                        <td>{equipment.barcode}</td>
                                        <td>{equipment.created_by}</td>
                                        <td>{new Date(equipment.created_at).toLocaleDateString()}</td>
                                        <td>{equipment.reviewed_by || 'N/A'}</td>
                                        <td>{equipment.reviewed_at ? new Date(equipment.reviewed_at).toLocaleDateString() : 'N/A'}</td>
                                        <td>{equipment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div>No data found</div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EquipmentScreen;
