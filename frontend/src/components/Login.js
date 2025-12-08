import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const handleLogin = async () => {
        try {
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
              const loggedIn = await response.json();
              if (loggedIn) {
                console.log('Login successful');
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                navigate('/');
                return;
              }
              setErrorMessage('Invalid email or password');
            } else if (response.status === 401) {
              setErrorMessage('Invalid email or password');
            } else {
              const errText = await response.text().catch(() => null);
              console.log('Error logging in:', response.status, errText);
              setErrorMessage(errText || 'An error occurred during login.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An error occurred during login.');
        }
    };
    const paperStyle = {
        padding: 20,
        width: 400,
        margin: '0 auto',
        marginTop: 50,
      };

    return (
        <Container maxWidth="sm" style={{height:'550px'}}>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: 'black', textDecoration: 'none' }}>
            <h2 className='text-center'>LOGIN</h2>
          </h1>
          
          <Box mt={3} style={{marginTop:'30px'}}>
            <TextField id="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%' }} />
          </Box>
          <Box mt={3} style={{marginTop:'15px'}}>
            <TextField  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%' }}/>
          </Box>
          <Box mt={5} textAlign="center" style={{marginTop:'15px'}}>
          
            <Button variant="contained"  type="button"
                  onClick={handleLogin}>
                    
              LOGIN
              <FontAwesomeIcon icon={faLeaf} className="dog-paw" style={{color:'white', fontSize:'30px', marginLeft:'8px'}}/>
            </Button>
            <Link to="/register"><p style={{color:'black'}}>Don't have an account? Register </p></Link>
            <span style={{color:'red'}}> {errorMessage && <p>{errorMessage}</p>}</span>
          </Box>
        </Paper>


        

      </Container>
    );
};

export default Login;
