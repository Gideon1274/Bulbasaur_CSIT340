import React, { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';

// Utility function to group identical items and calculate total quantity/price
const groupCartItems = (items) => {
    const grouped = {};

    items.forEach(item => {
        const key = item.product.productId; 

        if (grouped[key]) {
            // If product already exists in the group, we just update the total quantity
            grouped[key].quantity += 1;
            // The item.cartId here is only needed for the API call to delete a single instance
            grouped[key].cartIds.push(item.cartId); 
        } else {
            // Initialize the grouped item
            grouped[key] = {
                product: item.product,
                quantity: 1,
                // We keep all original cartIds to target a specific item instance for deletion
                cartIds: [item.cartId], 
            };
        }
    });

    return Object.values(grouped);
};

const Cart = () => {
    const [rawCartItems, setRawCartItems] = useState([]); 
    const userEmail = sessionStorage.getItem("userEmail");

    // --- Data Aggregation Logic ---
    const groupedCartItems = useMemo(() => {
        return groupCartItems(rawCartItems);
    }, [rawCartItems]);

    const totalPrice = groupedCartItems.reduce(
        (total, groupedItem) => total + (groupedItem.product.price * groupedItem.quantity),
        0
    );

    // --- Fetching Items ---
    const fetchCartItems = () => {
        if (!userEmail) {
            console.error("User email not found in session.");
            return;
        }

        fetch('/cart/fetch-cart-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail }),
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => setRawCartItems(data))
            .catch(error => console.error('Error fetching cart items:', error));
    };

    useEffect(() => {
        fetchCartItems();
    }, [userEmail]);

    // --- Quantity Change Handler ---
    const handleQuantityChange = async (productId, changeType) => {
        const itemGroup = groupedCartItems.find(item => item.product.productId === productId);
        if (!itemGroup) return;

        let apiUrl = '';
        let apiMethod = 'POST';
        let bodyData = {};

        // 1. Decrement Quantity (-1)
        if (changeType === 'decrement') {
            const currentQuantity = itemGroup.quantity;

            if (currentQuantity === 1) {
                // If quantity is 1, we must remove the single remaining item instance
                // We use the first (and only remaining) cartId for the specific deletion
                const cartIdToDelete = itemGroup.cartIds[0];
                apiUrl = `/cart/delete-cart-item`;
                apiMethod = 'DELETE';
                bodyData = { cartId: cartIdToDelete };
            } else {
                // If quantity > 1, we need to delete one specific instance
                // We find and use one of the existing cartIds to delete one instance
                const cartIdToDelete = itemGroup.cartIds[itemGroup.cartIds.length - 1]; // Use the last ID
                apiUrl = `/cart/delete-cart-item`;
                apiMethod = 'DELETE';
                bodyData = { cartId: cartIdToDelete };
            }
        
        // 2. Increment Quantity (+1)
        } else if (changeType === 'increment') {
            // We need to add one new item instance. This typically requires a new item 
            // creation endpoint that accepts productId and userEmail.
            // **NOTE:** I'm assuming you have an endpoint like `/cart/add-item` 
            // from your product page that we can reuse here.
            apiUrl = `/cart/add-item`; // Use your existing Add to Cart endpoint
            apiMethod = 'POST';
            bodyData = { 
                userEmail: userEmail,
                productId: productId,
                // Add any other necessary fields like quantity: 1, color, size, etc.
            };
        } else {
            return;
        }

        try {
            // Execute the API call
            const response = await fetch(apiUrl, {
                method: apiMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                // Refresh the entire cart data after a successful change
                fetchCartItems();
            } else {
                console.error(`Error updating quantity (${changeType}):`, response.status);
            }
        } catch (error) {
            console.error('Network error during quantity update:', error);
        }
    };

    // --- Rendering ---
    return (
        <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
            
            <div className="card shadow-lg">
                <div className="card-header bg-white border-bottom p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">🛒 Shopping Cart</h3>
                        <h5 className="mb-0 text-muted">{rawCartItems.length} {rawCartItems.length === 1 ? 'item' : 'items'} total</h5>
                    </div>
                </div>

                <div className="card-body p-4">
                    {groupedCartItems.length === 0 ? (
                        <div className="alert alert-info text-center" role="alert">
                            Your cart is empty. <Link to="/" className="alert-link">Continue shopping.</Link>
                        </div>
                    ) : (
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr className="text-uppercase small text-muted">
                                    <th style={{ width: '50%' }}>Product Details</th>
                                    <th className="text-center" style={{ width: '15%' }}>Quantity</th>
                                    <th className="text-end" style={{ width: '15%' }}>Price</th>
                                    <th className="text-end" style={{ width: '20%' }}>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedCartItems.map(item => (
                                    <tr key={item.product.productId}>
                                        {/* Product Details */}
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={require(`../images/product-images/${item.product.imageName}.jpg`)}
                                                    alt={item.product.productTitle}
                                                    className="img-thumbnail me-3"
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <h6 className="mb-0">{item.product.productTitle}</h6>
                                                    <p className="text-muted small mb-0">Category: {item.product.category || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Quantity Controls */}
                                        <td className="text-center">
                                            <div className="input-group input-group-sm justify-content-center">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item.product.productId, 'decrement')}
                                                    aria-label="Decrease quantity"
                                                >
                                                    −
                                                </button>
                                                <input 
                                                    type="text" 
                                                    className="form-control text-center" 
                                                    value={item.quantity} 
                                                    readOnly 
                                                    style={{ maxWidth: '40px' }}
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item.product.productId, 'increment')}
                                                    aria-label="Increase quantity"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>

                                        {/* Unit Price */}
                                        <td className="text-end fw-medium">${item.product.price.toFixed(2)}</td>
                                        
                                        {/* Total Price for Group */}
                                        <td className="text-end fw-bold">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </td>
                                        
                                        {/* Quick Remove (Optional - can be redundant with - button) */}
                                        <td className="text-end">
                                            {/* Note: If you want a quick "remove all of this product" button, you could re-add the old handler here. */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* --- Cart Summary & Checkout --- */}
                {groupedCartItems.length > 0 && (
                    <div className="card-footer bg-light p-4">
                        <div className="d-flex justify-content-end align-items-center mb-3">
                            <h5 className="text-uppercase me-3 mb-0">Subtotal:</h5>
                            <h4 className="text-success mb-0 fw-bold">${totalPrice.toFixed(2)}</h4>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link to="/payment" className="btn btn-success btn-lg">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-3">
                <Link to="/" className="text-primary text-decoration-none">
                    ← Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default Cart;