import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductReviews from '../components/ProductReviews';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    // Assuming the URL uses /product/:productId (e.g., /product/123) instead of hash
    // If you are using hash, keep: const productId = window.location.hash.substr(1);
    const pathSegments = window.location.pathname.split('/');
    const productId = pathSegments[pathSegments.length - 1]; // Grabs the last segment of the path
    
    fetchProductDetails(productId);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`/product/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (_) {}
  };

  const handleAddToCart = async (id) => {
    if (!userEmail) {
      alert("Login required");
      return;
    }

    try {
      const response = await fetch('/cart/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, productId: id }),
      });

      if (response.ok) {
        // --- CRUCIAL: Dispatch the custom event on success ---
        window.dispatchEvent(new CustomEvent('cartUpdated')); 
        alert("Item added to cart!");
      } else {
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!product) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '40px 20px' }}>
      <Link onClick={handleGoBack} style={{ textDecoration: 'none' }}>
        <p style={{ color: 'black', fontSize: '18px' }}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '6px' }} />
          Back to Store
        </p>
      </Link>

      <div
        className="container"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <div className="row">
          <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={require(`../images/product-images/${product.imageName}.jpg`)}
              alt={product.productTitle}
              style={{
                width: '100%',
                maxWidth: '450px',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          </div>

          <div className="col-md-6" style={{ paddingTop: '20px' }}>
            <h2 style={{ fontWeight: '600' }}>{product.productTitle}</h2>

            <p style={{ color: '#555', marginTop: '20px', lineHeight: '1.6' }}>
              {product.description}
            </p>

            <hr />

            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col-6">
                <h3 style={{ fontWeight: '600' }}>${product.price}</h3>
              </div>

              <div className="col-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-success"
                  style={{
                    borderRadius: '8px',
                    height: '45px',
                    width: '180px',
                  }}
                  onClick={() => handleAddToCart(product.productId)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* --- Product Reviews Component --- */}
        <ProductReviews productId={product.productId} /> 

      </div>
      <div style={{ height: '80px' }}></div>
    </div>
  );
};

export default ProductDetails;