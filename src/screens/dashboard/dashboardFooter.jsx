import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardFooter = () => {
    return (
        <footer className="footer mt-4 bg-light">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p>© TELUS - let's make the future friendly</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default DashboardFooter;
