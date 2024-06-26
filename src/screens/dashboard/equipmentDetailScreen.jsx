import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Alert, Modal, Row, Col } from 'react-bootstrap';
import { useFetchEquipmentDetailQuery, useUpdateEquipmentMutation, useAddEquipmentMutation } from '../../slices/equipmentSlice';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import Sidebar from '../../components/sidebar';

const EquipmentDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to access location state
    const { data: equipmentDetail, isLoading, error: fetchError } = useFetchEquipmentDetailQuery(id, {
        skip: !id, // Skip the query if no id is present (for adding new equipment)
    });
    const [updateEquipment] = useUpdateEquipmentMutation();
    const [addEquipment] = useAddEquipmentMutation();

    const [formData, setFormData] = useState({
        equipment_id: '',
        barcode: '',
        manufacturer: '',
        model_number: '',
        serial_number: '',
        capacity: '',
        date: '',
        speed: '',
        voltage: '',
        additional_details: ''
    });

    const [showAlert, setShowAlert] = useState({ message: '', variant: '' });
    const [showModal, setShowModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isDisabled = equipmentDetail?.status === 'Approved';


    // Update formData from location state when an image is uploaded
    useEffect(() => {
        if (location.state && location.state.uploadedFileData) {
            const { description, data: { imageData } } = location.state.uploadedFileData;
            if (imageData) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    model_number: imageData.modelNumber || '', // Update model_number from formData
                    additional_details: description || ''
                }));
            }
        }
    }, [location.state]);

    // Update formData when equipmentDetail is fetched
    useEffect(() => {
        if (equipmentDetail) {
            setFormData({
                equipment_id: equipmentDetail.equipment_id || '',
                barcode: equipmentDetail.barcode || '',
                manufacturer: equipmentDetail.manufacturer || '',
                model_number: equipmentDetail.model_number || '',
                serial_number: equipmentDetail.serial_number || '',
                capacity: equipmentDetail.capacity || '',
                date: equipmentDetail.date ? new Date(equipmentDetail.date).toISOString().split('T')[0] : '',
                speed: equipmentDetail.speed || '',
                voltage: equipmentDetail.voltage || '',
                additional_details: equipmentDetail.additional_details || ''
            });
        }
    }, [equipmentDetail]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission (update or add equipment)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateEquipment({ id, ...formData }).unwrap();
                setShowModal(true);
                setShowAlert({ message: 'Equipment updated successfully', variant: 'success' });
            } else {
                await addEquipment(formData).unwrap();
                setShowModal(true);
                setShowAlert({ message: 'Equipment added successfully', variant: 'success' });
            }
        } catch (err) {
            setShowAlert({ message: 'Failed to save equipment', variant: 'danger' });
        }
    };

    // Close modal and navigate to dashboard
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/dashboard');
    };

    // Toggle sidebar visibility
    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Navigate back function
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={sidebarOpen ? 2 : 0} className="p-0">
                    {sidebarOpen && <Sidebar sidebarOpen={sidebarOpen} />}
                </Col>
                <Col xs={12} md={sidebarOpen ? 10 : 12} className="pt-3" style={{
                    backgroundColor: '#f8f9fa',
                    marginTop: '56px' // Adjust according to your header height
                }}>
                    <Row className="mb-4">
                        <Col>
                            <h2>{id ? 'Edit Equipment' : 'Add New Equipment'}</h2>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleToggleSidebar} className="mr-2">
                                {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                            </Button>
                            <Button variant="secondary" onClick={handleBack}>
                                Back
                            </Button>
                        </Col>
                    </Row>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <FormContainer>
                            <Form onSubmit={handleSubmit}>
                                {fetchError && <Alert variant="danger">{fetchError.message}</Alert>}
                                {showAlert.message && (
                                    <Alert
                                        variant={showAlert.variant}
                                        onClose={() => setShowAlert({ message: '', variant: '' })}
                                        dismissible
                                    >
                                        {showAlert.message}
                                    </Alert>
                                )}
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formEquipmentID">
                                            <Form.Label>Equipment ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Equipment ID"
                                                name="equipment_id"
                                                value={formData.equipment_id}
                                                onChange={handleChange}
                                                disabled={!!id || isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBarcode">
                                            <Form.Label>Barcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Barcode"
                                                name="barcode"
                                                value={formData.barcode}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formManufacturer">
                                            <Form.Label>Manufacturer</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Manufacturer"
                                                name="manufacturer"
                                                value={formData.manufacturer}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formModelNumber">
                                            <Form.Label>Model Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Model Number"
                                                name="model_number"
                                                value={formData.model_number}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formSerialNumber">
                                            <Form.Label>Serial Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Serial Number"
                                                name="serial_number"
                                                value={formData.serial_number}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formCapacity">
                                            <Form.Label>Capacity</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Capacity"
                                                name="capacity"
                                                value={formData.capacity}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formDate">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formSpeed">
                                            <Form.Label>Speed</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Speed"
                                                name="speed"
                                                value={formData.speed}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formVoltage">
                                            <Form.Label>Voltage</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Voltage"
                                                name="voltage"
                                                value={formData.voltage}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formAdditionalDetails">
                                            <Form.Label>Additional Details</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="additional_details"
                                                value={formData.additional_details}
                                                onChange={handleChange}
                                                disabled={isDisabled}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {!isDisabled && (
                                    <Button variant="primary" type="submit">
                                        {id ? 'Update Equipment' : 'Add Equipment'}
                                    </Button>
                                )}
                            </Form>
                        </FormContainer>

                    )}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {id ? 'Equipment updated successfully' : 'Equipment added successfully'}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseModal}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container >
    );
};

export default EquipmentDetailScreen;
