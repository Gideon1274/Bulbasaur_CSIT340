import React from 'react';
import { TextField } from '@material-ui/core';

const PaymentForm = () => {
    

    const handleSubmit = (e) => {
        // For now, just navigate to success page
        window.location.href = '/success';
    };

    return (
        <div style={{ backgroundColor: 'white' }}>
            <div style={{ backgroundColor: 'white', marginLeft: '50px' }}>
                <h2>Payment Information</h2>

                <TextField id="outlined-basic" label="Card number" variant="outlined" placeholder='xxxx xxxx xxxx xxxx' style={{width:'400px', marginTop:'10px'}}/><br></br>
                <TextField id="outlined-basic" label="Card holder name" variant="outlined" placeholder='Name' style={{width:'400px', marginTop:'10px'}}/><br></br>
                <TextField id="outlined-basic" label="Expiring date" variant="outlined" placeholder='dd/mm' style={{width:'400px', marginTop:'10px'}}/><br></br>
                <TextField id="outlined-basic" label="CVV" variant="outlined" placeholder='xxx' style={{width:'400px', marginTop:'10px'}}/><br></br>
                <button type="button" className="btn btn-success mt-2" onClick={handleSubmit}>Place order</button>
            </div>
        </div>

    );
};

export default PaymentForm;
