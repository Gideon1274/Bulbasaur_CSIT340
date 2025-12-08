import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


const Success = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', backgroundColor:'white' }}>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
        Thank you for ordering with us
        <FontAwesomeIcon icon={faCheck} style={{ color: '#4CAF50', marginLeft: '10px' }} />
        
      </h2>
    </div>
    )
}



export default Success
