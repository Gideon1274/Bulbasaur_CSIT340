import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    
    const checkEmailExists = async () => {
        try {
          const response = await fetch('/user/checkEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
    
          if (response.ok) {
            const emailExists = await response.json();
            return emailExists;
          } else {
            console.log('Error checking email:', response.status);
            setErrorMessage('An error occurred during email validation.');
            return false;
          }
        } catch (error) {
          console.error('Error checking email:', error);
          setErrorMessage('An error occurred during email validation.');
          return false;
        }
      };


    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    // Empty field validation
    if (!email || !password || !firstName || !lastName) {
      setErrorMessage('All fields are required');
      return;
    }

    const emailExists = await checkEmailExists();
    if (emailExists) {
      setErrorMessage('Email already exists');
      return;
    }

    try {
      const response = await fetch('/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const userRegistered = await response.json();
        if (userRegistered) {
          console.log('User Registered');
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userEmail', email);
          navigate('/');
        } else {
          console.log('Registration returned false');
          setErrorMessage('Registration failed');
        }
      } else {
        const errText = await response.text().catch(() => null);
        console.log('Error registering:', response.status, errText);
        setErrorMessage(errText || 'An error occurred during register.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setErrorMessage('An error occurred during register.');
    }
  };

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: '0 auto',
    marginTop: 50,
  };

  return (
    <Container maxWidth="sm" style={{ height: '550px' }}>
      <Paper elevation={3} style={paperStyle}>
        <><h2 className="text-center">REGISTER</h2></>
        <Box mt={3} style={{ marginTop: '30px' }}>
          <TextField
            id="firstName"
            label="Firstname"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: '100%' }}
          />
        </Box>
        <Box mt={3} style={{ marginTop: '15px' }}>
          <TextField
            id="lastName"
            label="Lastname"
            type="text"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: '100%' }}
          />
        </Box>
        <Box mt={3} style={{ marginTop: '15px' }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%' }}
          />
        </Box>
        <Box mt={3} style={{ marginTop: '15px' }}>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }}
          />
        </Box>
        <Box mt={5} textAlign="center" style={{ marginTop: '15px' }}>
          <Button variant="contained" type="button" onClick={handleRegister}>
            REGISTER
            <FontAwesomeIcon
              icon={faLeaf}
              className="dog-paw"
              style={{ color: 'white', fontSize: '30px', marginLeft: '8px' }}
            />
          </Button>
          <Link to="/login">
            <p style={{ color: 'black' }}>Already have an account? Login</p>
          </Link>
          <span style={{ color: 'red' }}>{errorMessage && <p>{errorMessage}</p>}</span>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
