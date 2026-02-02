import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}