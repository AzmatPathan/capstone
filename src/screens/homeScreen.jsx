import React from 'react';
import mainimage from './mainimage.png'; // Replace with your actual image path
import secondImage from './main2_image.png'; // Replace with your actual image path
import { Container, Row, Col } from 'react-bootstrap';
import './homeScreen.css';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';

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
                       
                    </Row>
                    <Row>
                        <Col>
                              <div className='card'>
                                <div className='card-image'> <img src={image1} alt="img"/></div>
                                <div className='card-text'> Automated Data Collection Using Computer Vision</div>
                              </div>
                        </Col>
                        <Col>
                             <div className='card'>
                                <div className='card-image'> <img src={image2} alt="img"/></div>
                                <div className='card-text'> User Review and Input</div>
                              </div>
                        </Col>
                        <Col>
                             <div className='card'>
                                <div className='card-image'> <img src={image3} alt="img"/></div>
                                <div className='card-text'> Tagging and Updating Equipment Information</div>
                              </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </div>
    );
};

export default HomeScreen;
