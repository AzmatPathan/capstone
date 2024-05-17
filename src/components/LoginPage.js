// LoginPage.js
import React, { useState } from 'react';
import authService from '../services/authService';
import Dashboard from './Dashboard'; // Import the Dashboard component
import './LoginPage.css'; // Import CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      // Set loggedIn state to true upon successful login
      setLoggedIn(true);
      // Show alert message for successful login
      alert('Successfully logged in!');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  // Redirect to Dashboard component if loggedIn is true
  if (loggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
