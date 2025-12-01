import React from 'react';
import { Link } from 'react-router-dom';

function CartButton({ itemCount }) {
  return (
    <Link to="/cart" style={cartBtnStyle}>
      Cart
      {itemCount > 0 && <span style={badgeStyle}>{itemCount}</span>}
    </Link>
  );
}

function LogoutButton({ onLogout }) {
  return <button style={logoutBtnStyle} onClick={onLogout}>Logout</button>;
}

function Navbar({ totalItems, onLogout, user }) {
  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <nav style={navbarStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ margin: 0, color: 'white', fontSize: '28px' }}>
          Bulbasaur Shop
        </h2>
        <span style={{ color: '#e8f5e9', fontSize: '16px' }}>
          Hello, {firstName}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={navLinkStyle}>Products</Link>
        <Link to="/orders" style={navLinkStyle}>Orders History</Link>
        <Link to="/settings" style={navLinkStyle}>Settings</Link>
        <CartButton itemCount={totalItems} />
        <LogoutButton onLogout={onLogout} />
      </div>
    </nav>
  );
}

// Green Theme Styles
const navbarStyle = {
  backgroundColor: '#2e7d32',
  padding: '20px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const navLinkStyle = {
  color: '#e8f5e9',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '600',
};

const cartBtnStyle = {
  backgroundColor: '#1b5e20',
  color: 'white',
  padding: '10px 18px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  position: 'relative',
};

const badgeStyle = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  backgroundColor: '#c62828',
  color: 'white',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoutBtnStyle = {
  backgroundColor: '#c62828',
  color: 'white',
  border: 'none',
  padding: '10px 18px',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginLeft: '10px',
};

export default Navbar;