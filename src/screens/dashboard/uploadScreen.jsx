import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap';
import Sidebar from '../../components/sidebar';
import { useFetchUploadsDataQuery } from '../../slices/uploadSlice';

const UploadsScreen = () => {
    const { data, isLoading, error } = useFetchUploadsDataQuery();

    const [filters, setFilters] = useState({
        image_id: '',
        equipment_id: '',
        status: '',
        created_at: '',
    });
    const [filteredData, setFilteredData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (data) {
            const filtered = data.filter(upload => {
                const matchesImageId = upload.image_id?.toString().toLowerCase().includes(filters.image_id.toLowerCase());
                const matchesEquipmentId = upload.equipment_id?.toString().toLowerCase().includes(filters.equipment_id.toLowerCase());
                const matchesCreatedAt = filters.created_at ? new Date(upload.equipment_created_at) >= new Date(filters.created_at) : true;

                return matchesImageId && matchesEquipmentId && matchesCreatedAt;
            });
            setFilteredData(filtered);
        }
    }, [data, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleDownloadImage = (e, imageUrl) => {
        e.preventDefault();
        // For simplicity, simulate download
        window.open(imageUrl, '_blank');
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
                            <h2>Uploaded Images</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleToggleSidebar} className="mr-2">
                                {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={6} md={2}>
                            <Form.Control
                                type="text"
                                placeholder="Image ID"
                                value={filters.image_id}
                                onChange={(e) => handleFilterChange('image_id', e.target.value)}
                            />
                        </Col>
                        <Col xs={6} md={2}>
                            <Form.Control
                                type="text"
                                placeholder="Equipment ID"
                                value={filters.equipment_id}
                                onChange={(e) => handleFilterChange('equipment_id', e.target.value)}
                            />
                        </Col>
                        <Col xs={6} md={2}>
                            <Form.Control
                                type="text"
                                placeholder="Status"
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            />
                        </Col>
                        <Col xs={6} md={2}>
                            <Form.Control
                                type="date"
                                placeholder="Created At"
                                value={filters.created_at}
                                onChange={(e) => handleFilterChange('created_at', e.target.value)}
                            />
                        </Col>
                    </Row>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error fetching data</div>}
                    {filteredData.length > 0 && (
                        <Table striped bordered hover className="bg-white">
                            <thead>
                                <tr>
                                    <th>Image ID</th>
                                    <th>Equipment ID</th>
                                    <th>Description</th>
                                    <th>Image URL</th>
                                    <th>Equipment Created At</th>
                                    <th>Review Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((upload, index) => (
                                    <tr key={index}>
                                        <td>{upload.image_id}</td>
                                        <td>{upload.equipment_id}</td>
                                        <td>{upload.description}</td>
                                        <td>
                                            <a
                                                href={upload.image_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => handleDownloadImage(e, upload.image_url)}
                                            >
                                                Download Image
                                            </a>
                                        </td>

                                        <td>{new Date(upload.equipment_created_at).toLocaleDateString()}</td>
                                        <td>{upload.review_status || 'Pending'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    {filteredData.length === 0 && !isLoading && <div>No data found</div>}
                </Col>
            </Row>
        </Container>
    );
};

export default UploadsScreen;
