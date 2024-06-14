import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import mainImage from './mainimage.png';
import secondImage from './main2_image.png';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';



const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Container>
          <Outlet />
        </Container>
      <div className="content-wrapper">
      <main>
          <div className="overlay-text">
            <div>Telus ITMS</div>
            <div className="additional-text">TELUS maintains an extensive inventory of HVAC equipment across its facilities.</div>
            <div className="additional-text">Our advanced mobile app leverages Computer Vision to efficiently capture data from equipment nameplates.</div>
          </div>
          <img src={mainImage} alt="Main Image" className="main-image" />
        </main>
        <main>
          <img src={secondImage} alt="Second Image" className="second-image" />
        </main>
      </div>
      <Footer/>
      </>
  );
};

export default App;


