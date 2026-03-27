import { useState, useEffect } from "react";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No orders yet</h2>;
  }

  return (
    <div style={{ Width: "98vw", minHeight:"80vh",margin: "40px auto" }}>
      <h2>Order History</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px"
          }}
        >
          <h4>Order #{index + 1}</h4>

          <p>
            <strong>Total:</strong> ₹{order.total}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <h5>Items</h5>

          {order.items.map((item) => (
            <div key={item.id}>
              {item.title} × {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;