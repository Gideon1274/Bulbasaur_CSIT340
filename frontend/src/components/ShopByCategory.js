import React, { useState } from 'react';
import { Grid, Card } from '@mui/material'; // Removed CardMedia, it's not needed for icons
import { Link } from 'react-router-dom';
// Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faStar,           // All Products (generic star/favorite)
    faLaptop,         // Electronics
    faHeadphones,     // Accessories
    faTshirt,         // Fashion
    faGem,            // Beauty
    faFutbol,         // Sports
    faHeartbeat,      // Health
    faBlender,        // Health Appliances
} from '@fortawesome/free-solid-svg-icons';


const ShopByCategory = () => {
    // 1. Define the categories and their associated icons
    const categories = [
        { name: 'All Products', query: '', icon: faStar },
        { name: 'Electronics', query: 'Electronics', icon: faLaptop },
        { name: 'Accessories', query: 'Accessories', icon: faHeadphones },
        { name: 'Fashion', query: 'Fashion', icon: faTshirt },
        { name: 'Beauty', query: 'Beauty', icon: faGem },
        { name: 'Sports', query: 'Sports', icon: faFutbol },
        { name: 'Health', query: 'Health', icon: faHeartbeat },
        { name: 'Home Appliances', query: 'Home Appliances', icon: faBlender },
    ];
    
    // We can filter out 'All Products' if we only want category filtering on the main page.
    // Let's iterate over the entire array for now, including 'All Products'.

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', paddingBottom:'50px', backgroundColor:'white' }}>
            
            <div style={{ padding: '0 40px', maxWidth: '1200px', width: '100%' }}>
                <h3 style={{ textAlign: 'center', fontSize: '25px', marginBottom: '40px' }}>Shop by Category</h3>
            </div>

            <div style={{ maxWidth: '1200px', width: '100%' }}>
                {/* Adjust Grid to support all 8 categories responsively */}
                <Grid container spacing={3} justifyContent="center"> 
                    {categories.map((category, index) => (
                        // Each item now occupies 1/4th (3/12) of the grid on medium screens and up
                        <Grid item xs={6} sm={4} md={3} lg={3} key={index}> 
                            <Link 
                                // Construct the link using the category query value
                                to={`/products?category=${category.query}`} 
                                style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                            >
                                <Card
                                    style={{
                                        // Styling for a modern circular icon button look
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        width: '150px', // Slightly smaller for 8 items
                                        height: '150px',
                                        margin: '0 auto', // Center the card
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'none', // Remove default card shadow for cleaner look
                                        backgroundColor: '#f8f8f8', // Light background for the circle
                                        // Dynamic border for hover effect
                                        border: index === hoveredIndex ? '4px solid #38761d' : '4px solid #ccc',
                                        transition: 'border 0.3s ease',
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {/* Silhouette Icon using FontAwesome */}
                                    <FontAwesomeIcon
                                        icon={category.icon}
                                        style={{
                                            fontSize: '70px',
                                            color: index === hoveredIndex ? '#38761d' : '#333',
                                            transition: 'color 0.3s ease, transform 0.3s ease',
                                            transform: index === hoveredIndex ? 'scale(1.1)' : 'scale(1)',
                                        }}
                                    />
                                </Card>

                                {/* Category Caption */}
                                <div style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                                    {category.name}
                                </div>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default ShopByCategory;