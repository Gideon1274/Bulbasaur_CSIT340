import React from 'react';
import { Grid, Card, CardMedia, styled } from '@mui/material';
import logo from '../images/logo.jpg';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  margin: theme.spacing(2),
  height: '250px',
  width: '100%',
}));

const StyledCardMedia = styled(CardMedia)({
  height: '100%',
  objectFit: 'cover',
});

const Brand = () => {
  const images = [
    logo,
    logo,
    logo,
    logo,
  ];

  const firstRowImages = images.slice(0, 5);
  const secondRowImages = images.slice(5, 10);

  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <h1>Top brands</h1>

      <Grid container spacing={1} justifyContent="center">
        {firstRowImages.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
            <StyledCard>
              <StyledCardMedia component="img" image={image} alt="" />
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} justifyContent="center">
        {secondRowImages.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
            <StyledCard>
              <StyledCardMedia component="img" image={image} alt="" />
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Brand;
