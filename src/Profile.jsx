import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ user, cartItems = [], addToCart = () => {} }) {
  const [activeOrderTab, setActiveOrderTab] = useState('orders');
  const [activeServiceTab, setActiveServiceTab] = useState('orderhistory');

  // Sample recommended products
  const recommendedProducts = [
    { productId: 101, productName: "USB-C Cable", description: "High-speed charging cable", price: 12.99, stock: 20 },
    { productId: 102, productName: "Monitor Stand", description: "Adjustable monitor riser", price: 34.99, stock: 8 },
  ];

  // Sample order tabs data
  const orderTabs = [
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'coupons', label: 'Coupons', icon: '🎟️' },
    { id: 'pending', label: 'Pending', icon: '⏳' },
    { id: 'processing', label: 'Processing', icon: '⚙️' },
    { id: 'shipped', label: 'Shipped', icon: '🚚' },
    { id: 'review', label: 'Review', icon: '⭐' },
    { id: 'preorder', label: 'Preorder', icon: '🔔' },
  ];

  const serviceTabs = [
    { id: 'orderhistory', label: 'Order History', icon: '📋' },
    { id: 'address', label: 'Address', icon: '📍' },
    { id: 'support', label: 'Support', icon: '💬' },
    { id: 'aboutus', label: 'About Us', icon: 'ℹ️' },
  ];

  if (!user) {
    return (
      <div style={notLoggedInStyle}>
        <p>Please log in to view your profile.</p>
        <Link to="/" style={{ color: '#4E8234', fontWeight: 'bold' }}>Back to Shopping</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Profile Header */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, color: '#4E8234' }}>👤 My Profile</h1>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>Welcome, {user.name}!</p>
      </div>

      {/* My Orders Section */}
      <section style={sectionStyle}>
        <h2 style={{ marginTop: 0, color: '#4E8234', borderBottom: '2px solid #78C850', paddingBottom: '10px' }}>
          📦 My Orders
        </h2>
        <div style={tabsContainerStyle}>
          {orderTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveOrderTab(tab.id)}
              style={{
                ...tabButtonStyle,
                backgroundColor: activeOrderTab === tab.id ? '#4E8234' : '#E8F4E0',
                color: activeOrderTab === tab.id ? 'white' : '#333',
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
        <div style={tabContentStyle}>
          <p style={{ color: '#666' }}>Content for {orderTabs.find(t => t.id === activeOrderTab)?.label} will appear here.</p>
        </div>
      </section>

      {/* Services Section */}
      <section style={sectionStyle}>
        <h2 style={{ marginTop: 0, color: '#4E8234', borderBottom: '2px solid #78C850', paddingBottom: '10px' }}>
          ⚙️ Services
        </h2>
        <div style={tabsContainerStyle}>
          {serviceTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveServiceTab(tab.id)}
              style={{
                ...tabButtonStyle,
                backgroundColor: activeServiceTab === tab.id ? '#4E8234' : '#E8F4E0',
                color: activeServiceTab === tab.id ? 'white' : '#333',
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
        <div style={tabContentStyle}>
          {activeServiceTab === 'orderhistory' && (
            <div>
              <p>View all your past orders and track their status.</p>
              <Link to="/orders" style={{ color: '#4E8234', fontWeight: 'bold' }}>Go to Order History →</Link>
            </div>
          )}
          {activeServiceTab === 'address' && (
            <div>
              <p><strong>Saved Addresses:</strong></p>
              <p style={{ color: '#666' }}>No saved addresses yet. Add one during checkout.</p>
            </div>
          )}
          {activeServiceTab === 'support' && (
            <div>
              <p><strong>Need Help?</strong></p>
              <p style={{ color: '#666' }}>Contact our support team at support@bulbasaurshop.com</p>
            </div>
          )}
          {activeServiceTab === 'aboutus' && (
            <div>
              <p><strong>About Bulbasaur Shop</strong></p>
              <p style={{ color: '#666' }}>Your trusted destination for quality tech products and accessories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Products Section */}
      <section style={sectionStyle}>
        <h2 style={{ marginTop: 0, color: '#4E8234', borderBottom: '2px solid #78C850', paddingBottom: '10px' }}>
          💡 Recommended For You
        </h2>
        <div style={recommendedGridStyle}>
          {recommendedProducts.map(product => (
            <div key={product.productId} style={productCardStyle}>
              <div style={productImagePlaceholder}>📦</div>
              <h3 style={{ marginBottom: '8px', color: '#333' }}>{product.productName}</h3>
              <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>{product.description}</p>
              <p style={{ fontWeight: 'bold', color: '#4E8234', marginBottom: '10px' }}>${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart && typeof addToCart === 'function' ? addToCart(product) : null}
                style={addToCartButtonStyle}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px', fontSize: '0.95em' }}>
          Continue shopping or add recommended items to your cart!
        </p>
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Link to="/" style={continueShoppingStyle}>
            Continue Shopping →
          </Link>
        </div>
      </section>
    </div>
  );
}

// Inline Styles
const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#FFFFFF',
  minHeight: '80vh',
};

const notLoggedInStyle = {
  textAlign: 'center',
  padding: '50px 20px',
  color: '#666',
};

const headerStyle = {
  backgroundColor: '#EFFFE0',
  border: '2px solid #A7DB8D',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  textAlign: 'center',
};

const sectionStyle = {
  backgroundColor: '#FAFAFA',
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '25px',
};

const tabsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '15px',
  paddingBottom: '15px',
  borderBottom: '1px solid #E0E0E0',
};

const tabButtonStyle = {
  padding: '8px 16px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '0.9em',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

const tabContentStyle = {
  backgroundColor: '#FFFFFF',
  padding: '15px',
  borderRadius: '6px',
  color: '#333',
};

const recommendedGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  marginBottom: '20px',
};

const productCardStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #D0D0D0',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  transition: 'box-shadow 0.3s ease',
};

const productImagePlaceholder = {
  fontSize: '3em',
  backgroundColor: '#E8F4E0',
  borderRadius: '6px',
  padding: '20px',
  marginBottom: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const addToCartButtonStyle = {
  backgroundColor: '#4E8234',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.95em',
  width: '100%',
  transition: 'background-color 0.3s ease',
};

const continueShoppingStyle = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#4E8234',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

export default Profile;
