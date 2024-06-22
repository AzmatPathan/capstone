import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetReviewDetailsQuery, useUpdateReviewStatusMutation } from '../../slices/dashboardSlice';
import { useSelector } from 'react-redux';

const ReviewDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: review, isLoading, error, refetch } = useGetReviewDetailsQuery(id);
    const [updateReviewStatus] = useUpdateReviewStatusMutation();

    const userInfo = useSelector((state) => state.auth.userInfo);
    const userId = userInfo?._id;
    const userRole = userInfo?.role; // Assuming user role is stored in userInfo

    const isAdmin = userRole === 'admin'; // Check if user is admin

    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const handleApproveClick = () => setShowApproveModal(true);
    const handleRejectClick = () => setShowRejectModal(true);

    const formatJson = (jsonString) => {
        try {
            const parsedJson = JSON.parse(jsonString);
            return JSON.stringify(parsedJson, null, 2);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return jsonString; // Return original string if parsing fails
        }
    };

    const handleApprove = async () => {
        try {
            await updateReviewStatus({ id, adminId: userId, status: 'Approved' });
            setShowApproveModal(false);
            refetch();
        } catch (error) {
            console.error('Error approving review:', error);
        }
    };

    const handleReject = async () => {
        try {
            await updateReviewStatus({ id, adminId: userId, status: 'Rejected' });
            setShowRejectModal(false);
            refetch();
        } catch (error) {
            console.error('Error rejecting review:', error);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching review details</div>;

    return (
        <Container fluid>
            <Row className="mt-4">
                <Col md={3}>
                    <div className="sidebar">
                        <Button variant="primary" className="mb-2" onClick={handleBack}>
                            Back
                        </Button>
                    </div>
                </Col>
                <Col md={9}>
                    <div>
                        <h2>Review Details</h2>
                        <Row className="mt-4">
                            <Col>
                                <h4>Review ID: {review.data.equipment_id}</h4>
                                <p><strong>Barcode:</strong> {review.data.barcode}</p>
                                <p><strong>Manufacturer:</strong> {review.data.manufacturer}</p>
                                <p><strong>Model Number:</strong> {review.data.model_number}</p>
                                <p><strong>Serial Number:</strong> {review.data.serial_number}</p>
                                <p><strong>Status:</strong> {review.data.status}</p>
                                <p><strong>Reviewed Date:</strong> {review.data.reviewed_at}</p>
                                <p><strong>Review Text:</strong></p>
                                <textarea
                                    className="form-control"
                                    rows={10}
                                    readOnly
                                    value={formatJson(review.data.reviewed_data)}
                                />
                            </Col>
                        </Row>

                        {isAdmin && (
                            <Row className="mt-4">
                                <Col>
                                    <Button variant="success" onClick={handleApproveClick}>
                                        Approve Review
                                    </Button>
                                    <Button variant="danger" className="ml-2" onClick={handleRejectClick}>
                                        Reject Review
                                    </Button>
                                </Col>
                            </Row>
                        )}

                        {/* Approve Confirmation Modal */}
                        <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Approval</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to approve this review?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowApproveModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="success" onClick={handleApprove}>
                                    Yes, Approve
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Reject Confirmation Modal */}
                        <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Rejection</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to reject this review?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleReject}>
                                    Yes, Reject
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewDetailScreen;
