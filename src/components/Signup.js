import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [organization, setOrganization] = useState('');
  const [redirect, setRedirect] = useState(false); // Add state for redirect
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/organizations');
        setOrganizationOptions(response.data.map(org => ({ value: org._id, label: org.name })));
        if (response.data.length > 0) {
          setOrganization(response.data[0]._id); // Set the first organization as default
        }
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { 
        username, 
        lastname,
        password, 
        email, 
        organization 
      });
      console.log('Signup successful');
      setRedirect(true);
      // Reset form fields
      setPassword('');
      setUsername('');
      setLastname('');
      setEmail('');
      if (organizationOptions.length > 0) {
        setOrganization(organizationOptions[0]._id); // Set the first organization as default after signup
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("error");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/login" />; // Redirect to "/data" if redirect is true
  }

  return (
    <div className='container'>
      <div className="signup-container">
        <h2>Signup</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSignup}>
          <div>
            <label>First Name:</label>
            <input type="text" placeholder="First Name" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div>
            <label>Email Address:</label>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Organization:</label>
            <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
              {organizationOptions.map(org => (
                <option key={org.value} value={org.value}>{org.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
