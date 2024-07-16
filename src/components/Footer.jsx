import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Make sure to import your custom CSS

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {!userInfo ? (
        <footer className="element-footer bg-white mt-auto">
          <Container className="py-5">
            <Row className="align-items-center">
              <Col xs={12} md={6} lg={3} className="mb-4">
                <div className="mt-3">
                  <img className="images img-fluid" alt="Images" src="images/telusImage.png" />
                </div>
                <div className="social-icons d-flex justify-content-start gap-2 mt-2">
                  <a href="https://www.facebook.com/TULUSband/" className="icon-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f fa-lg text-dark"></i>
                  </a>
                  <a href="https://x.com/telus" className="icon-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-lg text-dark"></i>
                  </a>
                  <a href="https://www.instagram.com/telus/?hl=en" className="icon-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-lg text-dark"></i>
                  </a>
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} className="mb-4">
                <div className="items">
                  <div className="text-wrapper bold-text">COMPANY</div>
                  <div className="div">
                    <a href="https://www.telus.com/en/about?linktype=ge-footer" className="custom-link">About Us</a>
                  </div>
                  <div className="div">
                    <a href="https://www.telus.com/en/about/careers?linktype=ge-footer" className="custom-link">Careers</a>
                  </div>
                  <div className="div">
                    <a href="https://www.telus.com/en/about/media-hub?linktype=ge-footer" className="custom-link">Media</a>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} className="mb-4">
                <div className="items">
                  <div className="text-wrapper bold-text">HELP</div>
                  <div className="div">
                    <a href="https://www.telus.com/en/about/accessibility?linktype=ge-footer" className="custom-link">Accessibility</a>
                  </div>
                  <div className="div">
                    <a href="https://www.telus.com/en/on/outages?INTCMP=VAN_status&linktype=ge-footer" className="custom-link">TELUS Service Status</a>
                  </div>
                  <div className="div">
                    <a href="https://forum.telus.com/t5/Home/ct-p/EN?linktype=ge-footer" className="custom-link">Community Forum</a>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={3} className="mb-4">
                <div className="items">
                  <div className="text-wrapper bold-text">OTHER TELUS PROPERTIES</div>
                  <div className="div">
                    <a href="https://example.com/social-impact" className="custom-link">Social Impact</a>
                  </div>
                  <div className="div">
                    <a href="https://www.telus.com/en" className="custom-link">TELUS Digital</a>
                  </div>
                  <div className="div">
                    <a href="https://www.telus.com/en/about/procurement?linktype=ge-footer" className="custom-link">TELUS Procurement</a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      ) : (
        <footer className="footer mt-4 bg-light">
          <Container>
            <Row>
              <Col className="text-center">
                <p>© TELUS - let's make the future friendly</p>
              </Col>
            </Row>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;
