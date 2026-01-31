import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const logIn = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      const response = await login(username, password);
      const userData = response.data;
      

      onLogin(userData);
     
      navigate('/my-inventory');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('Login error:', err);
    }
  };

  const logInAsVisitor = (event) => {
    event.preventDefault();
 
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username" 
      />
      
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
     
      <button onClick={logIn}>
        Log In
      </button>
     
      <p>Don't want to log in?</p>
      <button onClick={logInAsVisitor}>
        Login as visitor
      </button>
    </div>
  );
}