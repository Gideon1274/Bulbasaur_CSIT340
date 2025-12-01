import React from 'react';
import { Link } from 'react-router-dom';

function Settings({ user }) {
  if (!user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Please log in to view your settings.</p>
        <Link to="/">Back to products</Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '60px auto',
      padding: '40px',
      backgroundColor: '#e8f5e9',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      textAlign: 'left',
      fontSize: '18px',
      lineHeight: '2',
    }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Account Settings</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Customer ID:</strong> {user.customerId || 'N/A'}</p>
      <p><strong>Password:</strong> ••••••••</p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/" style={{ color: '#2e7d32', fontWeight: 'bold' }}>← Back to Products</Link>
      </div>
    </div>
  );
}

export default Settings;
