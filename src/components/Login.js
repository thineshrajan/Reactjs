import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); // Add state for redirect
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      setUser(response.data.user);
      setRedirect(true); // Set redirect to true after successful login
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Please give valid email and password');
      }
    }
  };

  if (redirect) {
    return <Navigate to="/data" />; // Redirect to "/data" if redirect is true
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
       Email<input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
      Password<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
