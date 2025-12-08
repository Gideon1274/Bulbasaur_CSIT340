import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import { Link } from 'react-router-dom';

// Note: Ensure CardList is set up to use Bootstrap's 'col-lg-3' or similar classes
// for the 4-in-a-row layout, as the container for it is now an 8-column grid.

const Store = () => {
  const [products, setProducts] = useState([]);
  
  // Define categories array once for cleaner rendering and logic
  const categories = [
    { name: 'All Products', query: '' },
    { name: 'Electronics', query: 'Electronics' },
    { name: 'Accessories', query: 'Accessories' },
    { name: 'Fashion', query: 'Fashion' },
    { name: 'Beauty', query: 'Beauty' },
    { name: 'Sports', query: 'Sports' },
    { name: 'Health', query: 'Health' },
    { name: 'Health Appliances', query: 'HealthAppliances' }, // Corrected value
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Consider adding a loading state here
      const response = await fetch('/product/get-all-products');
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      console.log('Fetched products:', data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Consider setting an error state to display to the user
    }
  };

  return (
    <div className="container my-5"> {/* Use 'container' instead of 'container-fluid' for better centering */}
      <div className="row g-4"> {/* g-4 adds gutter space between columns */}
        
        {/* --- Sidebar (Category Filter) --- */}
        <div className="col-lg-3 col-md-4">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}> {/* sticky-top keeps it visible */}
            <div className="card-header bg-primary text-white fs-5 fw-bold">
              🛍️ Categories
            </div>
            <ul className="list-group list-group-flush">
              {categories.map((cat) => (
                <li key={cat.name} className="list-group-item list-group-item-action p-3">
                  <Link 
                    to={cat.query ? `/products?category=${cat.query}` : '/products'} 
                    className="text-decoration-none text-dark fw-medium"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Product Listing Area --- */}
        <div className="col-lg-9 col-md-8">
          <h2 className="mb-4 border-bottom pb-2">All Products</h2>
          
          {/* CardList is assumed to handle the 4-in-a-row layout internally (e.g., using row/col classes) */}
          {products.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              <CardList cards={products} />
            </div>
          ) : (
            <div className="alert alert-info text-center" role="alert">
              Loading products... or no products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;