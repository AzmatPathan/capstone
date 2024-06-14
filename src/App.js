import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

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


