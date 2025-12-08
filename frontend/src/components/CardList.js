
import '../css/Card.css';
import { Link } from 'react-router-dom';
import React from 'react';



const CardList = ({ cards }) => {

  
  // Check if cards is null or not an array
  if (!Array.isArray(cards)) {
    return <div>No products available.</div>;
  }

  // Check if cards array is empty
  if (cards.length === 0) {
    return <div>No products available.</div>;
  }

  var userEmail = sessionStorage.getItem('userEmail');

  console.log("UserEmail: ", userEmail)

  // Function to handle "Add to cart" button click
  const handleAddToCart = (productId) => {

    
    if (!userEmail) {
      // Navigate to the login page or any other page you desire
      //history.push('/login');
      //window.location.href = '/login';
      alert("Login required");
    } else {

      
    
      // Make API call to add the product to the cart
      fetch('/cart/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, productId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add product to cart.');
          }
          // Handle successful response (e.g., show a success message)
          console.log('Product added to cart successfully!');
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          console.error('Error adding product to cart:', error.message);
        });
    }
  };

  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <img src={require(`../images/product-images/${card.imageName}.jpg`)} alt={card.productTitle} />
          <br />
          <p>Price: <span style={{ backgroundColor: 'green', borderRadius: '10px', padding: '3px', color: 'white' }}>${card.price}</span></p>
          <Link
            to={`/product#${card.productId}`}
          >
            <h5 style={{ color: 'black' }}>{card.productTitle}</h5>
          </Link>

          {/* Call the handleAddToCart function when the button is clicked */}
          <button className="btn-secondary" style={{ borderRadius: '10px', height: '40px' }} onClick={() => handleAddToCart(card.productId)}>Add to cart</button>
          
          

        </div>
      ))}
    </div>
  );
};

export default CardList;
