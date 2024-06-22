import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Sidebar from '../../components/sidebar';
import { useGetReviewDataQuery, useAssignReviewMutation } from '../../slices/dashboardSlice'; // Assuming useAssignReviewMutation is imported
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EquipmentReviewScreen = () => {
    const { data, isLoading, error } = useGetReviewDataQuery();
    const { userInfo } = useSelector((state) => state.auth); // Assuming auth slice contains user info
    const userId = userInfo?._id;
    const isAdmin = userInfo?.role === 'admin';

    const [barcode, setBarcode] = useState('');
    const [equipmentId, setEquipmentId] = useState('');
    const [username, setUsername] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const [assignReview, { isLoading: isAssigning }] = useAssignReviewMutation();

    useEffect(() => {
        if (data && data.success) {
            const filtered = data.data.filter(review => {
                const matchesBarcode = review.barcode.toLowerCase().includes(barcode.toLowerCase());
                const matchesEquipmentId = review.equipment_id.toString().toLowerCase().includes(equipmentId.toLowerCase());
                const matchesUsername = review.created_by?.toLowerCase().includes(username.toLowerCase()) || (review.reviewed_by && review.reviewed_by.toLowerCase().includes(username.toLowerCase()));
                const matchesStartDate = startDate ? new Date(review.created_at) >= new Date(startDate) || (review.reviewed_at && new Date(review.reviewed_at) >= new Date(startDate)) : true;
                const matchesEndDate = endDate ? new Date(review.created_at) <= new Date(endDate) || (review.reviewed_at && new Date(review.reviewed_at) <= new Date(endDate)) : true;

                return matchesBarcode && matchesEquipmentId && matchesUsername && matchesStartDate && matchesEndDate;
            });
            setFilteredData(filtered);
        }
    }, [data, barcode, equipmentId, username, startDate, endDate]);

    const handleBarcodeChange = (e) => setBarcode(e.target.value);
    const handleEquipmentIdChange = (e) => setEquipmentId(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const handleNewReview = () => navigate('/add-review');
    const handleExport = () => { /* Implement logic to export review data */ };

    const handleRowClick = (reviewId) => {
        // Navigate to details page when clicking on row (excluding "Assign to Me" button)
        navigate(`/reviews/${reviewId}`);
    };

    const handleAssignReview = async (reviewId, event) => {
        try {
            event.stopPropagation(); // Prevents event propagation to the parent row click handler
            const response = await assignReview({ reviewId, adminId: userId });
            if (response.data.success) {
                // Update the local data to reflect the assigned review
                const updatedData = filteredData.map(review => {
                    if (review.review_id === reviewId) {
                        return { ...review, reviewed_by: userInfo.username };
                    }
                    return review;
                });
                setFilteredData(updatedData);
            } else {
                console.error('Error assigning review:', response.data.message);
            }
        } catch (error) {
            console.error('Error assigning review:', error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={sidebarOpen ? 2 : 0} className="p-0">
                    {sidebarOpen && <Sidebar sidebarOpen={sidebarOpen} />}
                </Col>
                <Col xs={12} md={sidebarOpen ? 10 : 12} className="pt-3" style={{
                    backgroundColor: '#f8f9fa',
                    marginTop: '56px'
                }}>
                    <Row className="mb-4">
                        <Col>
                            <h2>Equipment Reviews</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleToggleSidebar} className="mr-2">
                                {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                            </Button>
                            <Button variant="success" onClick={handleNewReview} className="mr-2">
                                + New
                            </Button>
                            <Button variant="outline-secondary" onClick={handleExport}>
                                Export
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2}>
                            <Form.Group controlId="barcode">
                                <Form.Label>Barcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Barcode"
                                    value={barcode}
                                    onChange={handleBarcodeChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group controlId="equipmentId">
                                <Form.Label>Equipment ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Equipment ID"
                                    value={equipmentId}
                                    onChange={handleEquipmentIdChange}
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
                        <Col md={2}>
                            <Form.Group controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
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
                    {filteredData && (
                        <Table striped bordered hover className="bg-white">
                            <thead>
                                <tr>
                                    <th>Review ID</th>
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
                                {filteredData.map((review, index) => (
                                    <tr key={index} onClick={() => handleRowClick(review.review_id)} style={{ cursor: 'pointer' }}>
                                        <td>{review.review_id}</td>
                                        <td>{review.equipment_id}</td>
                                        <td>{review.barcode}</td>
                                        <td>{review.created_by}</td>
                                        <td>{new Date(review.created_at).toLocaleString()}</td>
                                        <td>
                                            {review.reviewed_by || !isAdmin ? (
                                                review.reviewed_by || 'N/A'
                                            ) : (
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={(event) => handleAssignReview(review.review_id, event)}
                                                    disabled={isAssigning}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    Assign to Me
                                                </Button>
                                            )}
                                        </td>
                                        <td>{review.reviewed_at ? new Date(review.reviewed_at).toLocaleString() : 'N/A'}</td>
                                        <td>{review.status}</td>
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

export default EquipmentReviewScreen;
