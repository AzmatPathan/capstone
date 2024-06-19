import React, { useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetReviewDetailsQuery, useUpdateReviewStatusMutation } from '../../slices/dashboardSlice';

const ReviewDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: review, isLoading, error, refetch } = useGetReviewDetailsQuery(id);

    // Ensure updateReviewStatus is properly structured
    const { mutate: updateReviewStatus } = useUpdateReviewStatusMutation();

    const userId = 'user123'; // Replace with actual userId retrieval logic

    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const handleApproveClick = () => setShowApproveModal(true);
    const handleRejectClick = () => setShowRejectModal(true);

    const handleApprove = async () => {
        try {
            // Ensure updateReviewStatus function is available
            await updateReviewStatus({ id, adminId: userId, status: 'Approved' });
            setShowApproveModal(false);
            refetch(); // Optionally, refetch review details
        } catch (error) {
            console.error('Error approving review:', error);
        }
    };

    const handleReject = async () => {
        try {
            // Ensure updateReviewStatus function is available
            await updateReviewStatus({ id, adminId: userId, status: 'Rejected' });
            setShowRejectModal(false);
            refetch(); // Optionally, refetch review details
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
                                <p><strong>Review Text:</strong> {review.data.reviewed_data}</p>
                            </Col>
                        </Row>

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
                    </div>
                </Col>
            </Row>

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
        </Container>
    );
};

export default ReviewDetailScreen;
