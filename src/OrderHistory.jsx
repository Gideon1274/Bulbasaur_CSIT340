import React, { useState, useEffect } from 'react';

function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //temp orders data
  const tempOrders = [
    {
      orderId: 1,
      orderDate: Date.now(),
      orderStatus: "Processing",
      orderAmount: 120.50,
      customerId: 1
    },
    {
      orderId: 2,
      orderDate: Date.now(),
      orderStatus: "Delivered",
      orderAmount: 59.99,
      customerId: 2
    }
  ];

  useEffect(() => {
    if (!user) return;
    const myOrders = tempOrders.filter(o => o.customerId === user.customerId);
    setOrders(myOrders);
    setLoading(false);
  }, [user]);

  const handleCancel = (orderId) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  };

  if (loading) return <div style={{textAlign:"center",marginTop:"50px"}}>Loading Order History...</div>;

  return (
    <div style={{padding:"20px",maxWidth:"900px",margin:"auto"}}>
      <h2 style={{textAlign:"center"}}>Order History</h2>

      {orders.length === 0 ? (
        <p style={{textAlign:"center"}}>No past orders.</p>
      ) : (
        <table style={{width:"100%",borderCollapse:"collapse",marginTop:"20px"}}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.orderId} style={{background:i%2===0?"#fafafa":"white"}}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.orderStatus}</td>
                <td>${order.orderAmount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleCancel(order.orderId)}
                    style={{padding:"6px 10px",background:"#c0392b",color:"white",border:"none"}}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;


// import React, { useState, useEffect } from 'react';
// import { fetchReportData } from './api';

// function OrderHistory({ user }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user || !user.customerId) return;
//     fetchReportData(`/api/orders/history/${user.customerId}`)
//       .then(data => {
//         if (Array.isArray(data)) { 
//             setOrders(data);
//         } else {
//             setOrders([]);
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Failed to load order history:", err);
//         setError("Failed to load order history. Check backend connection.");
//         setLoading(false);
//       });
//   }, [user]);

//   // Cancel an order (customer may only cancel their own order)
//   const handleCancel = async (orderId) => {
//     if (!user || !user.customerId) return;
//     const confirmed = window.confirm('Are you sure you want to cancel this order?');
//     if (!confirmed) return;
//     try {
//       const res = await fetch(`/api/orders/${orderId}/customer/${user.customerId}`, { method: 'DELETE' });
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(text || res.statusText);
//       }
//       // remove from UI
//       setOrders(prev => prev.filter(o => o.orderId !== orderId));
//     } catch (err) {
//       console.error('Failed to cancel order:', err);
//       setError('Failed to cancel order. ' + (err.message || ''));
//     }
//   };

//   if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Order History...</div>;
//   if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>ERROR: {error}</div>;

//   return (
//     <div style={containerStyle}>
//       <h2 style={{ textAlign: 'center', color: '#282c34' }}>Order History (Customer ID: {user && user.customerId})</h2>
//       <p style={{ textAlign: 'center', color: '#555' }}>
//         Only your orders are shown below.
//       </p>

//       {orders.length === 0 ? (
//           <p style={emptyStyle}>No past orders found in the database.</p>
//       ) : (
//           <table style={tableStyle}>
//               <thead>
//                   <tr>
//                       <th style={thStyle}>Order ID</th>
//                       <th style={thStyle}>Date</th>
//                       <th style={thStyle}>Status</th>
//                       <th style={thStyle}>Amount</th>
//                       <th style={thStyle}>Customer ID</th>
//                     <th style={thStyle}>Actions</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {orders.map((order, index) => (
//                       <tr key={order.orderId} style={{backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'}}>
//                           <td style={tdStyle}>{order.orderId}</td>
//                           <td style={tdStyle}>{new Date(order.orderDate).toLocaleDateString()}</td>
//                           <td style={tdStyle}>{order.orderStatus}</td>
//                           <td style={tdStyle}>${order.orderAmount.toFixed(2)}</td>
//                           <td style={tdStyle}>{order.customerId}</td>
//                         <td style={tdStyle}>
//                           {user && user.customerId === order.customerId ? (
//                             <button onClick={() => handleCancel(order.orderId)} style={{padding: '6px 10px', background: '#c0392b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Cancel</button>
//                           ) : null}
//                         </td>
//                       </tr>
//                   ))}
//               </tbody>
//           </table>
//       )}
//     </div>
//   );
// }

// const containerStyle = { padding: '20px', maxWidth: '1000px', margin: 'auto' };
// const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: '0.9em', textAlign: 'left', marginTop: '20px' };
// const thStyle = { backgroundColor: '#343a40', color: 'white', border: '1px solid #ddd', padding: '12px 8px', fontWeight: 'bold' };
// const tdStyle = { border: '1px solid #ddd', padding: '8px' };
// const emptyStyle = { textAlign: 'center', marginTop: '20px', padding: '20px', border: '1px dashed #ccc' };

// export default OrderHistory;