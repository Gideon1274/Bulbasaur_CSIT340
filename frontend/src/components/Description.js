import React from 'react';
import dogImg from '../images/dogs.png'
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import '../css/fonts.css'
import { Link } from 'react-router-dom';


const Description = () => {

  const navigate = useNavigate();
  
  const handleShopNowClick = () => {
    navigate('/store'); // Redirects to the '/store' page
  };

 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ flex: 1, padding: '10px', textAlign: 'left' }}>

          <h1 style={{ fontSize: '80px', margin: '0px' }}>Bulbasaur Shop</h1>
          <h3 style={{ fontSize: '20px', margin: '0px' }}>Your one-stop destination for everything you need.</h3>
          <p>Discover millions of products across electronics, fashion, home goods, and more. Start exploring the latest trends and great deals at Bulbasaur Shop.</p>
          <Link to='/store'>
              <Button variant="contained" color="primary" onClick={handleShopNowClick}>
                  <b>Shop Now</b>
              </Button>
          </Link>
      </div>
        <div style={{ flex: 1, padding: '10px' }}>
          {/* Right side image */}
          <img src={dogImg} alt="Dog holding a toy" style={{ maxWidth: '100%', height: 'auto' }}  />
        </div>
      </div > 
    </div>
  );
};

export default Description;
