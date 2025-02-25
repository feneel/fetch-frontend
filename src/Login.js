import React, { useState } from 'react';
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";


export function Login({ onLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });
        if (response.ok) {
          onLogin({ name, email });
        } else {
          setError('Login failed. Please check your credentials and try again.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred. Please try again.');
      }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              required 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </label>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  }