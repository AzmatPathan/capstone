import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useRegisterMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role] = useState('user');

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await register({ name, email, password, role }).unwrap();
      // Handle successful registration, such as redirecting to login screen
      console.log(res); // For demonstration purposes
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className="vh-100 gradient-custom d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card text-white" style={{ borderRadius: '1rem', backgroundColor: '#49266C' }}>
              <div className="card-body p-4 text-center">
                <h2 className="fw-bold mb-2 text-uppercase">Welcome</h2>
                <p className="text-white-50 mb-4">Register to ITMS</p>
                <form onSubmit={submitHandler}>
                  <div className="form-outline form-white mb-3">
                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="name">Name</label>
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="email">Email</label>
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="password">Password</label>
                  </div>
                  <div className="form-outline form-white mb-3">
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control form-control-lg"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                  
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Register'}
                  </button>
                </form>
                <div className="d-flex justify-content-center text-center mt-3">
                  <a href="#!" className="text-white mx-2">
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="#!" className="text-white mx-2">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="#!" className="text-white mx-2">
                    <i className="fab fa-google fa-lg"></i>
                  </a>
                </div>
                <div className="mt-3">
                  <p className="mb-0">
                    Already have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
