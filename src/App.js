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
      <Footer/>
      </>
  );
};

export default App;


