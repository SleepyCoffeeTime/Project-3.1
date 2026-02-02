import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', username);
    try {
      console.log('Calling login API...');
      const response = await login(username, password);
      console.log('Login response:', response);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/inventory');
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      alert('Login failed: ' + error.message);
    }
  };

  const handleVisitor = () => {
    navigate('/items');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit">Log In</button>
      </form>
      
      <p>Don't want to log in?</p>
      <button onClick={handleVisitor}>Login as visitor</button>
      
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
}