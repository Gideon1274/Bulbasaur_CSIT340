import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart'; 
import OrderHistory from './OrderHistory';
import Settings from './Settings';

// THIS LINE IS CRITICAL — make sure it points to your updated file!
import LoginRegister from './LoginRegister';   // Fixed: now uses your green design

import './App.css'; 

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  return (
    <Router>
      {user ? (
        <>
          <Navbar totalItems={totalItems} onLogout={handleLogout} user={user} /> 
          <div className="content">
            <Routes>
              <Route path="/" element={<ProductList addToCart={addToCart} user={user} />} />
              <Route path="/cart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} user={user} />} />
              <Route path="/orders" element={<OrderHistory user={user} />} />
              <Route path="/settings" element={<Settings user={user} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        // This will now show your beautiful green login card!
        <LoginRegister onLoginSuccess={handleLoginSuccess} />
      )}
    </Router>
  );
}

export default App;