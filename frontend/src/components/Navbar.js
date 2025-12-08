import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faLeaf, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userEmail = sessionStorage.getItem("userEmail");
  
  const [cartItemCount, setCartItemCount] = useState(0); 

  // --- Core function to fetch the total item count ---
  const fetchCartCount = async () => {
    if (!isLoggedIn || !userEmail) {
      setCartItemCount(0);
      return;
    }
    
    try {
      const response = await fetch('/cart/fetch-cart-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCartItemCount(data.length); 
      
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    // 1. Initial fetch when the component mounts or user state changes
    fetchCartCount();
    
    // 2. Define the event handler function
    const handleCartUpdate = () => {
        fetchCartCount();
    };

    // 3. Attach the event listener for real-time updates
    window.addEventListener('cartUpdated', handleCartUpdate);

    // 4. Cleanup: remove the listener when the component unmounts
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
    
  }, [isLoggedIn, userEmail]);


  const Logout = () => {
    console.log("Logout called")
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem("userEmail");
    setCartItemCount(0);
    window.location.href = '/'; 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#38761d' }}>
      
      <FontAwesomeIcon icon={faLeaf} style={{ color: 'white', fontSize: '45px', marginLeft: '10px' }} />

      <Link className="navbar-brand" to="/" style={{ color: 'white', fontSize: '30px', fontWeight: 'bold', marginLeft: '10px' }}> 
        Bulbasaur Shop
      </Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> 
        
        <ul className="navbar-nav ms-auto"> 
          
          <li className="nav-item">
            <Link className="nav-link" to="/" style={{ color: 'white', fontSize: '20px' }}>
              Home
            </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/store" style={{ color: 'white', fontSize: '20px' }}>
              Store
            </Link>
          </li>
          
          {isLoggedIn && (
            <>
              {/* Added link to Order History */}
              <li className="nav-item">
                <Link className="nav-link" to="/orders" style={{ color: 'white', fontSize: '20px' }}>
                  Orders
                </Link>
              </li>

              {/* Cart Link with Badge Logic */}
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart" style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}> 
                  
                  <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> 
                  
                  Cart
                  
                  {/* Notification Badge */}
                  {cartItemCount > 0 && (
                    <span 
                      className="badge rounded-pill bg-danger" 
                      style={{ 
                        fontSize: '12px', 
                        position: 'absolute', 
                        top: '5px', 
                        right: '5px', 
                        padding: '2px 2px' 
                      }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={Logout} role="button">
                  Logout
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ color: 'white', fontSize: '20px' }}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;