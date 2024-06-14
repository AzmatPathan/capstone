// src/screens/EquipmentScreen.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Table,
} from 'react-bootstrap';
import Sidebar from '../../components/sidebar';
import { useGetDashboardDataQuery } from '../../slices/dashboardSlice';

const EquipmentScreen = () => {
    const { data, isLoading, error } = useGetDashboardDataQuery();

    const [customerName, setCustomerName] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleCustomerNameChange = (e) => {
        setCustomerName(e.target.value);
    };

    const handleInvoiceIdChange = (e) => {
        setInvoiceId(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNewEquipment = () => {
        // TODO: Implement logic to add a new equipment item
    };

    const handleExport = () => {
        // TODO: Implement logic to export equipment data
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
                        <Col md={3}>
                            <Form.Group controlId="customerName">
                                <Form.Label>Customer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Customer Name"
                                    value={customerName}
                                    onChange={handleCustomerNameChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="invoiceId">
                                <Form.Label>Invoice ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Invoice ID"
                                    value={invoiceId}
                                    onChange={handleInvoiceIdChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="endDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
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
                                    <th></th>
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
                                {data.data.map((equipment, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Form.Check type="checkbox" />
                                        </td>
                                        <td>{equipment.equipment_id}</td>
                                        <td>{equipment.barcode}</td>
                                        <td>{equipment.created_by}</td>
                                        <td>{new Date(equipment.created_at).toLocaleString()}</td>
                                        <td>{equipment.reviewed_by || 'N/A'}</td>
                                        <td>{equipment.reviewed_at ? new Date(equipment.reviewed_at).toLocaleString() : 'N/A'}</td>
                                        <td>{equipment.status}</td>
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

export default EquipmentScreen;
