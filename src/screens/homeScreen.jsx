import React from 'react';
import mainimage from './mainimage.png'; // Replace with your actual image path
import secondImage from './main2_image.png'; // Replace with your actual image path
import { Container, Row, Col } from 'react-bootstrap';
import './homeScreen.css';

const HomeScreen = () => {
    return (
        <div className="home-screen">
            <main className="landing-page">
                <Container fluid>
                    <Row className="content-wrapper">
                        <Col className="image-wrapper position-relative">
                            <img src={mainimage} alt="Main Image" className="main-image img-fluid" />
                            <div className="overlay-text">
                                <div><h1 className="mb-3">Telus ITMS</h1></div>
                                <div className="additional-text mb-3">TELUS maintains an extensive inventory of HVAC equipment across its facilities.</div>
                                <div className="additional-text">Our advanced mobile app leverages Computer Vision to efficiently capture data from equipment nameplates.</div>
                            </div>
                        </Col>
                        <Col className="image-wrapper">
                            <img src={secondImage} alt="Second Image" className="second-image img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default HomeScreen;
