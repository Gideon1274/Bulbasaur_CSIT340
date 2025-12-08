import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const footerStyle = {
    backgroundColor: 'green',
    color: '#fff',
    padding: '16px',
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80px',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  };

  const copyrightStyle = {
    marginRight: '8px',
    fontSize: '1rem',
  };

  return (
    <Box component="footer" sx={footerStyle}>
      <Typography variant="body1" sx={copyrightStyle}>
        &copy; 2025 BulbasaurShop
      </Typography>
      <Typography variant="body1">All rights reserved</Typography>
    </Box>
  );
};

export default Footer;
