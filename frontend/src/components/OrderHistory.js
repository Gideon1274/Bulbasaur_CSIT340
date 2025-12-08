import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const dummyOrders = [
    { id: '1001', date: '2025-11-01', total: 49.99, status: 'Delivered', items: 2 },
    { id: '1002', date: '2025-11-15', total: 125.50, status: 'Shipped', items: 3 },
    { id: '1003', date: '2025-12-05', total: 7.99, status: 'Processing', items: 1 },
    { id: '1004', date: '2025-12-10', total: 299.00, status: 'Cancelled', items: 4 },
];

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        if (isLoggedIn) {
            // Simulate API call delay
            setTimeout(() => {
                setOrders(dummyOrders);
            }, 500);
        }
    }, [isLoggedIn]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-success';
            case 'Shipped':
                return 'bg-warning text-dark';
            case 'Processing':
                return 'bg-info';
            case 'Cancelled':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="container my-5 text-center">
                <h2>Access Denied</h2>
                <p>Please <Link to="/login">log in</Link> to view your order history.</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">My Order History</h2>
            
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">
                    Loading orders... or you have no past orders.
                </div>
            ) : (
                <div className="list-group">
                    {orders.map(order => (
                        <div key={order.id} className="list-group-item list-group-item-action mb-3 shadow-sm">
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <h5 className="mb-1">Order #{order.id}</h5>
                                <div>
                                    <span className={`badge ${getStatusClass(order.status)} me-3`}>
                                        {order.status}
                                    </span>
                                    {/* Link to a non-existent Order Detail Page */}
                                    <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline-primary">View Details</Link>
                                </div>
                            </div>
                            <small className="text-muted">Placed on: {order.date}</small>
                            <p className="mb-1 mt-2">Total: **${order.total.toFixed(2)}** ({order.items} items)</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;