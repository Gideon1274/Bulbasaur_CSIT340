import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../components/CategoryIcons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const StoreByCategory = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeCategoryQuery = queryParams.get('category');

    const activeCategoryName = CATEGORIES.find(cat => cat.query === activeCategoryQuery)?.name || 'All Products';

    // --- Data Fetching Effect ---
    useEffect(() => {
        fetchProducts(activeCategoryQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCategoryQuery]); 

    const fetchProducts = async (category) => {
        let apiUrl;
        if (category && category !== '') {
            apiUrl = `/product/get-products-by-category?category=${category}`;
        } else {
            apiUrl = '/product/get-all-products'; 
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            setOriginalProducts(data);
            // Calculate max price from fetched data
            const maxPrice = Math.max(...data.map(p => p.price || 0), 1000); 
            setPriceRange(prev => ({ ...prev, max: maxPrice }));
        } catch (error) {
            console.error('Error fetching products:', error);
            setOriginalProducts([]);
        }
    };
    
    // --- Filtering and Sorting Effect ---
    useEffect(() => {
        let tempProducts = [...originalProducts];

        // 1. Search Filtering (FIXED: Added safety checks)
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            tempProducts = tempProducts.filter(p => {
                // Safely convert properties to lowercase, using empty string if undefined
                const productName = p.productTitle ? p.productTitle.toLowerCase() : ''; // NOTE: Using productTitle based on your ProductDetails code
                const productDescription = p.description ? p.description.toLowerCase() : '';

                return productName.includes(lowerSearchTerm) || productDescription.includes(lowerSearchTerm);
            });
        }

        // 2. Price Filtering (Added safety check for price)
        tempProducts = tempProducts.filter(p => 
            (p.price || 0) >= priceRange.min && (p.price || 0) <= priceRange.max
        );

        // 3. Sorting (Added safety check for price)
        if (sortType === 'price-asc') {
            tempProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortType === 'price-desc') {
            tempProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
        }
        
        setFilteredProducts(tempProducts);
    }, [originalProducts, searchTerm, sortType, priceRange]);


    return (
        <div className="container my-5"> 
            <div className="row g-4"> 
                
                {/* --- Sidebar (Category Filter & Price Filter) --- */}
                <div className="col-lg-3 col-md-4">
                    <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}> 
                        <div className="card-header bg-primary text-white fs-5 fw-bold">
                            🛍️ Categories
                        </div>
                        <ul className="list-group list-group-flush">
                            {CATEGORIES.map((cat) => (
                                <li 
                                    key={cat.name} 
                                    className={`list-group-item list-group-item-action p-3 ${cat.query === activeCategoryQuery ? 'active bg-light' : ''}`}
                                >
                                    <Link 
                                        to={`/products?category=${cat.query}`} 
                                        className="text-decoration-none text-dark fw-medium d-block" 
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Price Filtering Section */}
                        <div className="card-header bg-light fs-5 fw-bold mt-3">
                            💰 Filter by Price
                        </div>
                        <div className="card-body">
                            <label className="form-label">Min Price (${priceRange.min.toFixed(2)})</label>
                            <input 
                                type="range" 
                                className="form-range" 
                                min="0" 
                                max={priceRange.max} 
                                value={priceRange.min}
                                onChange={(e) => setPriceRange(p => ({ ...p, min: Number(e.target.value) }))}
                            />
                            
                            <label className="form-label">Max Price (${priceRange.max.toFixed(2)})</label>
                            <input 
                                type="range" 
                                className="form-range" 
                                min="0" 
                                max={priceRange.max} 
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value) }))}
                            />
                        </div>
                    </div>
                </div>

                {/* --- Product Listing Area --- */}
                <div className="col-lg-9 col-md-8">
                    
                    {/* Search Bar & Sorting */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0 border-bottom pb-2">{activeCategoryName}</h2>

                        <div className="d-flex align-items-center">
                            {/* Search Bar */}
                            <div className="input-group me-3" style={{ maxWidth: '300px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>

                            {/* Sorting Dropdown */}
                            <select 
                                className="form-select"
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                style={{ width: '200px' }}
                            >
                                <option value="default">Default Sort</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Product Cards */}
                    {filteredProducts.length > 0 ? (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            <CardList cards={filteredProducts} /> 
                        </div>
                    ) : (
                        <div className="alert alert-info text-center" role="alert">
                            No products found matching your criteria in **{activeCategoryName}**.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreByCategory;